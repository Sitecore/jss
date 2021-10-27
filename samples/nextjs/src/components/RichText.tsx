import React from 'react';
import {
  RenderingVariants,
  RenderingVariantProps,
  RenderingVariantParameters,
  Field,
  RichText as JssRichText,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: Field<string>;
  Title: Field<string>;
}

interface ComponentProps {
  rendering: ComponentRendering & { params: RenderingVariantParameters };
  params: RenderingVariantParameters;
  fields: Fields;
}

const RichText = (props: ComponentProps): JSX.Element => {
  return (
    <RenderingVariants
      fields={props.fields}
      componentName={props.rendering.componentName}
      params={props.rendering.params}
    />
  );
};

export const Default = (props: RenderingVariantProps<Fields>): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component rich-text ${props.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content">
          <JssRichText field={props.fields.Text} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={`component rich-text ${props.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content"> 
          <span className="is-empty-hint">Rich text</span>
        </div>
      </div>
    )
  }    
};

export default RichText;
