import React from 'react';
import FieldValidationErrors from './field-validation-errors';
import Label from './label';

function CheckboxList({ field, value, isValid, errors, onChange }) {
  const items = field.model.items;

  // note: the value for list field types is an array (of selected values)

  return (
    <React.Fragment>
      <Label field={field} isValid={isValid} />
      {items.map((item, index) => (
        <label key={item.itemId}>
          <input
            type="checkbox"
            className={field.model.cssClass}
            id={field.valueField.id + index}
            name={field.valueField.name}
            value={item.value}
            checked={value.some((v) => v === item.value)}
            onChange={(e) =>
              handleOnChange(field, value, e.target.value, e.target.checked, onChange)
            }
          />
          {item.text}
        </label>
      ))}

      <FieldValidationErrors errors={errors} />
    </React.Fragment>
  );
}

function handleOnChange(field, originalFieldValue, changedElement, checked, callback) {
  // we can have multiple selected values. So we need to push ALL the selected
  // values back up to the root form. This is done using an array, which the form
  // serializer knows how to expand into multiple values on post

  let value = originalFieldValue;

  if (checked) {
    value.push(changedElement);
  } else {
    value = value.filter((v) => v !== changedElement);
  }

  // (fieldName, fieldValue, isValid, validationErrors)
  callback(field.valueField.name, value, true, []);
}

export default CheckboxList;
