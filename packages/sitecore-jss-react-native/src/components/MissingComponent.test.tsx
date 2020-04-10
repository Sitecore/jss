import React from 'react';
import renderer from 'react-test-renderer';
import { View, Text } from 'react-native';
import { MissingComponent } from './MissingComponent';

describe('<MissingComponent />', () => {
	test('should render without component name', () => {
		const p = {
			rendering: {}
		}

		const c = renderer.create(<MissingComponent {...p} />);

		expect(c).toMatchSnapshot();
	})

	test('should render with component name', () => {
		const p = {
			rendering: {
				componentName: 'TestComponent'
			}
		}

		const c = renderer.create(<MissingComponent {...p} />);

		expect(c).toMatchSnapshot();
	})
})
