import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ContentChild,
  DoCheck,
  EventEmitter,
  Inject,
  Injector,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ComponentRendering, HtmlElementRendering } from '@sitecore-jss/sitecore-jss';
import { Observable, of } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import {
  ComponentFactoryResult,
  JssComponentFactoryService,
} from '../jss-component-factory.service';
import { PLACEHOLDER_MISSING_COMPONENT_COMPONENT } from './placeholder.token';
import { RenderEachDirective } from './render-each.directive';
import { RenderEmptyDirective } from './render-empty.directive';
import { isRawRendering } from './rendering';

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
    <ng-template #view></ng-template>
  `,
})
export class PlaceholderComponent implements OnChanges, DoCheck, OnDestroy {
  private _inputs: { [key: string]: any };
  private _differ: KeyValueDiffer<string, any>;
  private _componentInstances: any[] = [];
  private destroyed = false;

  @Input()
  name?: string;
  @Input()
  rendering: ComponentRendering;
  @Input()
  renderings?: Array<ComponentRendering | HtmlElementRendering>;
  @Input()
  outputs: { [k: string]: (eventType: any) => void };

  @Output()
  loaded = new EventEmitter<string | undefined>();

  @ViewChild('view', { read: ViewContainerRef })
  private view: ViewContainerRef;
  @ContentChild(RenderEachDirective)
  renderEachTemplate: RenderEachDirective;
  @ContentChild(RenderEmptyDirective)
  renderEmptyTemplate: RenderEmptyDirective;

  @Input()
  set inputs(value: { [key: string]: any }) {
    this._inputs = value;
    if (!this._differ && value) {
      this._differ = this.differs.find(value).create();
    }
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private differs: KeyValueDiffers,
    private componentFactory: JssComponentFactoryService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private injector: Injector,
    @Inject(PLACEHOLDER_MISSING_COMPONENT_COMPONENT) private missingComponentComponent: Type<any>
  ) {}

  ngOnDestroy() {
    this.destroyed = true;
    this._componentInstances = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rendering'] || changes['renderings']) {
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
    const updates: { [key: string]: any } = {};
    changes.forEachRemovedItem((change) => (updates[change.key] = null));
    changes.forEachAddedItem((change) => (updates[change.key] = change.currentValue));
    changes.forEachChangedItem((change) => (updates[change.key] = change.currentValue));
    this._componentInstances.forEach((componentInstance) =>
      this._setComponentInputs(componentInstance, updates)
    );
  }

  private _setComponentInputs(componentInstance: any, inputs: { [key: string]: any }) {
    Object.keys(inputs).forEach((input) => (componentInstance[input] = inputs[input]));
  }

  private _subscribeComponentOutputs(
    componentInstance: any,
    outputs: { [k: string]: (eventType: any) => void }
  ) {
    Object.keys(outputs)
      .filter(
        (output) => componentInstance[output] && componentInstance[output] instanceof Observable
      )
      .forEach((output) =>
        (componentInstance[output] as Observable<any>)
          .pipe(takeWhile(() => !this.destroyed))
          .subscribe(outputs[output])
      );
  }

  private async _render() {
    this._componentInstances = [];
    this.view.clear();

    if (!this.rendering && !this.renderings) {
      return;
    }

    if (!this.name && !this.renderings) {
      // tslint:disable-next-line:max-line-length
      console.warn(
        `Placeholder name was not specified, and explicit renderings array was not passed. Placeholder requires either name and rendering, or renderings.`
      );
      return;
    }

    const placeholder = this.renderings || getPlaceholder(this.rendering, this.name || '');

    if (!placeholder) {
      console.warn(
        `Placeholder '${this.name}' was not found in the current rendering data`,
        JSON.stringify(this.rendering, null, 2)
      );
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
    } else {
      const factories = await this.componentFactory.getComponents(placeholder);
      const nonGuarded = await this._resolveGuards(factories);
      const withData = await this._resolveData(nonGuarded);

      withData.forEach((rendering, index) => {
        if (this.renderEachTemplate && !isRawRendering(rendering.factory.componentDefinition)) {
          this._renderTemplatedComponent(rendering.factory.componentDefinition, index);
        } else {
          this._renderEmbeddedComponent(rendering.factory, rendering.data, index);
        }
      });

      this.changeDetectorRef.markForCheck();
      this.loaded.emit(this.name);
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

  private _renderEmbeddedComponent(rendering: ComponentFactoryResult, data: any, index: number) {
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

    const componentFactory =
      rendering.componentFactory ||
      this.componentFactoryResolver.resolveComponentFactory(rendering.componentImplementation);

    const componentInstance = this.view.createComponent(componentFactory, index).instance;
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

  private _resolveGuards(results: ComponentFactoryResult[]) {
    const resolved = results.map(async (factory) => {
      if (factory.canActivate != null) {
        const guard =
          'canActivate' in factory.canActivate
            ? factory.canActivate
            : this.injector.get(factory.canActivate);
        const canActivate$ = of(
          guard.canActivate(this.activatedRoute.snapshot, this.router.routerState.snapshot)
        );

        const canActivate = await canActivate$.toPromise();
        return { factory, canActivate };
      }

      return {
        factory,
        canActivate: true,
      };
    });

    return Promise.all(resolved).then((mapped) =>
      mapped.filter((m) => m.canActivate).map((m) => m.factory)
    );
  }

  private _resolveData(factories: ComponentFactoryResult[]) {
    const resolved = factories.map(async (factory) => {
      if (factory.resolve != null) {
        const resolver =
          'resolve' in factory.resolve ? factory.resolve : this.injector.get(factory.resolve);
        const data$ = of(
          resolver.resolve(this.activatedRoute.snapshot, this.router.routerState.snapshot)
        );
        const data = await data$.toPromise();

        return {
          factory,
          data,
        };
      }

      return { factory };
    });

    return Promise.all(resolved);
  }
}
