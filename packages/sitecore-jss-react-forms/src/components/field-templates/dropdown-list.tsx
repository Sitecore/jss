import React from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ListFieldProps, FieldChangeCallback } from '../../FieldProps';
import { ValueFormField, DropdownListViewModel } from '@sitecore-jss/sitecore-jss-forms';

const DropdownList: React.FunctionComponent<ListFieldProps<DropdownListViewModel>> = ({
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
    <select
      className={field.model.cssClass}
      id={field.valueField.id}
      name={field.valueField.name}
      value={value[0]}
      onChange={(e) => handleOnChange(field, e.target.value, onChange)}
    >
      {field.model.showEmptyItem ? <option label=" " /> : null}
      {items.map((item) => (
        <option key={item.itemId} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>

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

export default DropdownList;
