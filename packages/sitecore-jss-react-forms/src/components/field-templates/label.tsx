import React from 'react';
import { InputViewModel, ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

export interface LabelProps {
  field: ValueFormField<InputViewModel>;
  isValid: boolean;
}

export const Label: React.FunctionComponent<LabelProps> = ({ field, isValid, children }) => {
  let className = field.model.labelCssClass;

  if (!isValid) {
    className += ' invalid';
  }

  return (
    <label htmlFor={field.valueField.id} className={className}>
      {children}
      {field.model.title}
    </label>
  );
};
