import { Image, ImageField, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
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
    <p>Plain image</p>
    <Image field={props.fields.sample1} />

    {/*
      Advanced image usage example
      editable: controls whether image can be edited in Sitecore Experience Editor
      imageParams: parameters that are passed to Sitecore to perform server-side resizing of the image.
        Sample rescales image to max 100x50 dimensions on the server, respecting aspect ratio
        IMPORTANT: imageParams must be whitelisted for resizing to occur. See /sitecore/config/*.config (search for 'allowedMediaParams')
      any other attributes: pass through to img tag
    */}
    <p>Advanced image (not editable)</p>
    <Image
      field={props.fields.sample2}
      editable={false}
      imageParams={{ mw: 100, mh: 50 }}
      height="50"
      width="94"
      data-sample="other-attributes-pass-through"
      layout="fixed"
    />

    {/*
      srcSet in Nextjs Image is set inside of the next.config by setting an array of deviceSizes inside the images option. See here: https://nextjs.org/docs/api-reference/next/image#device-sizes
      These sizes should match your Sitecore server-side allowlist.
      See /sitecore/config/*.config (search for 'allowedMediaParams')
       image sizes are set similarly: https://nextjs.org/docs/api-reference/next/image#image-sizes

      placeholder='blur' blurs the image while loading with a transparent pixel provided in blurDataUrl. You can also provide a color pixel for this functionality. See here: https://nextjs.org/docs/api-reference/next/image#placeholder
    */}
    <p>Srcset responsive image</p>
    <Image
      field={props.fields.sample2}
      sizes="(min-width: 960px) 300px, 100px"
      layout="responsive"
      className="img-fluid"
      placeholder="blur"
      // transparent pixel for blur placeholder
      blurDataURL={
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
      }
    />
  </StyleguideSpecimen>
);

export default withDatasourceCheck()<StyleguideFieldUsageImageProps>(StyleguideFieldUsageImage);
