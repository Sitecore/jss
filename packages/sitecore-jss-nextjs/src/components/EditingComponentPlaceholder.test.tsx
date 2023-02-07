import React from 'react';
import {
  EDITING_COMPONENT_ID,
  EDITING_COMPONENT_PLACEHOLDER,
  RouteData,
} from '@sitecore-jss/sitecore-jss/layout';
import { EditingComponentPlaceholder } from './EditingComponentPlaceholder';
import * as PlaceholderModule from './Placeholder';
import { expect } from 'chai';
import { mount } from 'enzyme';
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

    const c = mount(<EditingComponentPlaceholder rendering={rendering} />);

    const component = c.find(`#${EDITING_COMPONENT_ID}`);

    expect(component.length).to.equal(1);

    expect(component.find(PlaceholderModule.Placeholder).length).to.equal(1);
    expect(component.find('.test').length).to.equal(1);
    stub.restore();
  });
});
