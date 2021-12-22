import { mediaApi } from '@sitecore-jss/sitecore-jss/media';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { convertAttributesToReactProps } from '@sitecore-jss/sitecore-jss-react';
import {
  default as NextImage,
  ImageLoader,
  ImageLoaderProps,
  ImageProps as NextImageProps,
} from 'next/image';
// import { getPublicUrl } from '../utils';
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

export interface ImageProps extends NextImageProps {
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

const getEditableWrapper = (editableMarkup: string, ...otherProps: unknown[]) => (
  // create an inline wrapper and use dangerouslySetInnerHTML.
  // if we try to parse the EE value, the parser will strip invalid or disallowed attributes from html elements - and EE uses several
  <span
    className="sc-image-wrapper"
    {...otherProps}
    dangerouslySetInnerHTML={{ __html: editableMarkup }}
  />
);

export const Image: React.SFC<ImageProps> = ({
  editable,
  imageParams,
  field,
  mediaUrlPrefix,
  ...otherProps
}) => {
  // next handles srcSet, throw error if srcSet is present
  if (otherProps.srcSet) {
    throw new Error(
      'srcSet not supported on Nextjs Image component. Use deviceSizes in nextjs.config: https://nextjs.org/docs/api-reference/next/image#device-sizes'
    );
  }

  // next handles src and we use a custom loader,
  // throw error if these are present
  if (otherProps.src || otherProps.loader) {
    // TODO: Refine error message
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
    const foundImg = mediaApi.findEditorImageTag(imageField.editable);
    if (!foundImg) {
      return getEditableWrapper(imageField.editable);
    }

    const foundImgProps = convertAttributesToReactProps(foundImg.attrs);
    // Note: otherProps may override values from foundImgProps, e.g. `style`, `className` prop
    // We do not attempt to merge.
    const imgAttrs = { ...foundImgProps, ...otherProps };

    if (!imgAttrs) {
      return getEditableWrapper(imageField.editable);
    }

    const imgHtml = ReactDOMServer.renderToStaticMarkup(<img {...imgAttrs} />);
    const editableMarkup = imageField.editable.replace(foundImg.imgTag, imgHtml);
    return getEditableWrapper(editableMarkup);
  }

  // some wise-guy/gal is passing in a 'raw' image object value
  const img = (dynamicMedia as ImageFieldValue).src
    ? field
    : (dynamicMedia.value as ImageFieldValue);
  if (!img) {
    return null;
  }
  // this prop is needed for non-static images - set it to 1x1 transparent pixel base64 encoded if not supplied by user.
  if (!otherProps.blurDataURL) {
    otherProps.blurDataURL =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  }
  const attrs = { ...img, ...otherProps };

  if (attrs) {
    attrs.src = img;
    // TODO: Finalize loader for XM - export it? we need imageParams but also would
    // like the decouple this function.
    const xmLoader: ImageLoader = ({ src, width }: ImageLoaderProps): string => {
      const loaderProps = { mw: width };
      const mergedProps = { ...imageParams, ...loaderProps };
      // TODO:
      // hardcoded hostname at the moment to get around a  bug.
      // image loaders inside Next's repo like Cloudinary
      // have access to a root prop. We want to access root also if we need to inject the hostname.
      return `$https://cm.jss.localhost${mediaApi.updateImageUrl(
        src,
        mergedProps,
        mediaUrlPrefix
      )}`;
    };
    // TODO?: Create a loader for edge
    // TODO: export - do we need to do anything special for it? (we don't think so)

    return <NextImage loader={xmLoader} {...attrs} />;
  }

  return null; // we can't handle the truth
};

Image.propTypes = {
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

Image.defaultProps = {
  editable: true,
};

Image.displayName = 'Image';
