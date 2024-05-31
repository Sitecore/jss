import { ComponentType } from 'react';

/**
 * @param {string} componentName component to be imported from the component factory
 * @param {string?} exportName component to be imported in case you export multiple components from the same file
 */
export type ComponentFactory = (componentName: string, exportName?: string) => ComponentType | null;

/**
 * Component type returned from component builder / factory
 */
export type JssComponentType = ComponentType & {
  // all dynamic elements will have a separate render prop
  render?: { [key: string]: unknown };
};
