import React from 'react';
import { FieldProps } from '../../FieldProps';
import { FormFieldSection } from '@sitecore-jss/sitecore-jss-forms';

const Section: React.FunctionComponent<FieldProps<FormFieldSection>> = ({
  field,
  fieldFactory,
}) => (
  <fieldset className={field.model.cssClass}>
    {field.fields.map(fieldFactory)}
  </fieldset>
);

export default Section;
