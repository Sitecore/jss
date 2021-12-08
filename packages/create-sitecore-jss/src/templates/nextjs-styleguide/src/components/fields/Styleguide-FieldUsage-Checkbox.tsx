import { Field, getFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from 'components/styleguide/Styleguide-Specimen';
import { ComponentProps } from 'lib/component-props';
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';

type StyleguideFieldUsageCheckboxProps = ComponentProps &
  StyleguideSpecimenFields & {
    fields: {
      checkbox: Field<boolean>;
      checkbox2: Field<boolean>;
    };
  };

/**
 * Demonstrates usage of a Checkbox (boolean) content field within JSS.
 */
const StyleguideFieldUsageCheckbox = (props: StyleguideFieldUsageCheckboxProps): JSX.Element => (
  <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-checkbox">
    {/* Checkbox fields do not have the ability to be inline edited, so they are directly accessed via their value: */}
    <ul>
      {/*
        The getFieldValue helper allows safely extracting a field value that could be undefined,
        without needing to check that props.fields or props.fields.checkbox are traversable,
        and allowing the specification of an optional default value (default is undefined if unspecified).
       */}
      {props.fields && props.fields.checkbox && props.fields.checkbox.value && (
        <li>
          <code>checkbox</code> is true
        </li>
      )}
      {!props.fields ||
        !props.fields.checkbox ||
        (!props.fields.checkbox.value && (
          <li>
            <code>checkbox</code> is false
          </li>
        ))}
      {getFieldValue(props.fields, 'checkbox2', false) && (
        <li>
          <code>checkbox2</code> is true
        </li>
      )}
      {!getFieldValue(props.fields, 'checkbox2', false) && (
        <li>
          <code>checkbox2</code> is false
        </li>
      )}
    </ul>
  </StyleguideSpecimen>
);

export default StyleguideFieldUsageCheckbox;
