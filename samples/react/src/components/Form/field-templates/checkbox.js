import React from 'react';
import FieldValidationErrors from './field-validation-errors';
import Label from './label';

function Checkbox({ field, value, isValid, errors, onChange }) {
  return (
    <React.Fragment>
      <Label field={field} isValid={isValid}>
        <input
          type="checkbox"
          className={field.model.cssClass}
          id={field.valueField.id}
          name={field.valueField.name}
          value="true"
          checked={value}
          onChange={(e) => handleOnChange(field, e.target.checked, onChange)}
        />
      </Label>
      <FieldValidationErrors errors={errors} />
    </React.Fragment>
  );
}

function handleOnChange(field, fieldValue, callback) {
  // (fieldName, fieldValue, isValid, validationErrors)
  callback(field.valueField.name, fieldValue, true, []);
}

export default Checkbox;
