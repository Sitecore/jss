import {
  Field,
  ComponentParams,
  ComponentFactory,
  ComponentRendering,
  LayoutServiceContext,
  RouteData,
} from '@sitecore-jss/sitecore-jss-nextjs';

export type StyleguideSitecoreContextValue = LayoutServiceContext & {
  itemId?: string;
  route: RouteData;
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
 * You can access `sitecoreContext` by withSitecoreContext/useSitecoreContext
 * @example withSitecoreContext()(ContentBlock)
 * @example const { sitecoreContext } = useSitecoreContext()
 */
export type StyleguideComponentWithContextProps = StyleguideComponentProps & {
  sitecoreContext: StyleguideSitecoreContextValue;
};
