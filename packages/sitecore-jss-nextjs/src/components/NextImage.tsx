import { mediaApi } from '@sitecore-jss/sitecore-jss/media';
import PropTypes from 'prop-types';
import React from 'react';
import { getEEMarkup, ImageField, ImageFieldValue } from '@sitecore-jss/sitecore-jss-react';
import Image, { ImageLoader, ImageLoaderProps, ImageProps as NextImageProps } from 'next/image';

export interface ImageProps extends Partial<NextImageProps> {
  [attributeName: string]: unknown;
  /** Image field data (consistent with other field types) */
  field?: ImageField | ImageFieldValue;

  /**
   * Can be used to explicitly disable inline editing.
   * If true and `media.editable` has a value, then `media.editable` will be processed
   * and rendered as component output. If false, `media.editable` value will be ignored and not rendered.
   */
  editable?: boolean;

  /**
   * Parameters that will be attached to Sitecore media URLs
   */
  imageParams?: {
    [paramName: string]: string | number;
  };
  /**
   * Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.
   * @example
   * /\/([-~]{1})assets\//i
   * /-assets/website -> /-/jssmedia/website
   * /~assets/website -> /~/jssmedia/website
   */
  mediaUrlPrefix?: RegExp;

  /** HTML attributes that will be appended to the rendered <img /> tag. */
}

export const loader: ImageLoader = ({ src, width }: ImageLoaderProps): string => {
  const url = new URL(`https://cm.jss.localhost${src}`);
  const params = url.searchParams;
  params.set('mw', params.get('mw') || width.toString());
  params.delete('w');

  // TODO:
  // hardcoded hostname at the moment to get around a  bug.
  // image loaders inside Next's repo like Cloudinary
  // have access to a root prop? or env variable. We want to access root also if we need to inject the hostname.
  return url.href;
};

export const NextImage: React.SFC<ImageProps> = ({
  editable,
  imageParams,
  field,
  mediaUrlPrefix,
  ...otherProps
}) => {
  // next handles srcSet, throw error if srcSet is present
  if (otherProps.srcSet) {
    throw new Error(
      'srcSet not supported on Nextjs Image component. Use deviceSizes in next.config.js: https://nextjs.org/docs/api-reference/next/image#device-sizes'
    );
  }

  // next handles src and we use a custom loader,
  // throw error if these are present
  if (otherProps.src || otherProps.loader) {
    throw new Error(
      'Detected conflicting props src or loader. If you wish to use these props, use next/image directly.'
    );
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
    return getEEMarkup(imageField, imageParams, mediaUrlPrefix, otherProps);
  }

  // some wise-guy/gal is passing in a 'raw' image object value
  const img: ImageFieldValue = (dynamicMedia as ImageFieldValue).src
    ? (field as ImageFieldValue)
    : (dynamicMedia.value as ImageFieldValue);
  if (!img) {
    return null;
  }
  // this prop is needed for non-static images - set it to 1x1 transparent pixel base64 encoded if not supplied by user.
  if (!otherProps.blurDataURL) {
    otherProps.blurDataURL =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  }

  const attrs: NextImageProps = {
    ...img,
    ...otherProps,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    src: mediaApi.updateImageUrl(img.src!, imageParams, mediaUrlPrefix),
  };

  if (attrs) {
    return <Image loader={loader} {...attrs} />;
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
