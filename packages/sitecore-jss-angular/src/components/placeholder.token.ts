import { InjectionToken, Type } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Data,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentFactoryResult } from '../jss-component-factory.service';
import { ComponentRendering } from '../public_api';

/** Registers a statically loaded component */
export class ComponentNameAndType {
  name: string;
  type: Type<unknown>;

  canActivate?:
    | JssCanActivate
    | Type<JssCanActivate>
    | Array<JssCanActivate | Type<JssCanActivate>>;
  resolve?: { [key: string]: JssResolve<any> | Type<JssResolve<any>> };
}

/** Registers a lazily loaded component by name and module to lazy load when it's needed */
export interface ComponentNameAndModule {
  /** Name of the component */
  path: string;
  /**
   * Dynamic import of the component,
   * e.g. () => import('./path/to/lazyloadedcomponent.module').then(m => m.LazyLoadedComponentModuleExportName)
   */
  loadChildren: () => Promise<Type<unknown>>;
  canActivate?:
    | JssCanActivate
    | Type<JssCanActivate>
    | Array<JssCanActivate | Type<JssCanActivate>>;
  resolve?: { [key: string]: Resolve<any> | Type<Resolve<any>> };
}

/**
 * @param {unknown} object
 */
export function instanceOfComponentNameAndType(object: unknown): object is ComponentNameAndType {
  return typeof object === 'object' && object !== null && 'type' in object;
}

/**
 * @param {unknown} object
 */
export function instanceOfComponentNameAndModule(
  object: unknown
): object is ComponentNameAndModule {
  return typeof object === 'object' && object !== null && 'module' in object;
}

export const PLACEHOLDER_COMPONENTS = new InjectionToken<ComponentNameAndType[]>(
  'Sc.placeholder.components'
);
export const PLACEHOLDER_LAZY_COMPONENTS = new InjectionToken<ComponentNameAndType[]>(
  'Sc.placeholder.lazyComponents'
);
export const PLACEHOLDER_MISSING_COMPONENT_COMPONENT = new InjectionToken<Type<any>>(
  'Sc.placeholder.missingComponentComponent'
);
export const PLACEHOLDER_HIDDEN_RENDERING_COMPONENT = new InjectionToken<Type<unknown>>(
  'Sc.placeholder.hiddenRenderingComponent'
);
export const DYNAMIC_COMPONENT = new InjectionToken<Type<any> | { [s: string]: any }>(
  'Sc.placeholder.dynamicComponent'
);

export type GuardResolver = (result: ComponentFactoryResult[]) => Promise<ComponentFactoryResult[]>;

export const GUARD_RESOLVER = new InjectionToken<GuardResolver>('Sc.placeholder.guardResolver');

export type DataResolver = (
  result: ComponentFactoryResult[]
) => Promise<Array<{ factory: ComponentFactoryResult; data: Data }>>;

export const DATA_RESOLVER = new InjectionToken<DataResolver>('Sc.placeholder.dataResolver');

export interface GuardInput {
  activatedRoute: ActivatedRouteSnapshot;
  routerState: RouterStateSnapshot;
  rendering: ComponentRendering;
}

export interface JssCanActivate {
  canActivate(
    input: GuardInput
  ):
    | Observable<boolean | UrlTree | string | string[]>
    | Promise<boolean | UrlTree | string | string[]>
    | boolean
    | UrlTree
    | string
    | string[];
}

export interface JssResolve<T> {
  resolve(input: GuardInput): Observable<T> | Promise<T> | T;
}
