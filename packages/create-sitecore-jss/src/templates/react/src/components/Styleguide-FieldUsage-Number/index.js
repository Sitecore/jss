import React from 'react';
import { Text, getFieldValue } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../Styleguide-Specimen';

/**
 * Demonstrates usage of a Number (decimal) content field within JSS.
 */
const StyleguideFieldUsageText = (props) => {
  const fieldValue = getFieldValue(props.fields, 'sample');

  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-number">
      {/* Basic emission of a number field for editing can be done with the <Text> component. */}
      <Text field={props.fields.sample} />

      {/* Direct access to the value, which is a JS number, is also supported. */}
      <p>
        JS value type: {typeof fieldValue}
        <br />
        JS value: {fieldValue}
      </p>
    </StyleguideSpecimen>
  );
};

export default StyleguideFieldUsageText;
