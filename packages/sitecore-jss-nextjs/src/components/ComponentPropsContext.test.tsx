import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { ComponentPropsContext, useComponentProps } from './ComponentPropsContext';

describe('ComponentPropsContext', () => {
  const VALUE = Object.freeze({ x1: 101, y1: 202 });

  const X1Component = () => {
		const data = useComponentProps<number>('x1');
		
		return (
			<div>First: {data}</div>
		)
  };

  const X2Component = () => {
		const data = useComponentProps<number>('y1');
		
		return (
			<div>Second: {data}</div>
		)
  };

  it('should render', () => {
    const component = mount(<ComponentPropsContext value={VALUE}>
			<>
				<X1Component />
				<X2Component />
			</>
		</ComponentPropsContext>);

		const x1Div = component.find(X1Component);
		const x2Div = component.find(X2Component);

		expect(x1Div.contains(<div>First: 101</div>)).to.be.true;

		expect(x2Div.contains(<div>Second: 202</div>)).to.be.true;
  });
});
