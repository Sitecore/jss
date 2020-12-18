import { GetInitialComponentProps, GetServerSideComponentProps, GetStaticComponentProps } from './component-props';

type Module = {
  default: React.Component;
  getServerSideProps?: GetServerSideComponentProps;
  getStaticProps?: GetStaticComponentProps;
  getInitialProps?: GetInitialComponentProps;
};

export type ComponentModule = (componentName: string) => Module | undefined;
