import React, { useContext } from 'react';
import {
  Field,
  ComponentParams,
  ComponentFactory,
  ComponentRendering,
  LayoutServiceContext,
  RouteData,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Shape of component props storage
 */
export type ComponentProps = {
  [componentName: string]: unknown;
};

/**
 * Component props context which we are using in order to store data fetched on components level (getStaticProps/getServerSideProps)
 */
export const ComponentPropsContext = React.createContext<{ [key: string]: unknown }>({});

/**
 * Hook in order to get access to props related to specific component. Data comes from ComponentPropsContext.
 * @see ComponentPropsContext
 */
export const useComponentProps = <ComponentData>(componentName: string): ComponentData => {
  const data = useContext(ComponentPropsContext);

  return data[componentName] as ComponentData;
};

/**
 * Type of side effect function which could be invoked on component level (getStaticProps/getServerSideProps)
 */
export type ComponentPropsFetchFunction<PropsContext> = {
  (
    rendering: ComponentRendering,
    routeData: LayoutServiceData | null,
    context: PropsContext
  ): Promise<unknown>;
};

/**
 * Sitecore Context which you can access using withSitecoreContext
 * @example withSitecoreContext()(ContentBlock)
 */
export type StyleguideSitecoreContext = {
  sitecoreContext: LayoutServiceContext & {
    route: RouteData;
  };
};

/**
 * Shared styleguide specimen fields
 */
export type StyleguideSpecimenFields = {
  fields: {
    description: Field<string>;
    heading: Field<string>;
  };
};

/**
 * Shared styleguide component props
 */
export type StyleguideComponentProps = {
  componentFactory: ComponentFactory;
  rendering: ComponentRendering;
  params: ComponentParams;
};

/**
 * Styleguide component props with context
 * @example withSitecoreContext()(ContentBlock)
 */
export type StyleguideComponentWithContextProps = StyleguideComponentProps &
  StyleguideSitecoreContext;
