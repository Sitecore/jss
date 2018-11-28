import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../Styleguide-Specimen';

/**
 * Demonstrates usage of a custom content field type within JSS.
 * See /sitecore/definitions/components/Styleguide-FieldUsage-Custom.sitecore.js
 * for the definition of the structure of the custom field. This code is just for display.
 */
const StyleguideFieldUsageCustom = (props) => (
  <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-custom">
    {/* Because the integer field is essentially text, we can render it with the Text helper */}
    <Text field={props.fields.customIntField} />
  </StyleguideSpecimen>
);

export default StyleguideFieldUsageCustom;
