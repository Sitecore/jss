import { mediaApi } from '@sitecore-jss/sitecore-jss';
import PropTypes, { InferProps } from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { convertAttributesToReactProps } from '../utils';

export interface ImageFieldValue {
  src?: string;
  /** HTML attributes that will be appended to the rendered <img /> tag. */
  [attributeName: string]: any;
}

export interface ImageField {
  value?: ImageFieldValue;
  editable?: string;
}

export interface ImageSizeParameters {
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

  srcSet?: Array<ImageSizeParameters>;

  /** HTML attributes that will be appended to the rendered <img /> tag. */
  [attributeName: string]: any;
}

const getEditableWrapper = (editableMarkup: string, ...otherProps: any[]) => (
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
    src: string;
    srcSet: any;
    otherAttrs: any[];
  },
  imageParams: any
) => {
  if (!src) {
    return null;
  }

  const newAttrs: any = {
    ...otherAttrs,
  };

  // update image URL for jss handler and image rendering params
  const resolvedSrc = mediaApi.updateImageUrl(src, imageParams);
  if (srcSet) {
    // replace with HTML-formatted srcset, including updated image URLs
    newAttrs.srcSet = mediaApi.getSrcSet(resolvedSrc, srcSet, imageParams);
  } else {
    newAttrs.src = resolvedSrc;
  }
  return newAttrs;
};

export const Image: React.SFC<ImageProps> = ({
  media,
  editable,
  imageParams,
  field,
  ...otherProps
}: ImagePropTypes) => {
  // allows the mistake of using 'field' prop instead of 'media' (consistent with other helpers)
  if (field && !media) {
    media = field;
  }

  const dynamicMedia: any = media;

  if (!media || (!dynamicMedia.editable && !dynamicMedia.value && !dynamicMedia.src)) {
    return null;
  }

  // we likely have an experience editor value, should be a string
  if (editable && dynamicMedia.editable) {
    const foundImg = mediaApi.findEditorImageTag(dynamicMedia.editable);
    if (!foundImg) {
      return getEditableWrapper(dynamicMedia.editable);
    }

    const foundImgProps = convertAttributesToReactProps(foundImg.attrs);
    // Note: otherProps may override values from foundImgProps, e.g. `style`, `className` prop
    // We do not attempt to merge.
    const imgAttrs = getImageAttrs({ ...foundImgProps, ...otherProps } as any, imageParams);
    if (!imgAttrs) {
      return getEditableWrapper(dynamicMedia.editable);
    }

    const imgHtml = ReactDOMServer.renderToStaticMarkup(<img {...imgAttrs} />);
    const editableMarkup = dynamicMedia.editable.replace(foundImg.imgTag, imgHtml);
    return getEditableWrapper(editableMarkup);
  }

  // some wise-guy/gal is passing in a 'raw' image object value
  const img = dynamicMedia.src ? media : dynamicMedia.value;
  if (!img) {
    return null;
  }

  const attrs = getImageAttrs({ ...img, ...otherProps }, imageParams);
  if (attrs) {
    return <img {...attrs} />;
  }

  return null; // we can't handle the truth
};

const imagePropTypes = {
  media: PropTypes.oneOfType([
    PropTypes.shape({
      src: PropTypes.string,
    }),
    PropTypes.shape({
      value: PropTypes.object,
      editable: PropTypes.string,
    }),
  ]),
  editable: PropTypes.bool,
  imageParams: PropTypes.object,
  field: PropTypes.any
};

type ImagePropTypes = InferProps<typeof imagePropTypes>;

Image.defaultProps = {
  editable: true,
};

Image.displayName = 'Image';
