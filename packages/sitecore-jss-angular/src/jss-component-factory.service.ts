import {
  ComponentFactory,
  Inject,
  Injectable,
  Injector,
  NgModuleFactoryLoader,
  Type
} from '@angular/core';
import { ComponentRendering, HtmlElementRendering } from '@sitecore-jss/sitecore-jss';
import {
  ComponentNameAndModule,
  ComponentNameAndType,
  DYNAMIC_COMPONENT,
  PLACEHOLDER_COMPONENTS,
  PLACEHOLDER_LAZY_COMPONENTS
} from './components/placeholder.token';
import { RawComponent } from './components/raw.component';
import { isRawRendering } from './components/rendering';

export interface ComponentFactoryResult {
  componentImplementation?: Type<any>;
  componentDefinition: ComponentRendering | HtmlElementRendering;
  componentFactory?: ComponentFactory<any>;
}

@Injectable()
export class JssComponentFactoryService {
  private componentMap: Map<string, Type<any>>;
  private lazyComponentMap: Map<string, ComponentNameAndModule>;

  constructor(
    private loader: NgModuleFactoryLoader,
    private injector: Injector,
    @Inject(PLACEHOLDER_COMPONENTS) private components: ComponentNameAndType[],
    @Inject(PLACEHOLDER_LAZY_COMPONENTS) private lazyComponents: ComponentNameAndModule[]
  ) {
      this.componentMap = new Map();
      this.lazyComponentMap = new Map();

      this.components.forEach((c) => this.componentMap.set(c.name, c.type));

      if (this.lazyComponents) {
        this.lazyComponents.forEach((c) => this.lazyComponentMap.set(c.path, c));
      }
   }

  getComponent(component: ComponentRendering): Promise<ComponentFactoryResult> {
    const loadedComponent = this.componentMap.get(component.componentName);

    if (loadedComponent) {
      return Promise.resolve({
        componentDefinition: component,
        componentImplementation: this.componentMap.get(component.componentName),
      });
    }

    const lazyComponent = this.lazyComponentMap.get(component.componentName);

    if (lazyComponent) {
      return this.loader.load(lazyComponent.loadChildren)
      .then((ngModuleFactory) => {
        let componentType = null;
        const moduleRef = ngModuleFactory.create(this.injector);
        const dynamicComponentType = moduleRef.injector.get(DYNAMIC_COMPONENT);
        if (!dynamicComponentType) {
          throw new Error(
            // tslint:disable-next-line:max-line-length
            `JssComponentFactoryService: Lazy load module for component "${lazyComponent.path}" missing DYNAMIC_COMPONENT provider. Missing JssModule.forChild()?`
          );
        }

        if (Array.isArray(dynamicComponentType)) {
          componentType = dynamicComponentType.filter((dynamicComponet) => {
            return component.componentName === dynamicComponet.name;
          })[0].type;
        } else {
          componentType = dynamicComponentType;
        }

        return {
          componentDefinition: component,
          componentImplementation: componentType,
          componentFactory: moduleRef.componentFactoryResolver.resolveComponentFactory(componentType),
        };
      });
    }

    return Promise.resolve({
      componentDefinition: component,
    });
  }

  getComponents(components: Array<ComponentRendering | HtmlElementRendering>): Promise<ComponentFactoryResult[]> {
    // acquire all components and keep them in order while handling their potential async-ness
    return Promise.all(
      components.map((component) => isRawRendering(component)
        ? this.getRawComponent(component)
        : this.getComponent(component))
    );
  }

  private getRawComponent(component: HtmlElementRendering): Promise<ComponentFactoryResult> {
    return Promise.resolve({
      componentImplementation: RawComponent,
      componentDefinition: component,
    });
  }
}
