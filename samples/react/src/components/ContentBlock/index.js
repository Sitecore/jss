import React from 'react';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const ContentBlock = ({ fields }) => (
  <React.Fragment>
    <div>WHAT is the airspeed velocity of an unladen swallow?</div>
    <Text tag="h1" className="display-2" field={fields.heading} />

    <RichText className="contentDescription" field={fields.content} />
  </React.Fragment>
);

export default ContentBlock;
