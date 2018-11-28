import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../Styleguide-Specimen';

/**
 * Demonstrates how to reuse content within JSS. See /data/routes/styleguide/en.yml
 * for the reused content definition sample. This component also demonstrates how to use
 * the Placeholder component's render props API to wrap all components in the placeholder
 * in a column tag (thus creating a horizontally laid out placeholder)
 */
const StyleguideLayoutReuse = (props) => (
  <StyleguideSpecimen {...props} e2eId="styleguide-layout-reuse">
    <div className="row">
      {/*
        This placeholder is using _render props_ to enable customizing the markup for each component within.
        In this case, it's placing each component in its own column of a flexbox layout - giving an n-up columnar layout.
        The component itself does not need to know it's living in a columnar layout.

        There are three render props available:
        renderEach - called once for each content component
          Sitecore Experience Editor markup is automatically rendered in between content components when present
        renderEmpty - called when the placeholder contains no content components. Can be used to wrap the Sitecore EE empty placeholder
          markup in something that's visually correct, like here where we need to wrap it in a column div to make it selectable.
        render - called once and passed _all_ components in the placeholder. Allows custom iteration. EE code markup must be accounted for.

        Generally speaking stick to renderEach and renderEmpty unless doing something really custom.
       */}
      <Placeholder
        rendering={props.rendering}
        name="jss-reuse-example"
        renderEach={(component, index) => (
          <div className="col-sm" key={index}>
            {component}
          </div>
        )}
        renderEmpty={(components) => <div className="col-sm">{components}</div>}
      />
    </div>
  </StyleguideSpecimen>
);

export default StyleguideLayoutReuse;
