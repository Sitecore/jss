import { ComponentType } from 'react';

/**
 * @param {string} componentName component to be imported from the component factory
 * @param {string?} exportName component to be imported in case you export multiple components from the same file
 */
export type ComponentFactory = (
  componentName: string,
  exportName?: string
) => JssComponentType | null;

/**
 * Component type returned from component builder / factory
 */
export type JssComponentType = ComponentType & {
  // all elements created with nextjs dynamic() will have a separate render prop
  // react elements will not have it - so it's optional here
  render?: { [key: string]: unknown };
};

/**
 * Shared editing field props
 */
export interface EditableFieldProps {
  /**
   * Can be used to explicitly disable inline editing.
   * If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.
   * @default true
   */
  editable?: boolean;
  /**
   * -- Edit Mode Metadata --
   *
   * Custom element to render in Pages in Metadata edit mode if field value is empty
   */
  emptyFieldEditingComponent?: React.ComponentClass | React.FC;
}
