import {
  Field,
  ComponentParams,
  ComponentRendering,
  SitecoreContextValue,
} from '@sitecore-jss/sitecore-jss-nextjs';

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
  sitecoreContext: SitecoreContextValue;
};
