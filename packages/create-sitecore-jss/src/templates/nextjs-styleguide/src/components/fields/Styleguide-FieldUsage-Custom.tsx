import { Field, Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from 'components/styleguide/Styleguide-Specimen';
import { ComponentProps } from 'lib/component-props';
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';

type StyleguideFieldUsageCustomProps = ComponentProps &
  StyleguideSpecimenFields & {
    fields: {
      customIntField: Field<string>;
    };
  };

/**
 * Demonstrates usage of a custom content field type within JSS.
 * See /sitecore/definitions/components/Styleguide-FieldUsage-Custom.sitecore.js
 * for the definition of the structure of the custom field. This code is just for display.
 */
const StyleguideFieldUsageCustom = (props: StyleguideFieldUsageCustomProps): JSX.Element => (
  <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-custom">
    {/* Because the integer field is essentially text, we can render it with the Text helper */}
    <Text field={props.fields.customIntField} />
  </StyleguideSpecimen>
);

export default withDatasourceCheck()<StyleguideFieldUsageCustomProps>(StyleguideFieldUsageCustom);
