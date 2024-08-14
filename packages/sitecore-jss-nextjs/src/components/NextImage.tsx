import { mediaApi } from '@sitecore-jss/sitecore-jss/media';
import PropTypes, { Requireable } from 'prop-types';
import React from 'react';
import {
  getEEMarkup,
  ImageProps,
  ImageField,
  ImageFieldValue,
  withFieldMetadata,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-react';
import Image, { ImageProps as NextImageProperties } from 'next/image';
import { withEmptyFieldEditingComponent } from '@sitecore-jss/sitecore-jss-react';
import { DefaultEmptyFieldEditingComponentImage } from '@sitecore-jss/sitecore-jss-react';
import { isFieldValueEmpty, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';

type NextImageProps = ImageProps & Partial<NextImageProperties>;
export const NextImage: React.FC<NextImageProps> = withFieldMetadata<NextImageProps>(
  withEmptyFieldEditingComponent<NextImageProps>(
    ({ editable = true, imageParams, field, mediaUrlPrefix, fill, priority, ...otherProps }) => {
      // next handles src and we use a custom loader,
      // throw error if these are present
      if (otherProps.src) {
        throw new Error('Detected src prop. If you wish to use src, use next/image directly.');
      }

      const dynamicMedia = field as ImageField | ImageFieldValue;

      if (!field || (!dynamicMedia.editable && isFieldValueEmpty(dynamicMedia))) {
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
      // disable image optimization for Edit and Preview
      const unoptimized =
        otherProps.unoptimized !== undefined ? otherProps.unoptimized : field.metadata;

      const attrs = {
        ...img,
        ...otherProps,
        fill,
        priority,
        src: mediaApi.updateImageUrl(
          img.src as string,
          imageParams as { [paramName: string]: string | number },
          mediaUrlPrefix as RegExp
        ),
        unoptimized,
      };

      const imageProps = {
        ...attrs,
        // force replace /media with /jssmedia in src since we _know_ we will be adding a 'mw' query string parameter
        // this is required for Sitecore media API resizing to work properly
        src: mediaApi.replaceMediaUrlPrefix(attrs.src, mediaUrlPrefix as RegExp),
      };

      // Exclude `width`, `height` in case image is responsive, `fill` is used
      if (imageProps.fill) {
        delete imageProps.width;
        delete imageProps.height;
      }

      if (attrs) {
        return <Image alt="" {...imageProps} />;
      }

      return null; // we can't handle the truth
    },
    { defaultEmptyFieldEditingComponent: DefaultEmptyFieldEditingComponentImage }
  )
);

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
  emptyFieldEditingComponent: PropTypes.oneOfType([
    PropTypes.object as Requireable<React.ComponentClass<unknown>>,
    PropTypes.func as Requireable<React.FC<unknown>>,
  ]),
};

NextImage.displayName = 'NextImage';
