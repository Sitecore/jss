import React from 'react';
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { mount } from 'enzyme';

import { withSitecoreContext } from '../enhancers/withSitecoreContext';
import { SitecoreContextReactContext } from '../components/SitecoreContext';

use(spies);

describe('withSitecoreContext', () => {
  it('should pass context property', () => {
    const setContext = spy();

    const testComponentProps = {
      context: {
        text: 'value'
      },
      setContext
    };

    const TestComponent: React.FC<any> = (props: any) => (
      <div onClick={props.updateSitecoreContext}>
        {props.sitecoreContext.text}{props.customProp}
      </div>
    );

    let TestComponentWithContext: React.FC<any> = withSitecoreContext()(TestComponent);

    let wrapper = mount(
      <SitecoreContextReactContext.Provider value={testComponentProps}>
        <TestComponentWithContext customProp="xxx" />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper).to.have.length(1);

    expect(wrapper.find('div').text()).equal(testComponentProps.context.text + 'xxx');
    wrapper.find('div').simulate('click');

    expect(testComponentProps.setContext).not.to.be.called();

    TestComponentWithContext = withSitecoreContext({ updatable: true })(TestComponent);

    wrapper = mount(
      <SitecoreContextReactContext.Provider value={testComponentProps}>
        <TestComponentWithContext customProp="xxx" />
      </SitecoreContextReactContext.Provider>
    );

    wrapper.find('div').simulate('click');

    expect(testComponentProps.setContext).to.be.called();
  });
});