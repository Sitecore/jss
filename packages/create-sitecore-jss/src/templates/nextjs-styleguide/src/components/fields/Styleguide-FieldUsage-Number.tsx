import { Text, Field, getFieldValue, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from 'components/styleguide/Styleguide-Specimen';
import { ComponentProps } from 'lib/component-props';
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';

type StyleguideFieldUsageTextProps = ComponentProps &
  StyleguideSpecimenFields & {
    fields: {
      sample: Field<string>;
    };
  };

/**
 * Demonstrates usage of a Number (decimal) content field within JSS.
 */
const StyleguideFieldUsageText = (props: StyleguideFieldUsageTextProps): JSX.Element => {
  const fieldValue = getFieldValue(props.fields, 'sample');

  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-number">
      {/* Basic emission of a number field for editing can be done with the <Text> component. */}
      <Text field={props.fields.sample} />

      {/* Direct access to the value, which is a JS number, is also supported. */}
      <p>
        <>
          JS value type: {typeof fieldValue}
          <br />
          JS value: {fieldValue}
        </>
      </p>
    </StyleguideSpecimen>
  );
};

export default withDatasourceCheck()<StyleguideFieldUsageTextProps>(StyleguideFieldUsageText);
