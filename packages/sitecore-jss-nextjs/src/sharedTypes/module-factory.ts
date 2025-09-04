import { ComponentType } from 'react';
import { GetServerSideComponentProps, GetStaticComponentProps } from './component-props';

/**
 * Represents a module (file)
 */
export type Module = {
  /**
   * Default SXA export
   */
  Default?: ComponentType;
  /**
   * Default Next.js export
   */
  default?: ComponentType;
  /**
   * function for component level data fetching in SSR mode
   */
  getServerSideProps?: GetServerSideComponentProps;
  /**
   * function for component level data fetching in SSG mode
   */
  getStaticProps?: GetStaticComponentProps;
} & {
  /**
   * Custom exports
   */
  [key: string]: ComponentType;
};

/**
 * Represents a module factory
 */
export type ModuleFactory = (componentName: string) => Module | Promise<Module> | null;
