import React, { Fragment } from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ListFieldProps, FieldChangeCallback } from '../../FieldProps';
import { ValueFormField, DropdownListViewModel } from '@sitecore-jss/sitecore-jss-forms';

const DropdownList: React.FunctionComponent<ListFieldProps<DropdownListViewModel>> = (props) => {
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
      <select
        className={field.model.cssClass}
        id={field.valueField.id}
        name={field.valueField.name}
        value={value[0]}
        onChange={(e) => handleOnChange(field, e.target.value, onChange)}
        onFocus={() => tracker.onFocusField(field, value)}
        onBlur={() => tracker.onBlurField(field, value, errors)}
      >
        {field.model.showEmptyItem ? <option label=" " /> : null}
        {items.map((item) => (
          <option key={item.itemId} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>

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

export default DropdownList;
