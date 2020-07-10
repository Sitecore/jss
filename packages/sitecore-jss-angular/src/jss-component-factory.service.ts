import {
  Compiler,
  ComponentFactory,
  Inject,
  Injectable,
  Injector,
  NgModuleFactory,
  NgModuleFactoryLoader,
  Type
} from '@angular/core';
import { LoadChildren } from '@angular/router';
import { ComponentRendering, HtmlElementRendering } from '@sitecore-jss/sitecore-jss';
import { from, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import {
  ComponentNameAndModule,
  ComponentNameAndType,
  DYNAMIC_COMPONENT,
  JssCanActivate,
  JssResolve,
  PLACEHOLDER_COMPONENTS,
  PLACEHOLDER_LAZY_COMPONENTS
} from './components/placeholder.token';
import { RawComponent } from './components/raw.component';
import { isRawRendering } from './components/rendering';
import { wrapIntoObservable } from './utils';

export interface ComponentFactoryResult {
  componentImplementation?: Type<any>;
  componentDefinition: ComponentRendering | HtmlElementRendering;
  componentFactory?: ComponentFactory<any>;
  canActivate?:
    | JssCanActivate
    | Type<JssCanActivate>
    | Array<JssCanActivate | Type<JssCanActivate>>;
  resolve?: { [key: string]: JssResolve<any> | Type<JssResolve<any>> };
}

@Injectable()
export class JssComponentFactoryService {
  private componentMap: Map<string, ComponentNameAndType>;
  private lazyComponentMap: Map<string, ComponentNameAndModule>;

  constructor(
    private compiler: Compiler,
    private loader: NgModuleFactoryLoader,
    private injector: Injector,
    @Inject(PLACEHOLDER_COMPONENTS) private components: ComponentNameAndType[],
    @Inject(PLACEHOLDER_LAZY_COMPONENTS) private lazyComponents: ComponentNameAndModule[]
  ) {
      this.componentMap = new Map();
      this.lazyComponentMap = new Map();

      this.components.forEach((c) => this.componentMap.set(c.name, c));

      if (this.lazyComponents) {
        this.lazyComponents.forEach((c) => this.lazyComponentMap.set(c.path, c));
      }
   }

  getComponent(component: ComponentRendering): Promise<ComponentFactoryResult> {
    const loadedComponent = this.componentMap.get(component.componentName);

    if (loadedComponent) {
      return Promise.resolve({
        componentDefinition: component,
        componentImplementation: loadedComponent.type,
        canActivate: loadedComponent.canActivate,
      });
    }

    const lazyComponent = this.lazyComponentMap.get(component.componentName);

    if (lazyComponent) {
      return this.loadModuleFactory(lazyComponent.loadChildren)
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

        if (component.componentName in dynamicComponentType) {
          componentType = (dynamicComponentType as {[s: string]: any})[component.componentName];
        } else {
          if (typeof dynamicComponentType === 'function') {
            componentType = dynamicComponentType;
          } else {
            throw new Error(
              // tslint:disable-next-line:max-line-length
              `JssComponentFactoryService: Lazy load module for component "${lazyComponent.path}" missing DYNAMIC_COMPONENT provider. Missing JssModule.forChild()?`
            );
          }
        }

        return {
          componentDefinition: component,
          componentImplementation: componentType,
          componentFactory: moduleRef.componentFactoryResolver.resolveComponentFactory(componentType),
          canActivate: lazyComponent.canActivate,
        };
      });
    }

    return Promise.resolve({
      componentDefinition: component,
    });
  }

  private loadModuleFactory(loadChildren: LoadChildren): Promise<NgModuleFactory<any>> {
    if (typeof loadChildren === 'string') {
      return this.loader.load(loadChildren);
    } else {
      return wrapIntoObservable(loadChildren())
        .pipe(
          mergeMap((t: any) => {
            if (t instanceof NgModuleFactory) {
              return of(t);
            } else {
              return from(this.compiler.compileModuleAsync(t));
            }
          }),
          take(1)
        )
        .toPromise();
    }
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
