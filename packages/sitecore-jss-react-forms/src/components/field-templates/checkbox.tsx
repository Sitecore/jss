import React from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ValueFieldProps, FieldChangeCallback } from '../../FieldProps';
import { ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

const Checkbox: React.FunctionComponent<ValueFieldProps> = ({
  field,
  value,
  isValid,
  errors,
  onChange,
}) => (
  <React.Fragment>
    <Label field={field} isValid={isValid}>
      <input
        type="checkbox"
        className={field.model.cssClass}
        id={field.valueField.id}
        name={field.valueField.name}
        value="true"
        checked={(value as unknown) as boolean}
        onChange={(e) => handleOnChange(field, e.target.checked, onChange)}
      />
    </Label>
    <FieldValidationErrors errors={errors} />
  </React.Fragment>
);

function handleOnChange(field: ValueFormField, fieldValue: boolean, callback: FieldChangeCallback) {
  // (fieldName, fieldValue, isValid, validationErrors)
  callback(field.valueField.name, fieldValue as any, true, []);
}

export default Checkbox;
