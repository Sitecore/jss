import React from 'react';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const ContentBlock = (props) => {
  const fields = props.fields;

  return (
    <div className="contentBlock">
      <p>React Content Block</p>
      <Text tag="h6" className="contentTitle" field={fields.heading} />
      <RichText className="contentDescription" field={fields.content} />
    </div>
  );
}

export default ContentBlock;


/**
 *  Demo for Nested React placholders
 *  How component should look like if you want to use REACT Placeholder inside it
import React from 'react';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import ComponentFactory from "./ComponentFactory";


const ContentBlock = (props) => {
  const fields = props.fields;

  return (
    <div className="contentBlock">
      <Text tag="h6" className="contentTitle" field={fields.heading} />
      <RichText className="contentDescription" field={fields.description} />
      <Placeholder name="react" rendering={props.rendering} componentFactory={ComponentFactory} />
    </div>
  );
}

export default ContentBlock;
 */