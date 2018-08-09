import React from 'react';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';

// A simple React-based JS rendering.
// This rendering renders two fields from its datasource, and supports Experience Editor
// Note that while JS renderings do not have a full layout like a JSS app, they DO use
// the JSS rendering helpers like Text, Placeholder, etc.
const SampleRendering = ({ dataSource, rendering }) => {
  // when rendered in Sitecore, or as a root component in disconnected mode, dataSource is correct.
  // however we must fallback to rendering.dataSource when this component is rendered _inside another placeholder_
  // in disconnected mode. In most cases, just stick with dataSource.
  const componentData = dataSource || rendering.dataSource;
  return (
    <React.Fragment>
      <Text tag="h1" className="contentTitle" field={componentData.Title} />
      <RichText className="contentDescription" field={componentData.Text} />
    </React.Fragment>
  );
};

export default SampleRendering;
