import { GetServerSideComponentProps, GetStaticComponentProps } from './component-props';

export type Module = {
  default: React.Component;
  getServerSideProps?: GetServerSideComponentProps;
  getStaticProps?: GetStaticComponentProps;
};

/**
 * @returns `undefined` module not found
 * @returns `Module` regular module
 * @returns `Promise<Module>` when module should be lazy loaded
 */
export type ComponentModule = (componentName: string) => Module | Promise<Module> | undefined;
