import React from 'react';
import FieldValidationErrors from './field-validation-errors';
import Label from './label';

function DropdownList({ field, value, isValid, errors, onChange }) {
  const items = field.model.items;

  // note: the value for list field types is an array (of selected values)
  // dropdown is single-select so we use value[0] for its value

  return (
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
}

function handleOnChange(field, newValue, callback) {
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
