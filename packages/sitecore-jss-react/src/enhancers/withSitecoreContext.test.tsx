import React from 'react';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { SitecoreContextReactContext } from '../components/SitecoreContext';
import { withSitecoreContext } from '../enhancers/withSitecoreContext';

chai.use(sinonChai);

describe('withSitecoreContext()', () => {
  it('should pass context property', () => {
    const TestNestedComponent: React.FC<any> = (props: any) => (
      <button onClick={props.updateSitecoreContext}>
        {props.sitecoreContext.text}{props.myCustomProperty}
      </button>
    );
    let TestNestedComponentWithContext: React.FC<any> = withSitecoreContext()(TestNestedComponent);
    const context = {
      text: 'value',
      setSitecoreContext: sinon.spy(),
    };
    let wrapper = mount(<SitecoreContextReactContext.Provider value={context}>
      <TestNestedComponentWithContext myCustomProperty="value1" />
    </SitecoreContextReactContext.Provider>);
    expect(wrapper).to.have.length(1);
    expect(wrapper.html()).to.contain(`<button>${context.text}value1</button>`);
    wrapper.find('button').simulate('click');
    expect(context.setSitecoreContext).to.not.be.called;

    TestNestedComponentWithContext = withSitecoreContext({ updatable: true })(TestNestedComponent);
    wrapper = mount(<SitecoreContextReactContext.Provider value={context}>
      <TestNestedComponentWithContext myCustomProperty="value1" />
    </SitecoreContextReactContext.Provider>);
    wrapper.find('button').simulate('click');
    expect(context.setSitecoreContext).to.be.called;
  });
});
