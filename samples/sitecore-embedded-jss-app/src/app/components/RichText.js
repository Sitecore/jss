import React from 'react';
import { RichText as RichTextField } from '@sitecore-jss/sitecore-jss-react';

const RichText = ({ fields }) => (
  <RichTextField field={fields.text} tag="div" className="rich-text" />
);

export default RichText;
