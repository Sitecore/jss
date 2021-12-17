import React from 'react';
import { File } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../Styleguide-Specimen';

/**
 * Demonstrates usage of a File content field within JSS.
 * File types are stored within Sitecore's Media Library data, and can be edited.
 */
const StyleguideFieldUsageFile = (props) => (
  <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-file">
    {/* Renders a file link */}
    <File field={props.fields.file} />
    <br />

    {/* Renders a file link with a custom body and opening in a new tab */}
    <File field={props.fields.file} target="_blank">
      Custom link body
    </File>
  </StyleguideSpecimen>
);

export default StyleguideFieldUsageFile;
