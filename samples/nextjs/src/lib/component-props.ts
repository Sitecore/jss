import {
  Field,
  ComponentParams,
  ComponentFactory,
  ComponentRendering,
  LayoutServiceContext,
  RouteData,
} from '@sitecore-jss/sitecore-jss-nextjs';

export type StyleguideSitecoreContextValue = LayoutServiceContext & {
  route: RouteData;
};

/**
 * Sitecore Context which you can access using withSitecoreContext/useSitecoreContext
 * @example withSitecoreContext()(ContentBlock)
 * @example const { sitecoreContext } = useSitecoreContext()
 */
export type StyleguideSitecoreContext = {
  sitecoreContext: StyleguideSitecoreContextValue;
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
