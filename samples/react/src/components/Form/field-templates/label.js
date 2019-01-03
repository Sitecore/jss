import React from 'react';

function Label({ field, isValid, children }) {
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
}

export default Label;
