import React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../Styleguide-Specimen';

/**
 * Demonstrates gaining access to the route-level Sitecore Context from
 * within other components.
 */
const StyleguideSitecoreContext = (props) => (
  <StyleguideSpecimen {...props} e2eId="styleguide-sitecore-context">
    <p>The current Sitecore Context is...</p>
    <pre style={{ maxHeight: '400px', overflow: 'scroll' }}>
      {JSON.stringify(props.sitecoreContext, null, 2)}
    </pre>
  </StyleguideSpecimen>
);

export default withSitecoreContext()(StyleguideSitecoreContext);
