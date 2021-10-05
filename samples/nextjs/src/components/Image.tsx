import React from 'react';
import {
  RenderingVariants,
  RenderingVariantProps,
  RenderingVariantParameters,
  Image as JssImage,
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  Text,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Image: ImageField;
  ImageCaption: Field<string>;
  Link: LinkField;
}

interface ComponentProps {
  rendering: ComponentRendering & { params: RenderingVariantParameters };
  params: RenderingVariantParameters;
  fields: Fields;
}

const Image = (props: ComponentProps): JSX.Element => {
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
    <div className={`${props.styles?.replace(/\|/g, ' ')} my-4`}>
      <JssImage field={props.fields.Image} />
      <Text className="image-caption" field={props.fields.ImageCaption} />
    </div>
  );
};

export const Link = (props: RenderingVariantProps<Fields>): JSX.Element => {
  return (
    <div className={`${props.styles?.replace(/\|/g, ' ')} my-4`}>
      <JssLink field={props.fields.Link}>
        <JssImage field={props.fields.Image} />
        <Text tag="span" className="image-caption" field={props.fields.ImageCaption} />
      </JssLink>
    </div>
  );
};

export default Image;
