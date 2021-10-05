import React from 'react';
import {
  RenderingVariants,
  RenderingVariantProps,
  RenderingVariantParameters,
  Field,
  RichText as JssRichText,
  Text,
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
  return (
    <JssRichText
      className={`${props.styles?.replace(/\|/g, ' ')} my-4`}
      field={props.fields.Text}
    />
  );
};

export const WithTitle = (props: RenderingVariantProps<Fields>): JSX.Element => {
  return (
    <div className={`${props.styles?.replace(/\|/g, ' ')} my-4`}>
      <Text tag="h4" field={props.fields.Title} />
      <JssRichText field={props.fields.Text} />
    </div>
  );
};

export default RichText;
