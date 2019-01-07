import React from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ListFieldProps, FieldChangeCallback } from '../../FieldProps';
import { ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

const RadioButtonList: React.FunctionComponent<ListFieldProps> = ({
  field,
  field: {
    model: { items },
  },
  value,
  isValid,
  errors,
  onChange,
}) => (
  <React.Fragment>
    <Label field={field} isValid={isValid} />
    {items.map((item, index) => (
      <label key={item.itemId}>
        <input
          type="radio"
          className={field.model.cssClass}
          id={field.valueField.id + index}
          name={field.valueField.name}
          value={item.value}
          checked={value.some((v) => v === item.value)}
          onChange={(e) => handleOnChange(field, e.target.value, onChange)}
        />
        {item.text}
      </label>
    ))}

    <FieldValidationErrors errors={errors} />
  </React.Fragment>
);

function handleOnChange(field: ValueFormField, newValue: string, callback: FieldChangeCallback) {
  let valid = true;
  const errorMessages = [];

  // custom client validation logic here
  if (field.model.required && !newValue) {
    valid = false;
    errorMessages.push(`${field.model.title} is required`);
  }

  callback(field.valueField.name, [newValue], valid, errorMessages);
}

export default RadioButtonList;
