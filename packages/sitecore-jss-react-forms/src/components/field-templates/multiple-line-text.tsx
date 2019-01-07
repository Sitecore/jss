import React from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ValueFieldProps, FieldChangeCallback } from '../../FieldProps';
import { MultiLineStringInputViewModel, ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

const MultipleLineText: React.FunctionComponent<ValueFieldProps<MultiLineStringInputViewModel>> = ({
  field,
  value,
  isValid,
  errors,
  onChange,
}) => (
  <React.Fragment>
    <Label field={field} isValid={isValid} />
    <textarea
      className={field.model.cssClass}
      id={field.valueField.id}
      name={field.valueField.name}
      value={value}
      rows={field.model.rows}
      maxLength={field.model.maxLength}
      placeholder={field.model.placeholderText}
      onChange={(e) => handleOnChange(field, e.target.value, onChange)}
    />
    <FieldValidationErrors errors={errors} />
  </React.Fragment>
);

function handleOnChange(field: ValueFormField, fieldValue: string, callback: FieldChangeCallback) {
  let valid = true;
  const errorMessages = [];

  // custom client validation logic here
  if (field.model.required && !fieldValue) {
    valid = false;
    errorMessages.push(`${field.model.title} is required`);
  }

  callback(field.valueField.name, fieldValue, valid, errorMessages);
}

export default MultipleLineText;
