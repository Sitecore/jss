import React from 'react';
import { Text, Link } from '@sitecore-jss/sitecore-jss-react';

/* Only ever rendered in Editing Mode */
const StepReference = ({ fields }) => (
  <li style={{ paddingBottom: '20px' }}>
    Name: <Text tag="span" field={fields.stepName} />
    &nbsp;/&nbsp; Route: <Link field={fields.stepLink} />
  </li>
);

export default StepReference;
