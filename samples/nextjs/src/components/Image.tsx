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
  if (props.fields) {
    return (
      <div className={`component image ${props.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content">
          <JssImage field={props.fields.Image} />
          <Text className="image-caption field-imagecaption" field={props.fields.ImageCaption} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={`component image ${props.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content"> 
          <span className="is-empty-hint">Image</span>
        </div>
      </div>
    )
  }  
};

export const Link = (props: RenderingVariantProps<Fields>): JSX.Element => {
  if (props.fields) {
    return (  
      <div className={`component image ${props.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content">
          <JssLink field={props.fields.Link}>
            <JssImage field={props.fields.Image} />
            <Text tag="span" className="image-caption field-imagecaption" field={props.fields.ImageCaption} />
          </JssLink>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`component image ${props.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content"> 
          <span className="is-empty-hint">Image</span>
        </div>
      </div>
    )
  }  
};

export default Image;
