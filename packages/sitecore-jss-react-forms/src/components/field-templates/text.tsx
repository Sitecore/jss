import React from 'react';
import { FieldWithValueProps } from '../../FieldProps';
import { FormField, TextViewModel } from '@sitecore-jss/sitecore-jss-forms';

const TextField: React.FunctionComponent<FieldWithValueProps<FormField<TextViewModel>, string>> = ({ field }) => {
  const Tag = (field.model.htmlTag || 'p') as keyof JSX.IntrinsicElements;

  return <Tag className={field.model.cssClass}>{field.model.text}</Tag>;
};

export default TextField;
