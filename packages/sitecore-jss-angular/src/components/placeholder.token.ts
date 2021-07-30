import { InjectionToken, Type } from '@angular/core';

/** Registers a statically loaded component */
export class ComponentNameAndType {
  name: string;
  type: Type<unknown>;
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
export const PLACEHOLDER_MISSING_COMPONENT_COMPONENT = new InjectionToken<Type<unknown>>(
  'Sc.placeholder.missingComponentComponent'
);
export const DYNAMIC_COMPONENT = new InjectionToken<Type<unknown> | { [s: string]: unknown }>(
  'Sc.placeholder.dynamicComponent'
);
