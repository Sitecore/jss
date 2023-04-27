import { ComponentType } from 'react';
import { GetServerSideComponentProps, GetStaticComponentProps } from './component-props';

export type Module = {
  default: ComponentType;
  getServerSideProps?: GetServerSideComponentProps;
  getStaticProps?: GetStaticComponentProps;
} & {
  [key: string]: ComponentType;
};

export type LazyModule = {
  module?: () => Promise<Module>;
  element?: (isEditing?: boolean) => ComponentType;
};

/**
 * @returns `undefined` module not found
 * @returns `Module` regular module
 * @returns `Promise<Module>` when module should be lazy loaded
 */
export type ComponentModule = (componentName: string) => Module | Promise<Module> | undefined;
