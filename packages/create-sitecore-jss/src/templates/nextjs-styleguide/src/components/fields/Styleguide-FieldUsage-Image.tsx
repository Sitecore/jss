import { NextImage, ImageField, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from 'components/styleguide/Styleguide-Specimen';
import { ComponentProps } from 'lib/component-props';
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';

type StyleguideFieldUsageImageProps = ComponentProps &
  StyleguideSpecimenFields & {
    fields: {
      sample1: ImageField;
      sample2: ImageField;
    };
  };

/**
 * Demonstrates usage of an Image content field within JSS.
 * Image field data is uploaded into the Sitecore Media Library.
 */
const StyleguideFieldUsageImage = (props: StyleguideFieldUsageImageProps): JSX.Element => (
  <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-image">
    {/*
      You can use any of the props available in the next/image.
      E.g. we have used 'priority' to demonstrate how an image could be considered high priority and preload.
      Lazy loading is automatically disabled for images using priority.
      See here for all the features provided by next/image: https://nextjs.org/docs/api-reference/next/image
    */}
    <p>Plain image</p>
    <NextImage field={props.fields.sample1} priority height="51" width="204" />

    {/*
      Advanced image usage example
      editable: controls whether image can be edited in Sitecore Experience Editor
      imageParams: parameters that are passed to Sitecore to perform server-side resizing of the image.
      Sample rescales image to max 100x50 dimensions on the server, respecting aspect ratio
      IMPORTANT: imageParams must be whitelisted for resizing to occur. See /sitecore/config/*.config (search for 'allowedMediaParams')
      any other attributes: pass through to img tag
    */}
    <p>Advanced image (not editable)</p>
    <NextImage
      field={props.fields.sample2}
      editable={false}
      imageParams={{ mw: 100, mh: 50 }}
      height="50"
      width="94"
      data-sample="other-attributes-pass-through"
    />

    {/*
      srcSet in Nextjs Image is set inside of the next.config by setting an array of deviceSizes and imageSizes inside the images option. 
      IMPORTANT: These sizes should match your Sitecore server-side allowlist. See /sitecore/config/*.config (search for 'allowedMediaParams')
    */}
    <p>Srcset responsive image</p>
    <NextImage field={props.fields.sample2} height="105" width="200" layout="responsive" />
  </StyleguideSpecimen>
);

export default withDatasourceCheck()<StyleguideFieldUsageImageProps>(StyleguideFieldUsageImage);
