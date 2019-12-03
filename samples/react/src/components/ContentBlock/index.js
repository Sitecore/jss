import React from 'react';
import { RichText, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const ContentBlock = ({ fields, sitecoreContext }) => (
  <React.Fragment>
    <h2 className="display-5">WHAT is the airspeed velocity of an unladen swallow?</h2>
    <h2 className="display-5">African or European?</h2>
    { sitecoreContext.pageEditing ? <marquee>I am an element that will only display in Experience Editor</marquee> : null }


    <div style={{marginTop: 50}}>
      <RichText className="contentDescription" field={fields.content} />
    </div>
  </React.Fragment>
);

export default withSitecoreContext()(ContentBlock);
