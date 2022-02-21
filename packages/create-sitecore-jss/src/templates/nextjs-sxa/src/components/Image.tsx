import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  Text
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Image: ImageField;
  ImageCaption: Field<string>;
  Link: LinkField;
}

type ImageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: ImageProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component image ${props.params.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content">
          <JssImage field={props.fields.Image} />
          <Text className="image-caption field-imagecaption" field={props.fields.ImageCaption} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={`component image ${props.params.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content"> 
          <span className="is-empty-hint">Image</span>
        </div>
      </div>
    )
  }  
};

export const Link = (props: ImageProps): JSX.Element => {
  if (props.fields) {
    return (  
      <div className={`component image ${props.params.styles?.replace(/\|/g, ' ')}`}>
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
      <div className={`component image ${props.params.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content"> 
          <span className="is-empty-hint">Image</span>
        </div>
      </div>
    )
  }  
};