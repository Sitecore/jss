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

    expect(component.state().context).deep.equal({
      x: 'test1',
      y: 'test2',
    });

    component.instance().setContext({
      x: 'test11',
      y: 'test22',
    });

    expect(component.state().context).deep.equal({
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

    expect(component.state().context).deep.equal({
      pageEditing: false,
    });
  });

  it('should update state when new context as prop received', () => {
    const component = shallow<SitecoreContext>(
      <SitecoreContext componentFactory={mockComponentFactory}>
        <NestedComponentWithContext />
      </SitecoreContext>
    );

    expect(component.state().context).deep.equal({
      pageEditing: false,
    });

    component.setProps({
      context: {
        v1: 10,
        v2: 20,
      },
    });

    expect(component.state().context).to.deep.equal({
      v1: 10,
      v2: 20,
    });
  });
});
