import React, { FC } from 'react';
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { shallow } from 'enzyme';

use(spies);

import { SitecoreContext, SitecoreContextFactory } from './SitecoreContext';
import { ComponentFactory } from './sharedTypes';
import { withSitecoreContext, ComponentConsumerProps } from '../enhancers/withSitecoreContext'

const NestedComponent: FC<ComponentConsumerProps> = (props: ComponentConsumerProps) => <div>{props.sitecoreContext && 'test'}</div>;
const NestedComponentWithContext: FC = withSitecoreContext()(NestedComponent);

const components = new Map();
const mockComponentFactory: ComponentFactory = name => components.get(name);

const singleton = new SitecoreContextFactory();

describe('SitecoreContext', () => {
	it('should unsubscribe from SitecoreContextFactory on unmount', () => {
		const wrappedComponent = shallow(
			<SitecoreContext componentFactory={mockComponentFactory} contextFactory={singleton}>
				<NestedComponentWithContext />
			</SitecoreContext>
		);

		const spyContextListener = spy((value: any) => value);

		singleton.subscribeToContext(spyContextListener);
		expect(singleton.subscribers).to.have.lengthOf(2);

		singleton.setSitecoreContext('mock');

		expect(spyContextListener).to.have.called.with('mock');
		expect(spyContextListener).on.have.been.called.exactly(1);

		wrappedComponent.unmount();

		expect(singleton.subscribers).to.have.lengthOf(1);
		expect(singleton.subscribers[0]).to.eqls(spyContextListener);
	});
});