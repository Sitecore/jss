import { mediaApi } from '@sitecore-jss/sitecore-jss/media';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { convertAttributesToReactProps } from '../utils';

export interface ImageFieldValue {
  [attributeName: string]: unknown;
  src?: string;
  /** HTML attributes that will be appended to the rendered <img /> tag. */
}

export interface ImageField {
  value?: ImageFieldValue;
  editable?: string;
}

export interface ImageSizeParameters {
  [attr: string]: string | number | undefined;
  /** Fixed width of the image */
  w?: number;
  /** Fixed height of the image */
  h?: number;
  /** Max width of the image */
  mw?: number;
  /** Max height of the image */
  mh?: number;
  /** Ignore aspect ratio */
  iar?: 1 | 0;
  /** Allow stretch */
  as?: 1 | 0;
  /** Image scale. Defaults to 1.0 */
  sc?: number;
}

export interface ImageProps {
  [attributeName: string]: unknown;
  /**
   * The image field data.
   * @deprecated use field property instead
   */
  media?: ImageField | ImageFieldValue;

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

  srcSet?: ImageSizeParameters[];

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

const getEditableWrapper = (editableMarkup: string, ...otherProps: unknown[]) => (
  // create an inline wrapper and use dangerouslySetInnerHTML.
  // if we try to parse the EE value, the parser will strip invalid or disallowed attributes from html elements - and EE uses several
  <span
    className="sc-image-wrapper"
    {...otherProps}
    dangerouslySetInnerHTML={{ __html: editableMarkup }}
  />
);

const getImageAttrs = (
  {
    src,
    srcSet,
    ...otherAttrs
  }: {
    [key: string]: unknown;
    src?: string;
    srcSet?: ImageSizeParameters[];
  },
  imageParams?: { [paramName: string]: string | number },
  mediaUrlPrefix?: RegExp
) => {
  if (!src) {
    return null;
  }

  const newAttrs: { [attr: string]: unknown } = {
    ...otherAttrs,
  };

  // update image URL for jss handler and image rendering params
  const resolvedSrc = mediaApi.updateImageUrl(src, imageParams, mediaUrlPrefix);
  if (srcSet) {
    // replace with HTML-formatted srcset, including updated image URLs
    newAttrs.srcSet = mediaApi.getSrcSet(resolvedSrc, srcSet, imageParams, mediaUrlPrefix);
  }
  // always output original src as fallback for older browsers
  newAttrs.src = resolvedSrc;
  return newAttrs;
};

/**
 * @param imageField {ImageField} provides the dynamicMedia which is used to render the image
 * @param imageParams {ImageProp['imageParams']}} provides the image parameters that will be attached to the image URL
 * @param mediaUrlPrefix {RegExp} the url prefix regex used in the mediaApi
 * @param otherProps {ImageProps} all other props included on the image component
 * @returns Experience Editor Markup
 */
export const getEEMarkup = (
  imageField: ImageField,
  imageParams?: ImageProps['imageParams'],
  mediaUrlPrefix?: RegExp,
  otherProps?: ImageProps
) => {
  // we want to get rid of class prop in compliance with JSX
  if (otherProps.class) {
    // if any classes are defined properly already
    if (otherProps.className) {
      let className: string = otherProps.className as string;
      className += ` ${otherProps.class}`;
      otherProps.className = className;
    } else {
      otherProps.className = otherProps.class;
    }
    delete otherProps.class;
  }
  // we likely have an experience editor value, should be a string
  const foundImg = mediaApi.findEditorImageTag(imageField.editable);
  if (!foundImg) {
    return getEditableWrapper(imageField.editable);
  }

  const foundImgProps = convertAttributesToReactProps(foundImg.attrs);
  // Note: otherProps may override values from foundImgProps, e.g. `style`, `className` prop
  // We do not attempt to merge.
  const imgAttrs = getImageAttrs({ ...foundImgProps, ...otherProps }, imageParams, mediaUrlPrefix);
  if (!imgAttrs) {
    return getEditableWrapper(imageField.editable);
  }

  const imgHtml = ReactDOMServer.renderToStaticMarkup(<img {...imgAttrs} />);
  const editableMarkup = imageField.editable.replace(foundImg.imgTag, imgHtml);
  return getEditableWrapper(editableMarkup);
};

export const Image: React.SFC<ImageProps> = ({
  media,
  editable,
  imageParams,
  field,
  mediaUrlPrefix,
  ...otherProps
}) => {
  // allows the mistake of using 'field' prop instead of 'media' (consistent with other helpers)
  if (field && !media) {
    media = field;
  }

  const dynamicMedia = media as ImageField | ImageFieldValue;

  if (
    !media ||
    (!dynamicMedia.editable && !dynamicMedia.value && !(dynamicMedia as ImageFieldValue).src)
  ) {
    return null;
  }

  const imageField = dynamicMedia as ImageField;

  if (editable && imageField.editable) {
    return getEEMarkup(imageField, imageParams, mediaUrlPrefix, otherProps);
  }

  // some wise-guy/gal is passing in a 'raw' image object value
  const img = (dynamicMedia as ImageFieldValue).src
    ? media
    : (dynamicMedia.value as ImageFieldValue);
  if (!img) {
    return null;
  }

  const attrs = getImageAttrs({ ...img, ...otherProps }, imageParams, mediaUrlPrefix);
  if (attrs) {
    return <img {...attrs} />;
  }

  return null; // we can't handle the truth
};

Image.propTypes = {
  media: PropTypes.oneOfType([
    PropTypes.shape({
      src: PropTypes.string,
    }),
    PropTypes.shape({
      value: PropTypes.object,
      editable: PropTypes.string,
    }),
  ]),
  field: PropTypes.oneOfType([
    PropTypes.shape({
      src: PropTypes.string,
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

Image.defaultProps = {
  editable: true,
};

Image.displayName = 'Image';
