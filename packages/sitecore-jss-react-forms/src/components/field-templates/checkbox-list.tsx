import React, { Fragment } from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { FieldChangeCallback, ListFieldProps } from '../../FieldProps';
import { ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

const CheckboxList: React.FunctionComponent<ListFieldProps> = (props) => {
  const {
    field,
    field: {
      model: { items },
    },
    value,
    onChange,
  } = props;
  return (
    <Fragment>
      <Label {...props} />
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

      <FieldValidationErrors {...props} />
    </Fragment>
  );
};

function handleOnChange(
  field: ValueFormField,
  originalFieldValue: string[],
  changedElement: string,
  checked: boolean,
  callback: FieldChangeCallback
) {
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
