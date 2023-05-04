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
 * These samples focus on utilizing the next image.
 * However, you can also use the regular image component i.e. import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
 */
const StyleguideFieldUsageImage = (props: StyleguideFieldUsageImageProps): JSX.Element => (
  <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-image">
    <p>Plain image</p>
    <NextImage field={props.fields.sample1} height="46" width="220" />

    {/*
      Advanced image usage example
      editable: controls whether image can be edited in Sitecore Experience Editor
      unoptimized: disables next/image source optimization in favor of imageParams
      imageParams: parameters that are passed to Sitecore to perform server-side resizing of the image
        Sample rescales image to max 100x50 dimensions on the server, respecting aspect ratio
        IMPORTANT: imageParams must be whitelisted for resizing to occur. See /sitecore/config/*.config (search for 'allowedMediaParams')
      any other attributes: pass through to img tag
    */}
    <p>Advanced image (not editable)</p>
    <NextImage
      field={props.fields.sample2}
      editable={false}
      unoptimized={true}
      imageParams={{ mw: 100, mh: 50 }}
      height="50"
      width="94"
      data-sample="other-attributes-pass-through"
    />

    {/*
      You can use any of the props available in the next/image.
      E.g. we have used 'priority' to demonstrate how an image could be considered high priority and preload.
      Lazy loading is automatically disabled for images using priority.
      See here for all the features provided by next/image: https://nextjs.org/docs/api-reference/next/image
      'fill' causes the next/image to fill the parent element instead of setting width and height. See https://nextjs.org/docs/api-reference/next/image#fill.
      IMPORTANT: The generated sizes should match your Sitecore server-side allowlist. See /sitecore/config/*.config (search for 'allowedMediaParams')
    */}
    <p>Srcset responsive image</p>
    <div
      style={{
        position: 'relative',
        height: 160,
        width: 300,
      }}
    >
      <NextImage
        field={props.fields.sample2}
        sizes="(min-width: 960px) 300px, 100px"
        fill={true}
        priority={true}
      />
    </div>
  </StyleguideSpecimen>
);

export default withDatasourceCheck()<StyleguideFieldUsageImageProps>(StyleguideFieldUsageImage);
