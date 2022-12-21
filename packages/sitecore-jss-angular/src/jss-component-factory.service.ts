import {
  ComponentFactory,
  Inject,
  Injectable,
  Injector,
  Type,
  Compiler,
  NgModuleFactory,
  createNgModuleRef,
} from '@angular/core';
import { LoadChildren } from '@angular/router';
import { ComponentRendering, HtmlElementRendering } from '@sitecore-jss/sitecore-jss/layout';
import { from, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import {
  ComponentNameAndModule,
  ComponentNameAndType,
  DYNAMIC_COMPONENT,
  JssCanActivate,
  JssCanActivateFn,
  JssResolve,
  PLACEHOLDER_COMPONENTS,
  PLACEHOLDER_LAZY_COMPONENTS,
} from './components/placeholder.token';
import { RawComponent } from './components/raw.component';
import { isRawRendering } from './components/rendering';
import { wrapIntoObservable } from './utils';

export interface ComponentFactoryResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentImplementation?: Type<any>;
  componentDefinition: ComponentRendering | HtmlElementRendering;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentFactory?: ComponentFactory<any>;
  canActivate?:
    | JssCanActivate
    | Type<JssCanActivate>
    | JssCanActivateFn
    | Array<JssCanActivate | JssCanActivateFn | Type<JssCanActivate>>;
  resolve?: { [key: string]: JssResolve<any> | Type<JssResolve<any>> };
}

@Injectable()
export class JssComponentFactoryService {
  private componentMap: Map<string, ComponentNameAndType>;
  private lazyComponentMap: Map<string, ComponentNameAndModule>;

  constructor(
    private injector: Injector,
    private compiler: Compiler,
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
        resolve: loadedComponent.resolve,
      });
    }

    const lazyComponent = this.lazyComponentMap.get(component.componentName);

    if (lazyComponent) {
      return lazyComponent.loadChildren().then((lazyChild) => {
        let componentType = null;
        const moduleRef = createNgModuleRef(lazyChild, this.injector);
        const dynamicComponentType = moduleRef.injector.get(DYNAMIC_COMPONENT);
        if (!dynamicComponentType) {
          throw new Error(
            `JssComponentFactoryService: Lazy load module for component "${lazyComponent.path}" missing DYNAMIC_COMPONENT provider. Missing JssModule.forChild()?`
          );
        }

        if (component.componentName in dynamicComponentType) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          componentType = (dynamicComponentType as { [s: string]: any })[component.componentName];
        } else {
          if (typeof dynamicComponentType === 'function') {
            componentType = dynamicComponentType;
          } else {
            throw new Error(
              `JssComponentFactoryService: Lazy load module for component "${lazyComponent.path}" missing DYNAMIC_COMPONENT provider. Missing JssModule.forChild()?`
            );
          }
        }

        return {
          componentDefinition: component,
          componentImplementation: componentType,
          componentFactory: moduleRef.componentFactoryResolver.resolveComponentFactory(
            componentType
          ),
          canActivate: lazyComponent.canActivate,
          resolve: lazyComponent.resolve,
        };
      });
    }

    return Promise.resolve({
      componentDefinition: component,
    });
  }

  private loadModuleFactory(loadChildren: LoadChildren): Promise<NgModuleFactory<unknown>> {
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

  getComponents(
    components: Array<ComponentRendering | HtmlElementRendering>
  ): Promise<ComponentFactoryResult[]> {
    // acquire all components and keep them in order while handling their potential async-ness
    return Promise.all(
      components.map((component) =>
        isRawRendering(component) ? this.getRawComponent(component) : this.getComponent(component)
      )
    );
  }

  private getRawComponent(component: HtmlElementRendering): Promise<ComponentFactoryResult> {
    return Promise.resolve({
      componentImplementation: RawComponent,
      componentDefinition: component,
    });
  }
}
