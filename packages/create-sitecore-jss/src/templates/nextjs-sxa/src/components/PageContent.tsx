import React from 'react';
import { RichText as JssRichText, useSitecoreContext, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Content: RichTextField;
}

type PageContentProps = {
  params: { [key: string]: string };
  fields: Fields;
};

type ComponentContentProps = {
  styles: string;
  children: JSX.Element;
};

const ComponentContent = (props: ComponentContentProps) => {
  return (
    <div className={`component content ${props.styles}`}>
      <div className="component-content">
        <div className="field-content">{props.children}</div>
      </div>
    </div>
  );
};

export const Default = (props: PageContentProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  if (!(props.fields && props.fields.Content) && !sitecoreContext?.route?.fields?.Content) {
    return (
      <div className={`component content ${props.params.styles}`}>
        <div className="component-content">
          <div className="field-content">[Content]</div>
        </div>
      </div>
    );
  }

  const field = (
    props.fields && props.fields.Content
      ? props.fields.Content
      : sitecoreContext?.route?.fields?.Content
  ) as RichTextField;

  return (
    <ComponentContent styles={props.params.styles}>
      <JssRichText field={field} />
    </ComponentContent>
  );
};
