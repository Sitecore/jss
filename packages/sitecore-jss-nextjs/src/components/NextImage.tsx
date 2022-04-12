import { mediaApi } from '@sitecore-jss/sitecore-jss/media';
import PropTypes from 'prop-types';
import React from 'react';
import { transformImageUrl } from '../utils';

import {
  getEEMarkup,
  ImageProps,
  ImageField,
  ImageFieldValue,
} from '@sitecore-jss/sitecore-jss-react';
import Image, {
  ImageLoader,
  ImageLoaderProps,
  ImageProps as NextImageProperties,
} from 'next/image';

type NextImageProps = Omit<ImageProps, 'media'> & Partial<NextImageProperties>;

export const sitecoreLoader: ImageLoader = ({ src, width }: ImageLoaderProps): string => {
  const [root, paramString] = src.split('?');
  const params = new URLSearchParams(paramString);
  params.set('mw', width.toString());
  return `${root}?${params}`;
};

export const NextImage: React.SFC<NextImageProps> = ({
  editable,
  imageParams,
  field,
  mediaUrlPrefix,
  ...otherProps
}) => {
  // next handles src and we use a custom loader,
  // throw error if these are present
  if (otherProps.src) {
    throw new Error('Detected src prop. If you wish to use src, use next/image directly.');
  }

  const dynamicMedia = field as ImageField | ImageFieldValue;

  if (
    !field ||
    (!dynamicMedia.editable && !dynamicMedia.value && !(dynamicMedia as ImageFieldValue).src)
  ) {
    return null;
  }

  const imageField = dynamicMedia as ImageField;

  // we likely have an experience editor value, should be a string
  if (editable && imageField.editable) {
    return getEEMarkup(
      imageField,
      imageParams as { [paramName: string]: string | number },
      mediaUrlPrefix as RegExp,
      otherProps as { src: string }
    );
  }

  // some wise-guy/gal is passing in a 'raw' image object value
  const img: ImageFieldValue = (dynamicMedia as ImageFieldValue).src
    ? (field as ImageFieldValue)
    : (dynamicMedia.value as ImageFieldValue);
  if (!img) {
    return null;
  }

  const attrs = {
    ...img,
    ...otherProps,
    src: mediaApi.updateImageUrl(
      img.src as string,
      imageParams as { [paramName: string]: string | number },
      mediaUrlPrefix as RegExp
    ),
  };

  const imageProps = {
    ...attrs,
    // force replace /media with /jssmedia in src
    src: transformImageUrl(attrs.src, mediaUrlPrefix as RegExp),
  };

  console.log(imageProps.src);

  const loader = (otherProps.loader ? otherProps.loader : sitecoreLoader) as ImageLoader;

  if (attrs) {
    return <Image loader={loader} {...imageProps} />;
  }

  return null; // we can't handle the truth
};

NextImage.propTypes = {
  field: PropTypes.oneOfType([
    PropTypes.shape({
      src: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      value: PropTypes.object,
      editable: PropTypes.string,
    }),
  ]),
  editable: PropTypes.bool,
  mediaUrlPrefix: PropTypes.instanceOf(RegExp),
  imageParams: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]).isRequired
  ),
};

NextImage.defaultProps = {
  editable: true,
};

NextImage.displayName = 'NextImage';
