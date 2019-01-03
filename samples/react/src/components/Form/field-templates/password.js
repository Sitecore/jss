import React from 'react';
import FieldValidationErrors from './field-validation-errors';
import Label from './label';

function Password({ field, value, isValid, errors, onChange }) {
  return (
    <React.Fragment>
      <Label field={field} isValid={isValid} />
      <input
        type="password"
        className={field.model.cssClass}
        id={field.valueField.id}
        name={field.valueField.name}
        value={value}
        maxLength={field.model.maxLength || null}
        placeholder={field.model.placeholderText}
        onChange={(e) => handleOnChange(field, e.target.value, onChange)}
      />
      <FieldValidationErrors errors={errors} />
    </React.Fragment>
  );
}

function handleOnChange(field, fieldValue, callback) {
  let valid = true;
  const errorMessages = [];

  // custom client validation logic here
  if (field.model.required && !fieldValue) {
    valid = false;
    errorMessages.push(`${field.model.title} is required`);
  }

  callback(field.valueField.name, fieldValue, valid, errorMessages);
}

export default Password;
