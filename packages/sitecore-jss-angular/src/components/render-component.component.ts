import {
  Component,
  ComponentFactoryResolver,
  Inject,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentRendering, HtmlElementRendering } from '@sitecore-jss/sitecore-jss';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import {
  ComponentFactoryResult,
  JssComponentFactoryService,
} from '../jss-component-factory.service';
import { PLACEHOLDER_MISSING_COMPONENT_COMPONENT } from './placeholder.token';
import { RawComponent } from './raw.component';
import { isRawRendering } from './rendering';

/**
 * Renders a single JSS component given a rendering definition.
 * Useful inside templated placeholders.
 */
@Component({
  selector: 'sc-render-component',
  template: `
    <ng-template #view></ng-template>
  `,
})
export class RenderComponentComponent implements OnChanges {
  private _inputs: { [key: string]: unknown };
  private _differ: KeyValueDiffer<string, unknown>;
  private destroyed = false;

  @Input() rendering: ComponentRendering | HtmlElementRendering;
  @Input() outputs: { [k: string]: (eventType: unknown) => void };
  @ViewChild('view', { read: ViewContainerRef, static: true }) private view: ViewContainerRef;

  @Input()
  set inputs(value: { [key: string]: unknown }) {
    this._inputs = value;
    if (!this._differ && value) {
      this._differ = this.differs.find(value).create();
    }
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private differs: KeyValueDiffers,
    private componentFactory: JssComponentFactoryService,
    @Inject(PLACEHOLDER_MISSING_COMPONENT_COMPONENT)
    private missingComponentComponent: Type<{ [key: string]: unknown }>
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rendering) {
      this._render();
    }
  }

  private _setComponentInputs(
    componentInstance: { [key: string]: unknown },
    inputs: { [key: string]: unknown }
  ) {
    Object.entries(inputs).forEach(
      ([input, inputValue]) =>
        ((componentInstance as { [prop: string]: unknown })[input] = inputValue)
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

  private _render() {
    this.view.clear();

    if (!this.rendering) {
      return;
    }

    const resolveComponent: Promise<ComponentFactoryResult> = isRawRendering(this.rendering)
      ? Promise.resolve({
          componentImplementation: RawComponent,
          componentDefinition: this.rendering,
        })
      : this.componentFactory.getComponent(this.rendering);

    resolveComponent.then((rendering) => {
      if (!rendering.componentImplementation) {
        const componentName = (rendering.componentDefinition as ComponentRendering).componentName;
        console.error(
          `Attempted to render unknown component ${componentName}.`,
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

      const componentInstance = this.view.createComponent(componentFactory, 0).instance;
      componentInstance.rendering = rendering.componentDefinition;
      if (this._inputs) {
        this._setComponentInputs(componentInstance, this._inputs);
      }
      if (this.outputs) {
        this._subscribeComponentOutputs(componentInstance, this.outputs);
      }
    });
  }
}
