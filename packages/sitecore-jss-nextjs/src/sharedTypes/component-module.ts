import { GetServerSideComponentProps, GetStaticComponentProps } from './component-props';

type Module = {
  default: React.Component;
  getServerSideProps?: GetServerSideComponentProps;
  getStaticProps?: GetStaticComponentProps;
};

export type ComponentModule = (componentName: string) => Module | undefined;
