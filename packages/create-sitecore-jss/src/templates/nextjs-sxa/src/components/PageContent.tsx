import React from 'react';
import {
  Field,
  RichText as JssRichText,
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

type PageContentProps = {
  params: { [key: string]: string };
  fields: Fields;
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

export const Default = (props: PageContentProps): JSX.Element => { 
  const { sitecoreContext } = useSitecoreContext<SitecoreContextValue>();

  if (!(props.fields && props.fields.Content) && !sitecoreContext.route.fields.Content) {
    return (
      <div className={`component content ${props.params.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content">
          <div className="field-content">
            [Content]
          </div>
        </div>
      </div>  
    )
  }
  
  if (props.fields && props.fields.Content) {
    return (
      <ComponentContent styles={props.params.styles}>
        <JssRichText field={props.fields.Content} />
      </ComponentContent>
    );
  } else {    
    return (
      <ComponentContent styles={props.params.styles}>
        <JssRichText field={sitecoreContext.route.fields.Content} />
      </ComponentContent>
    );    
  }
};
