import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const Heading = ({ fields }) => <Text tag="h2" field={fields.text} />;

export default Heading;
