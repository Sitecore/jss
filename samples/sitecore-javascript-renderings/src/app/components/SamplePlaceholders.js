import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import componentFactory from '../../boot/componentFactory';

// Sample of exposing placeholders from within a JS rendering.
// Exposed placeholders _may_ contain other types of renderings (i.e. View Renderings)
const SamplePlaceholders = (props) => (
  <div>
    <h2>Child placeholder example</h2>
    <p>
      JS renderings can have child placeholders within them. Normal JSS rendering helpers (<code>
        Placeholder
      </code>) work here.
    </p>

    <p>
      Not seeing a placeholder? Ensure that you have added <em>allowed placeholders</em> to the
      placeholder settings item, and that the placeholder settings item is added to{' '}
      <em>Layout Service Placeholders</em> on the rendering item.
    </p>

    <Placeholder name="js-rendering" rendering={props} componentFactory={componentFactory} />
  </div>
);

export default SamplePlaceholders;
