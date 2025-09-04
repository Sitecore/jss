/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';

import { ComponentPropsContext, useComponentProps } from './ComponentPropsContext';

describe('ComponentPropsContext', () => {
  const VALUE = Object.freeze({ x1: 101, y1: 202 });
  const X1Component = () => {
    const data = useComponentProps<number>('x1');

    return <div id="first">First: {data}</div>;
  };

  const X2Component = () => {
    const data = useComponentProps<number>('y1');

    return <div id="second">Second: {data}</div>;
  };

  const X3Component = () => {
    const data = useComponentProps<number>('z1');

    return <div id="third">Third: {data ?? 'undefined'}</div>;
  };

  const X4Component = () => {
    const data = useComponentProps<number>(undefined);

    return <div id="fourth">Fourth: {data ?? 'undefined'}</div>;
  };

  it('should render', () => {
    const component = render(
      <ComponentPropsContext value={VALUE}>
        <>
          <X1Component />
          <X2Component />
          <X3Component />
          <X4Component />
        </>
      </ComponentPropsContext>
    );

    const markup = component.baseElement.innerHTML;

    expect(markup).to.include('<div id="first">First: 101</div>');
    expect(markup).to.include('<div id="second">Second: 202</div>');
    expect(markup).to.include('<div id="third">Third: undefined</div>');
    expect(markup).to.include('<div id="fourth">Fourth: undefined</div>');
  });
});
