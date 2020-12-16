import React from 'react';
import renderer from 'react-test-renderer';
import { View, Text } from 'react-native';
import { DateField } from './Date';

describe('<DateField />', () => {
  test('should render nothing with missing field', () => {
    const p = {
      field: {},
    };

    const c = renderer.create(<DateField {...p} />);

    const instance = c.getInstance();

    expect(instance && instance.children).toEqual(null);
    expect(c).toMatchSnapshot();
  });

  test('should render value', () => {
    const p = {
      field: {
        value: 'xxx',
      },
    };

    const c = renderer.create(<DateField {...p} />);

    expect(c).toMatchSnapshot();
  });

  test('should render value using render function', () => {
    const render = (date: Date | null) => (
      <View>
        <Text>Test test test...</Text>
        <Text>{date ? date.toDateString() : ''}</Text>
      </View>
    );

    const p = {
      field: {
        value: '10-23-2003',
      },
      render,
    };

    const c = renderer.create(<DateField {...p} />);

    expect(c).toMatchSnapshot();
  });
});
