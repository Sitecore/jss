import React from 'react';
import {
  RenderingVariants,
  RenderingVariantProps,
  RenderingVariantParameters,
  Field,
  RichText as JssRichText,
  ComponentRendering,
  useSitecoreContext,
  LayoutServiceContext,
  RouteData
} from '@sitecore-jss/sitecore-jss-nextjs';

export type SitecoreContextValue = LayoutServiceContext & {
  itemId?: string;
  route: RouteData;
};

interface Fields {
  Content: Field<string>;
}

interface ComponentProps {
  rendering: ComponentRendering & { params: RenderingVariantParameters };
  params: RenderingVariantParameters;
  fields: Fields;
}

const PageContent = (props: ComponentProps): JSX.Element => {
  return (
    <RenderingVariants
      fields={props.fields}
      componentName={props.rendering.componentName}
      params={props.rendering.params}
    />
  );
};

const ComponentContent = (props: any) => {
  return (
    <div className={`component content ${props.styles?.replace(/\|/g, ' ')}`}>
      <div className="component-content">
        <div className="field-content">
          {props.children}
        </div>
      </div>
    </div>  
  )
}

export const Default = (props: RenderingVariantProps<Fields>): JSX.Element => {      
  if (props.fields && props.fields.Content) {
    return (
      <ComponentContent styles={props.styles}>
        <JssRichText field={props.fields.Content} />
      </ComponentContent>
    );
  } else {
    const { sitecoreContext } = useSitecoreContext<SitecoreContextValue>();
    return (
      <ComponentContent styles={props.styles}>
        <JssRichText field={sitecoreContext.route.fields.Content} />
      </ComponentContent>
    );    
  }
};

export default PageContent;
