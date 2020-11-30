import {
  Field,
  ComponentParams,
  ComponentFactory,
  ComponentRendering,
  LayoutServiceContext,
  RouteData,
} from '@sitecore-jss/sitecore-jss-nextjs';

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
