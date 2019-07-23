import React, { Fragment } from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ValueFieldProps, FieldChangeCallback } from '../../FieldProps';
import { StringInputViewModel, ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

const Telephone: React.FunctionComponent<ValueFieldProps<StringInputViewModel>> = (props) => {
  const { field, value, onChange, tracker, errors } = props;

  return (
    <Fragment>
      <Label {...props} />
      <input
        type="tel"
        className={field.model.cssClass}
        id={field.valueField.id}
        name={field.valueField.name}
        value={value}
        maxLength={field.model.maxLength}
        placeholder={field.model.placeholderText}
        onChange={(e) => handleOnChange(field, e.target.value, onChange)}
        onFocus={() => tracker.onFocusField(field, value)}
        onBlur={() => tracker.onBlurField(field, value, errors)}
      />
      <FieldValidationErrors {...props} />
    </Fragment>
  );
};

function handleOnChange(field: ValueFormField, fieldValue: string, callback: FieldChangeCallback) {
  let valid = true;
  const errorMessages = [];

  // custom client validation logic here
  if (field.model.required && !fieldValue) {
    valid = false;
    errorMessages.push(`${field.model.title} is required`);
  }

  callback(field.valueField.name, fieldValue, valid, errorMessages);
}

export default Telephone;
