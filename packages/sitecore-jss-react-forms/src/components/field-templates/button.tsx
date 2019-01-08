import React, { Fragment } from 'react';
import { FieldProps } from '../../FieldProps';
import { ButtonFormField } from '@sitecore-jss/sitecore-jss-forms';

// NOTE: onButtonClick is not a submit handler;
// it signals to the parent form which button invoked the submit action
// (which is important for multi-step forms where multiple submits can occur i.e. back/forward)

const Button: React.FunctionComponent<FieldProps<ButtonFormField>> = ({
  field,
  onButtonClick,
}) => (
  <Fragment>
    <button
      type="submit"
      value={field.model.title}
      name={field.buttonField.name}
      id={field.buttonField.id}
      onClick={() => onButtonClick(field.buttonField.name)}
    >
      {field.model.title}
    </button>
  </Fragment>
);

export default Button;
