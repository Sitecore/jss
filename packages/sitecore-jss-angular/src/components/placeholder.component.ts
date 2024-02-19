/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Data, Router, UrlTree } from '@angular/router';
import { ComponentRendering, HtmlElementRendering } from '@sitecore-jss/sitecore-jss/layout';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { JssCanActivateError } from '../services/jss-can-activate-error';
import {
  ComponentFactoryResult,
  JssComponentFactoryService,
} from '../services/jss-component-factory.service';
import {
  DataResolver,
  DATA_RESOLVER,
  GuardResolver,
  GUARD_RESOLVER,
  PLACEHOLDER_HIDDEN_RENDERING_COMPONENT,
  PLACEHOLDER_MISSING_COMPONENT_COMPONENT,
} from '../services/placeholder.token';
import { HIDDEN_RENDERING_NAME } from './hidden-rendering.component';
import { PlaceholderLoadingDirective } from './placeholder-loading.directive';
import { RenderEachDirective } from './render-each.directive';
import { RenderEmptyDirective } from './render-empty.directive';
import { isRawRendering } from './rendering';

/**
 * @param {ComponentRendering} rendering
 * @param {string} name
 */
function getPlaceholder(rendering: ComponentRendering, name: string) {
  if (rendering && rendering.placeholders && Object.keys(rendering.placeholders).length > 0) {
    return rendering.placeholders[name];
  }
  return null;
}

export interface FactoryWithData {
  factory: ComponentFactoryResult;
  data?: Data;
}

@Component({
  selector: 'sc-placeholder,[sc-placeholder]',
  template: `
    <ng-template
      *ngIf="isLoading"
      [ngTemplateOutlet]="placeholderLoading?.templateRef"
    ></ng-template>
    <ng-template #view></ng-template>
  `,
})
export class PlaceholderComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  @Input() name?: string;
  @Input() rendering: ComponentRendering;
  @Input() renderings?: Array<ComponentRendering | HtmlElementRendering>;
  @Input() outputs: { [k: string]: (eventType: unknown) => void };
  @Input() clientOnly = false;

  @Output() loaded = new EventEmitter<string | undefined>();
  @Output() failed = new EventEmitter<Error>();

  @ContentChild(RenderEachDirective, { static: true }) renderEachTemplate: RenderEachDirective;
  @ContentChild(RenderEmptyDirective, { static: true }) renderEmptyTemplate: RenderEmptyDirective;
  @ContentChild(PlaceholderLoadingDirective, { static: true })
  placeholderLoading?: PlaceholderLoadingDirective;

  @ViewChild('view', { read: ViewContainerRef, static: true }) private view: ViewContainerRef;

  public isLoading = true;

  private _inputs: { [key: string]: unknown };
  private _differ: KeyValueDiffer<string, unknown>;
  private _componentInstances: { [prop: string]: unknown }[] = [];
  private destroyed = false;
  private parentStyleAttribute = '';

  constructor(
    private differs: KeyValueDiffers,
    private componentFactory: JssComponentFactoryService,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    @Inject(PLACEHOLDER_MISSING_COMPONENT_COMPONENT)
    private missingComponentComponent: Type<unknown>,
    @Inject(PLACEHOLDER_HIDDEN_RENDERING_COMPONENT) private hiddenRenderingComponent: Type<unknown>,
    @Inject(GUARD_RESOLVER) private guardResolver: GuardResolver,
    @Inject(DATA_RESOLVER) private dataResolver: DataResolver,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @Input()
  set inputs(value: { [key: string]: unknown }) {
    this._inputs = value;
    if (!this._differ && value) {
      this._differ = this.differs.find(value).create();
    }
  }

  ngOnInit() {
    // just to ensure the element exists
    const elem = this.elementRef.nativeElement;

    if (elem) {
      const attributes: NamedNodeMap = elem.attributes;
      for (let i = 0; i < attributes.length; i++) {
        const attr: Attr | null = attributes.item(i);
        if (attr && attr.name.indexOf('_ngcontent') !== -1) {
          this.parentStyleAttribute = attr.name;
        }
      }
    }
  }

  ngOnDestroy() {
    this.destroyed = true;
    this._componentInstances = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rendering || changes.renderings) {
      this._render();
    }
  }

  ngDoCheck() {
    if (!this._differ || !this._inputs || this._componentInstances.length === 0) {
      return;
    }

    const changes = this._differ.diff(this._inputs);
    if (!changes) {
      return;
    }
    const updates: { [key: string]: unknown } = {};
    changes.forEachRemovedItem((change) => (updates[change.key] = null));
    changes.forEachAddedItem((change) => (updates[change.key] = change.currentValue));
    changes.forEachChangedItem((change) => (updates[change.key] = change.currentValue));
    this._componentInstances.forEach((componentInstance) =>
      this._setComponentInputs(componentInstance, updates)
    );
  }

  private _setComponentInputs(
    componentInstance: { [key: string]: unknown },
    inputs: { [key: string]: unknown }
  ) {
    Object.entries(inputs).forEach(
      ([input, inputValue]) => (componentInstance[input] = inputValue)
    );
  }

  private _subscribeComponentOutputs(
    componentInstance: { [key: string]: unknown },
    outputs: { [k: string]: (eventType: unknown) => void }
  ) {
    Object.keys(outputs)
      .filter(
        (output) => componentInstance[output] && componentInstance[output] instanceof Observable
      )
      .forEach((output) =>
        (componentInstance[output] as Observable<unknown>)
          .pipe(takeWhile(() => !this.destroyed))
          .subscribe(outputs[output])
      );
  }

  private async _render() {
    if (this.clientOnly && isPlatformServer(this.platformId)) {
      return;
    }

    this._componentInstances = [];
    this.view.clear();

    if (!this.rendering && !this.renderings) {
      return;
    }

    if (!this.name && !this.renderings) {
      console.warn(
        'Placeholder name was not specified, and explicit renderings array was not passed. Placeholder requires either name and rendering, or renderings.'
      );
      this.isLoading = false;
      return;
    }

    const placeholder = this.renderings || getPlaceholder(this.rendering, this.name || '');

    if (!placeholder) {
      console.warn(
        `Placeholder '${this.name}' was not found in the current rendering data`,
        JSON.stringify(this.rendering, null, 2)
      );
      this.isLoading = false;
      return;
    }

    // if the placeholder is empty (contains only raw renderings), then we may need to use the empty template if it's defined
    const placeholderIsEmpty = placeholder.every(
      (rendering: ComponentRendering | HtmlElementRendering) => isRawRendering(rendering)
    );

    if (this.renderEmptyTemplate && placeholderIsEmpty) {
      this.view.createEmbeddedView(this.renderEmptyTemplate.templateRef, {
        renderings: placeholder,
      });
      this.isLoading = false;
    } else {
      const factories = await this.componentFactory.getComponents(placeholder);

      try {
        const nonGuarded = await this.guardResolver(factories);
        const withData = await this.dataResolver(nonGuarded);

        withData.forEach((rendering, index) => {
          if (this.renderEachTemplate && !isRawRendering(rendering.factory.componentDefinition)) {
            this._renderTemplatedComponent(rendering.factory.componentDefinition, index);
          } else {
            this._renderEmbeddedComponent(rendering.factory, rendering.data, index);
          }
        });

        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
        this.loaded.emit(this.name);
      } catch (e) {
        this.isLoading = false;
        if (e instanceof JssCanActivateError) {
          const redirectValue = e.redirectValue;
          if (redirectValue instanceof UrlTree) {
            this.router.navigateByUrl(redirectValue);
          } else if (typeof redirectValue === 'string') {
            this.router.navigate([redirectValue]);
          } else {
            this.router.navigate(redirectValue);
          }
        } else {
          this.failed.emit(e as Error);
          console.warn(
            `Placeholder '${this.name}' was not able to render with the current rendering data and error`,
            JSON.stringify(this.rendering, null, 2),
            e
          );
          return;
        }
      }
    }
  }

  private _renderTemplatedComponent(
    rendering: ComponentRendering | HtmlElementRendering,
    index: number
  ) {
    // the render-each template takes care of all component mapping etc
    // generally using <sc-render-component> which is about like _renderEmbeddedComponent()
    // as a separate component
    this.view.createEmbeddedView(this.renderEachTemplate.templateRef, {
      rendering,
      index,
    });
  }

  private _renderEmbeddedComponent(rendering: ComponentFactoryResult, data: Data, index: number) {
    if (
      (rendering.componentDefinition as ComponentRendering).componentName === HIDDEN_RENDERING_NAME
    ) {
      rendering.componentImplementation = this.hiddenRenderingComponent;
    }

    if (!rendering.componentImplementation) {
      const componentName = (rendering.componentDefinition as ComponentRendering).componentName;
      console.error(
        `Placeholder ${this.name} contains unknown component ${componentName}.`,
        `Ensure component is mapped, like:
        JssModule.withComponents([
          { name: '${componentName}', type: ${componentName}Component }
        ])`
      );

      rendering.componentImplementation = this.missingComponentComponent;
    }
    // apply the parent style attribute _ngcontent
    // work-around for https://github.com/angular/angular/issues/12215
    const createdComponentRef = this.view.createComponent(rendering.componentImplementation, {
      index: index,
      ngModuleRef: rendering.componentModuleRef,
    });
    if (this.parentStyleAttribute) {
      this.renderer.setAttribute(
        createdComponentRef.location.nativeElement,
        this.parentStyleAttribute,
        ''
      );
    }

    const componentInstance = createdComponentRef.instance;
    componentInstance.rendering = rendering.componentDefinition;
    componentInstance.data = data;

    if (this._inputs) {
      this._setComponentInputs(componentInstance, this._inputs);
    }
    if (this.outputs) {
      this._subscribeComponentOutputs(componentInstance, this.outputs);
    }
    this._componentInstances.push(componentInstance);
  }
}
