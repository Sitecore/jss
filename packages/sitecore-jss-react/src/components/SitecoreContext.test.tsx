import React, { FC } from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { SitecoreContext } from './SitecoreContext';
import { ComponentFactory } from './sharedTypes';
import { withSitecoreContext, ComponentConsumerProps } from '../enhancers/withSitecoreContext';

interface NestedComponentProps extends ComponentConsumerProps {
  anotherProperty?: string;
}
const NestedComponent: FC<NestedComponentProps> = (props: NestedComponentProps) => (
  <div>{props.sitecoreContext && 'test'}</div>
);
const NestedComponentWithContext = withSitecoreContext()(NestedComponent);

const components = new Map();
const mockComponentFactory: ComponentFactory = (name) => components.get(name);

const mockSitecoreContext = {
  x: 'test1',
  y: 'test2',
};

describe('SitecoreContext', () => {
  it('should update context', () => {
    const component = shallow<SitecoreContext>(
      <SitecoreContext componentFactory={mockComponentFactory} context={mockSitecoreContext}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    const value = component.instance().state.context;

    expect(value).deep.equal({
      x: 'test1',
      y: 'test2',
    });

    component.instance().setContext({
      x: 'test11',
      y: 'test22',
    });

    const updatedValue = component.instance().state.context;

    expect(updatedValue).deep.equal({
      x: 'test11',
      y: 'test22',
    });
  });

  it('should set default context', () => {
    const component = shallow<SitecoreContext>(
      <SitecoreContext componentFactory={mockComponentFactory}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    const context = component.instance().state.context;

    expect(context).deep.equal({
      pageEditing: false,
    });
  });
});
