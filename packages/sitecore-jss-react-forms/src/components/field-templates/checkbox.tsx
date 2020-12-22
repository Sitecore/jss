import React, { Fragment } from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ValueFieldProps, FieldChangeCallback } from '../../FieldProps';
import { ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

const Checkbox: React.FunctionComponent<ValueFieldProps> = (props) => {
  const { field, value, onChange, tracker, errors } = props;
  return (
    <Fragment>
      <Label {...props}>
        <input
          type="checkbox"
          className={field.model.cssClass}
          id={field.valueField.id}
          name={field.valueField.name}
          value="true"
          checked={(value as unknown) as boolean}
          onChange={(e) => handleOnChange(field, e.target.checked, onChange)}
          onFocus={() => tracker.onFocusField(field, value)}
          onBlur={() => tracker.onBlurField(field, value, errors)}
        />
      </Label>
      <FieldValidationErrors {...props} />
    </Fragment>
  );
};

/**
 * @param {ValueFormField} field
 * @param {boolean} fieldValue
 * @param {FieldChangeCallback} callback
 */
function handleOnChange(field: ValueFormField, fieldValue: boolean, callback: FieldChangeCallback) {
  // (fieldName, fieldValue, isValid, validationErrors)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback(field.valueField.name, fieldValue as any, true, []);
}

export default Checkbox;
