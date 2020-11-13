import {
  Field,
  ComponentParams,
  ComponentFactory,
  ComponentRendering,
  LayoutServiceContext,
  RouteData,
} from '@sitecore-jss/sitecore-jss-nextjs';

export type StyleguideSitecoreContext = {
  sitecoreContext: LayoutServiceContext & {
    route: RouteData;
  };
};

export type StyleguideSpecimenFields = {
  fields: {
    description: Field<string>;
    heading: Field<string>;
  };
};

export type StyleguideComponentProps = {
  componentFactory: ComponentFactory;
  rendering: ComponentRendering;
  params: ComponentParams;
};

export type StyleguideComponentWithContextProps = StyleguideComponentProps &
  StyleguideSitecoreContext;
