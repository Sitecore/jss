import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  Text,
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

const ImageDefault = (props: ImageProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

export const Default = (props: ImageProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component image ${props.params.styles}`}>
        <div className="component-content">
          <JssImage field={props.fields.Image} />
          <Text className="image-caption field-imagecaption" field={props.fields.ImageCaption} />
        </div>
      </div>
    );
  }

  return <ImageDefault {...props} />;
};

export const Link = (props: ImageProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component image ${props.params.styles}`}>
        <div className="component-content">
          <JssLink field={props.fields.Link}>
            <JssImage field={props.fields.Image} />
            <Text
              tag="span"
              className="image-caption field-imagecaption"
              field={props.fields.ImageCaption}
            />
          </JssLink>
        </div>
      </div>
    );
  }

  return <ImageDefault {...props} />;
};
