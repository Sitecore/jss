import React, { Fragment } from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ListFieldProps, FieldChangeCallback } from '../../FieldProps';
import { ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

const RadioButtonList: React.FunctionComponent<ListFieldProps> = (props) => {
  const {
    field,
    field: {
      model: { items },
    },
    value,
    onChange,
    tracker,
    errors,
  } = props;

  return (
    <Fragment>
      <Label {...props} />
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
            onFocus={() => tracker.onFocusField(field, value)}
            onBlur={() => tracker.onBlurField(field, value, errors)}
          />
          {item.text}
        </label>
      ))}

      <FieldValidationErrors {...props} />
    </Fragment>
  );
};

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
