import React from 'react';
import { Image } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../styleguide/Styleguide-Specimen';

/**
 * Demonstrates usage of an Image content field within JSS.
 * Image field data is uploaded into the Sitecore Media Library.
 */
const StyleguideFieldUsageImage = (props) => (
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
    />

    {/*
      Srcset adaptive image usage example
      Adaptive srcsets are supported using Sitecore server-side resizing.
      The `srcSet` can use Sitecore image resizing parameters (i.e. w, h, mw, mh).
      Sample create a srcset using two sizes (server resizing), 300 and 100px max widths, respecting aspect ratio.
      IMPORTANT: srcSet params must be whitelisted for adaptive resizing to occur. See /sitecore/config/*.config (search for 'allowedMediaParams')
    */}
    <p>Srcset responsive image</p>
    <Image
      field={props.fields.sample2}
      srcSet={[{ mw: 300 }, { mw: 100 }]}
      sizes="(min-width: 960px) 300px, 100px"
      className="img-fluid"
    />
  </StyleguideSpecimen>
);

export default StyleguideFieldUsageImage;
