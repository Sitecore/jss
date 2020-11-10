import { Text, Field, ComponentRendering, getFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from '../Styleguide-Specimen';

interface StyleguideFieldUsageTextProps {
  fields: {
    heading: Field<string>;
    description: Field<string>;
    sample: Field<string>;
  };
  rendering: ComponentRendering;
}

/**
 * Demonstrates usage of a Number (decimal) content field within JSS.
 */
const StyleguideFieldUsageText: React.FC<StyleguideFieldUsageTextProps> = (props) => {
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
