import React from 'react';
import { FieldProps } from '../../FieldProps';
import { FormFieldSection } from '@sitecore-jss/sitecore-jss-forms';

const Page: React.FunctionComponent<FieldProps<FormFieldSection>> = ({ field, fieldFactory }) => (
  <div className={field.model.cssClass}>{field.fields.map(fieldFactory)}</div>
);

export default Page;
