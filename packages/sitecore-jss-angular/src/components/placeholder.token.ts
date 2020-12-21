import { InjectionToken, Type } from '@angular/core';

/** Registers a statically loaded component */
export class ComponentNameAndType {
  name: string;
  type: Type<any>;
}

/** Registers a lazily loaded component by name and module to lazy load when it's needed */
export interface ComponentNameAndModule {
  /** Name of the component */
  path: string;
  /**
   * Dynamic import of the component,
   * e.g. () => import('./path/to/lazyloadedcomponent.module').then(m => m.LazyLoadedComponentModuleExportName)
   */
  loadChildren: () => Promise<any>;
}

export function instanceOfComponentNameAndType(object: any): object is ComponentNameAndType {
  return 'type' in object;
}

export function instanceOfComponentNameAndModule(object: any): object is ComponentNameAndModule {
  return 'module' in object;
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
export const DYNAMIC_COMPONENT = new InjectionToken<Type<any> | { [s: string]: any }>(
  'Sc.placeholder.dynamicComponent'
);
