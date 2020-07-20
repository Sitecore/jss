import React, { FC } from 'react';
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { shallow } from 'enzyme';

use(spies);

import { SitecoreContext, SitecoreContextFactory } from './SitecoreContext';
import { ComponentFactory } from './sharedTypes';
import { withSitecoreContext, ComponentConsumerProps } from '../enhancers/withSitecoreContext'

interface NestedComponentProps extends ComponentConsumerProps {
  anotherProperty?: string,
}
const NestedComponent: FC<NestedComponentProps> = (props: NestedComponentProps) => <div>{props.sitecoreContext && 'test'}</div>;
const NestedComponentWithContext = withSitecoreContext()(NestedComponent);

const components = new Map();
const mockComponentFactory: ComponentFactory = name => components.get(name);

const mockSitecoreContext = new SitecoreContextFactory();

describe('SitecoreContext', () => {
  it('should unsubscribe from SitecoreContextFactory on unmount', () => {
    const wrappedComponent = shallow(
      <SitecoreContext componentFactory={mockComponentFactory} contextFactory={mockSitecoreContext}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    const spyContextListener = spy((value: any) => value);

    mockSitecoreContext.subscribeToContext(spyContextListener);
    expect(mockSitecoreContext.subscribers).to.have.lengthOf(2);

    mockSitecoreContext.setSitecoreContext('mock');

    expect(spyContextListener).to.have.called.with('mock');
    expect(spyContextListener).on.have.been.called.exactly(1);

    wrappedComponent.unmount();

    expect(mockSitecoreContext.subscribers).to.have.lengthOf(1);
    expect(mockSitecoreContext.subscribers[0]).to.eqls(spyContextListener);
  });

  it('should get sitecore context value', () => {
    const wrappedComponent = shallow<SitecoreContext>(
      <SitecoreContext componentFactory={mockComponentFactory} contextFactory={mockSitecoreContext}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    const value = wrappedComponent.instance().getSitecoreContextValue();

    expect(mockSitecoreContext instanceof SitecoreContextFactory).equal(true);
    expect(value instanceof SitecoreContextFactory).equal(false);

    expect(value.context).equal(mockSitecoreContext.context);
  });

  describe('SitecoreContextFactory', () => {
    it('should get sitecore context', () => {
      const c = new SitecoreContextFactory();

      expect(c.getSitecoreContext()).deep.equal({ pageEditing: false });

      c.context = {
        pageEditing: false,
        text: 'xxx',
        count: 10
      };

      expect(c.getSitecoreContext()).deep.equal({
        pageEditing: false,
        text: 'xxx',
        count: 10
      });
    });

    it('should set sitecore context', () => {
      const c = new SitecoreContextFactory();
      
      const fn = spy();

      c.subscribeToContext(fn);

      expect(c.getSitecoreContext()).deep.equal({ pageEditing: false });

      c.setSitecoreContext({
        text: 'xxx',
        value: 10
      });

      expect(c.getSitecoreContext()).deep.equal({
        text: 'xxx',
        value: 10
      });

      expect(fn).to.be.called.with({
        text: 'xxx',
        value: 10
      });
    });

    it('should subscribe to context', () => {
      const c = new SitecoreContextFactory();

      const fn = spy();

      c.subscribeToContext(fn);

      expect(c.subscribers.length).equal(1);

      c.subscribers[0]();

      expect(fn).to.be.called();
    });

    it('should unsubscribe from context', () => {
      const c = new SitecoreContextFactory();

      const fn = spy();

      c.subscribeToContext(fn);

      expect(c.subscribers.length).equal(1);

      c.unsubscribeFromContext(fn);

      expect(c.subscribers.length).equal(0);
    });
  });
});
