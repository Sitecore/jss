import React from 'react';
import PropTypes from 'prop-types';
import { Image as NativeImage, ImageSourcePropType } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { mediaApi } from '@sitecore-jss/sitecore-jss';

export interface ImageFieldValue {
  src?: string | number;
  /** HTML attributes that will be appended to the rendered <img /> tag. */
  [attributeName: string]: any;
}

export interface ImageField {
  value?: ImageFieldValue;
  editable?: string;
}

export interface ImageProps {
  /** The image field data. */
  media: ImageField | ImageFieldValue | null;

  /**
   * Parameters that will be attached to Sitecore media URLs
   */
  imageUrlParams?:
    | {
        [paramName: string]: string;
      }
    | object
    | null;

  /** HTML attributes that will be appended to the rendered <img /> tag. */
  [attributeName: string]: any;
}

const getImageAttrs = (
  {
    src,
    width,
    height,
    style,
    ...otherAttrs
  }: {
    src: string | number;
    width: number | undefined;
    height: number | undefined;
    style: any;
    otherAttrs: any[];
  },
  imageUrlParams: any
) => {
  if (!src) {
    return null;
  }

  const newAttrs: any = { ...otherAttrs };

  // for network images, "width" and "height" are required as style properties, otherwise the image likely won't display.
  // for static images, "width" and "height" are not required, but if they are passed in then add them to the style prop.
  const imgStyles: any = {};
  // react-native doesn't seem to like `&&` assignment, so use if statements instead
  if (width) {
    imgStyles.width = typeof width !== 'number' ? Number(width) : width;
  }
  if (height) {
    imgStyles.height = typeof height !== 'number' ? Number(height) : height;
  }

  // react native styles/StyleSheets can be merged by passing them as an array to the native Image component
  newAttrs.style = style ? [imgStyles, style] : imgStyles;

  // in react-native, you need to "import" static assets via `require` statements
  // when the packager builds your app, it (presumably) statically analyzes your code, extracts
  // the assets that are `require`d into an array/map, then assigns them a numerical value.
  if (typeof src === 'number') {
    newAttrs.source = src;
  } else {
    // assume we have a "network image", i.e. something loaded via http(s)
    // update image URL for jss handler and image rendering params
    const uri = mediaApi.updateImageUrl(src, imageUrlParams);
    // for network images, the "source" prop is an object with at least "uri" value, e.g. { uri: 'http://aviato.com/myimg.jpg' }
    newAttrs.source = { uri };
  }

  return newAttrs;
};

export const isSvgImage = (source: ImageSourcePropType) => {
	const isSvg = /\.svg($|\?|\&)/g;
	const src = NativeImage.resolveAssetSource(source);

	return src && isSvg.test(src.uri);
}

export const Image: React.SFC<ImageProps> = ({ media, imageUrlParams, field, ...otherProps }) => {
  let dynamicMedia: any = media;

  // allows the mistake of using 'field' prop instead of 'media' (consistent with other helpers)
  if (field && !media) {
    dynamicMedia = field;
  }

  if (!dynamicMedia || (!dynamicMedia.value && !dynamicMedia.src)) {
    return null;
  }

  // some wise-guy/gal might pass in a 'raw' image object value
  const img = dynamicMedia.src ? dynamicMedia : dynamicMedia.value;
  if (!img) {
    return null;
  }

	const attrs = getImageAttrs({ ...img, ...otherProps }, imageUrlParams);
	
	if (attrs && isSvgImage(attrs.source))
		return <SvgUri {...attrs} />;

  if (attrs)
    return <NativeImage {...attrs} />;

  return null; // we can't handle the truth
};

Image.propTypes = {
  media: PropTypes.oneOfType([
    PropTypes.shape({
      src: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    PropTypes.shape({
      value: PropTypes.object,
    }),
  ]),
  imageUrlParams: PropTypes.object,
};

Image.displayName = 'Image';
