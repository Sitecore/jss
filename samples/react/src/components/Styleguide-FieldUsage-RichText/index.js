import React from 'react';
import { RichText } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../Styleguide-Specimen';

/**
 * Demonstrates usage of a Rich Text (HTML) content field within JSS.
 */
const StyleguideFieldUsageRichText = (props) => (
  <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-richtext">
    {/* Basic use of a rich text field. Wraps in a <div>. */}
    <RichText field={props.fields.sample} />

    {/* Advanced usage of rich text field. Specifies a custom wrapper tag, turns off Sitecore editing, and has a CSS class on the wrapper */}
    <RichText
      field={props.fields.sample2}
      tag="section"
      editable={false}
      className="text-center"
      data-sample="other-attributes-pass-through"
    />
  </StyleguideSpecimen>
);

export default StyleguideFieldUsageRichText;
