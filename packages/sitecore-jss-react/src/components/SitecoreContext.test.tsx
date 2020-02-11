import React from 'react';
import { ComponentFactory } from './sharedTypes';
import { expect } from 'chai';
// const iterate = require('leakage').iterate;
import { SitecoreContext, SitecoreContextFactory } from './SitecoreContext';
import { withSitecoreContext } from '../enhancers/withSitecoreContext';
const create = require('react-test-renderer').create;

const TestNestedComponent: React.FC = (props: any) => (<div>{props.sitecoreContext && 'test'}</div>);
const TestNestedComponentWithContext: React.FC = withSitecoreContext()(TestNestedComponent as any);
const arrayOfComponents: React.Component[] = [];
const mockComponentFactory: ComponentFactory = (name: string) => arrayOfComponents[name as any];
const singleton = new SitecoreContextFactory();

describe('SitecoreContext', () => {
  // it('should not leak memory', () => {
  //   iterate(() => {
  //     const wrappedComponent = create(
  //       <SitecoreContext componentFactory={mockComponentFactory} contextFactory={singleton}>
  //         <TestNestedComponentWithContext />
  //       </SitecoreContext>
  //     );
  //
  //     singleton.setSitecoreContext({...singleton.context, myCustomProp: "asdfasdfasdfas"});
  //
  //     wrappedComponent.unmount();
  //   }, {iterations:100});
  // });

  it('should unsubscribe from SitecoreContextFactory on unmount', () => {
    const wrappedComponent = create(
      <SitecoreContext componentFactory={mockComponentFactory} contextFactory={singleton}>
        <TestNestedComponentWithContext />
      </SitecoreContext>
    );

    const myCustomSubscriberContext: () => Object = () => ({});

    singleton.subscribeToContext(myCustomSubscriberContext);
    expect(singleton.subscribers).to.have.lengthOf(2);

    wrappedComponent.unmount();
    expect(singleton.subscribers).to.have.lengthOf(1);
    expect(singleton.subscribers[0]).to.eqls(myCustomSubscriberContext);
  });
});


