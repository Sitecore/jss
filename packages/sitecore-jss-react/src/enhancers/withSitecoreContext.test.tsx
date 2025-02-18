/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { expect, use } from 'chai';
import { fireEvent, render } from '@testing-library/react';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

import { useSitecoreContext, withSitecoreContext } from '../enhancers/withSitecoreContext';
import { SitecoreContextReactContext } from '../components/SitecoreContext';

use(sinonChai);

describe('withSitecoreContext', () => {
  it('withSitecoreContext()', () => {
    const setContext = spy();

    const testComponentProps = {
      context: {
        text: 'value',
      },
      setContext,
    };

    const TestComponent: React.FC<any> = (props: any) => (
      <div onClick={props.updateSitecoreContext}>
        {props.sitecoreContext.text}
        {props.customProp}
      </div>
    );

    let TestComponentWithContext: React.FC<any> = withSitecoreContext()(TestComponent);

    let wrapper = render(
      <SitecoreContextReactContext.Provider value={testComponentProps}>
        <TestComponentWithContext customProp="xxx" />
      </SitecoreContextReactContext.Provider>
    );

    expect(wrapper.container.querySelector('div')?.textContent).equal(
      testComponentProps.context.text + 'xxx'
    );
    fireEvent.click(wrapper.container.querySelector('div') as Element);

    // eslint-disable-next-line no-unused-expressions
    expect(testComponentProps.setContext).not.to.be.called;

    TestComponentWithContext = withSitecoreContext({ updatable: true })(TestComponent);

    wrapper = render(
      <SitecoreContextReactContext.Provider value={testComponentProps}>
        <TestComponentWithContext customProp="xxx" />
      </SitecoreContextReactContext.Provider>
    );

    fireEvent.click(wrapper.container.querySelector('div') as Element);

    // eslint-disable-next-line no-unused-expressions
    expect(testComponentProps.setContext).to.have.been.called;
  });

  describe('useSitecoreContext()', () => {
    it('context access', () => {
      const setContext = spy();

      const testComponentProps = {
        context: {
          text: 'value',
        },
        setContext,
      };

      const TestComponent: React.FC<any> = (props: any) => {
        const reactContext = useSitecoreContext();
        const context = reactContext.sitecoreContext as { text: string };

        return (
          <div onClick={reactContext.updateSitecoreContext}>
            {context.text}
            {props.customProp}
          </div>
        );
      };

      const wrapper = render(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <TestComponent customProp="xxx" />
        </SitecoreContextReactContext.Provider>
      );

      expect(wrapper.container.querySelector('div')?.textContent).equal(
        testComponentProps.context.text + 'xxx'
      );
      fireEvent.click(wrapper.container.querySelector('div') as Element);

      // eslint-disable-next-line no-unused-expressions
      expect(testComponentProps.setContext).to.not.have.been.called;
    });

    it('updatable', () => {
      const setContext = spy();

      const testComponentProps = {
        context: {
          text: 'value',
        },
        setContext,
      };

      const TestComponent: React.FC<any> = (props: any) => {
        const reactContext = useSitecoreContext({ updatable: true });
        const context = reactContext.sitecoreContext as { text: string };

        return (
          <div onClick={reactContext.updateSitecoreContext}>
            {context.text}
            {props.customProp}
          </div>
        );
      };

      const wrapper = render(
        <SitecoreContextReactContext.Provider value={testComponentProps}>
          <TestComponent customProp="bbb" />
        </SitecoreContextReactContext.Provider>
      );

      expect(wrapper.container.querySelector('div')?.textContent).equal(
        testComponentProps.context.text + 'bbb'
      );
      fireEvent.click(wrapper.container.querySelector('div') as Element);

      // eslint-disable-next-line no-unused-expressions
      expect(testComponentProps.setContext).to.have.been.called;
    });
  });
});
