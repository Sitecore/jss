import React from 'react';
import {
  EDITING_COMPONENT_ID,
  EDITING_COMPONENT_PLACEHOLDER,
  RouteData,
} from '@sitecore-jss/sitecore-jss/layout';
import { EditingComponentPlaceholder } from './EditingComponentPlaceholder';
import * as PlaceholderModule from './Placeholder';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import sinon from 'sinon';

describe('<EditingComponentPlaceholder />', () => {
  it('should render component', () => {
    const stub = sinon.stub(PlaceholderModule, 'Placeholder').returns(<div className="test"></div>);
    const rendering: RouteData = {
      name: 'ComponentRendering',
      placeholders: {
        [EDITING_COMPONENT_PLACEHOLDER]: [
          {
            componentName: 'Home',
          },
        ],
      },
    };

    const rendered = render(<EditingComponentPlaceholder rendering={rendering} />);

    expect(rendered.container.querySelectorAll(`#${EDITING_COMPONENT_ID}`).length).to.equal(1);
    expect(rendered.container.querySelectorAll('.test').length).to.equal(1);
    stub.restore();
  });
});
