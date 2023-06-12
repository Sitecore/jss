import { ComponentType } from 'react';
import { GetServerSideComponentProps, GetStaticComponentProps } from './component-props';

/**
 * Represents a module (file) that can be imported statically
 */
export type Module = {
  Default?: ComponentType;
  default?: ComponentType;
  getServerSideProps?: GetServerSideComponentProps;
  getStaticProps?: GetStaticComponentProps;
} & {
  [key: string]: ComponentType;
};

/**
 * Represents a module (file) that can be imported dynamically
 */
export type LazyModule = {
  module: () => Promise<Module>;
  element: (isEditing?: boolean) => ComponentType;
};

/**
 * Represents a module factory
 */
export type ModuleFactory = (componentName: string) => Module | Promise<Module> | null;
