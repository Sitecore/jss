import React, { Fragment } from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ListFieldProps, FieldChangeCallback } from '../../FieldProps';
import { ValueFormField, ListBoxViewModel } from '@sitecore-jss/sitecore-jss-forms';

const ListBox: React.FunctionComponent<ListFieldProps<ListBoxViewModel>> = (props) => {
  const {
    field,
    field: {
      model: { items },
    },
    value,
    onChange,
    tracker,
    errors
  } = props;

  let finalValue: string | string[] = value;

  // react does not like an array as a value unless multiple select is allowed
  // (even if the array is always length 1)
  if (!field.model.multipleSelection) {
    finalValue = value[0];
  }

  // note: the value for list field types is an array (of selected values)
  // dropdown is single-select so we use value[0] for its value

  return (
    <Fragment>
      <Label {...props} />
      <select
        className={field.model.cssClass}
        id={field.valueField.id}
        name={field.valueField.name}
        value={finalValue}
        size={field.model.rows}
        multiple={field.model.multipleSelection}
        onChange={(e) => handleOnChange(field, e.target.options, onChange)}
        onFocus={() => tracker.onFocusField(field, value)}
        onBlur={() => tracker.onBlurField(field, value, errors)}
      >
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

function handleOnChange(
  field: ValueFormField,
  options: HTMLOptionsCollection,
  callback: FieldChangeCallback
) {
  let valid = true;
  const errorMessages = [];

  const newValues = [];

  for (let i = 0; i < options.length; i += 1) {
    if (options[i].selected) {
      newValues.push(options[i].value);
    }
  }

  // custom client validation logic here
  if (field.model.required && newValues.length === 0) {
    valid = false;
    errorMessages.push(`${field.model.title} is required`);
  }

  callback(field.valueField.name, newValues, valid, errorMessages);
}

export default ListBox;
