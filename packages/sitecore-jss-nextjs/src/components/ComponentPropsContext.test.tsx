/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { ComponentPropsContext, useComponentProps } from './ComponentPropsContext';

describe('ComponentPropsContext', () => {
  const VALUE = Object.freeze({ x1: 101, y1: 202 });

  const X1Component = () => {
    const data = useComponentProps<number>('x1');

    return <div>First: {data}</div>;
  };

  const X2Component = () => {
    const data = useComponentProps<number>('y1');

    return <div>Second: {data}</div>;
  };

  const X3Component = () => {
    const data = useComponentProps<number>('z1');

    return <div>Third: {data ?? 'undefined'}</div>;
  };

  const X4Component = () => {
    const data = useComponentProps<number>(undefined);

    return <div>Fourth: {data ?? 'undefined'}</div>;
  };

  it('should render', () => {
    const component = mount(
      <ComponentPropsContext value={VALUE}>
        <>
          <X1Component />
          <X2Component />
          <X3Component />
          <X4Component />
        </>
      </ComponentPropsContext>
    );

    const x1Div = component.find(X1Component);
    const x2Div = component.find(X2Component);
    const x3Div = component.find(X3Component);
    const x4Div = component.find(X4Component);

    expect(x1Div.contains(<div>First: 101</div>)).to.be.true;

    expect(x2Div.contains(<div>Second: 202</div>)).to.be.true;

    expect(x3Div.contains(<div>Third: undefined</div>)).to.be.true;

    expect(x4Div.contains(<div>Fourth: undefined</div>)).to.be.true;
  });
});
