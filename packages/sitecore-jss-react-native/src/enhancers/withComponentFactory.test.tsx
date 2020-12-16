import React from 'react';
import { View, Text } from 'react-native';
import renderer from 'react-test-renderer';
import { withComponentFactory } from './withComponentFactory';
import { ComponentFactory } from '../components/sharedTypes';
import { ComponentFactoryReactContext } from '../components/SitecoreContext';

describe('withComponentFactory()', () => {
  test('should pass factory to wrapped component from context', () => {
    const components = new Map();

    components.set('xxx', () => <Text>I'm component from factory</Text>);

    const componentFactory: ComponentFactory = (componentName) => components.get(componentName);

    type TestComponentProps = {
      customProperty?: string;
      componentFactory?: ComponentFactory | null;
    }

    const TestComponent = (props: TestComponentProps) => {
      if (!props.componentFactory) return null;

      const ComponentFromFactory = props.componentFactory('xxx');

      return (
        <View>
          <Text>Hello world...</Text>
          <Text>Custom property:{props.customProperty}</Text>
          <ComponentFromFactory />
        </View>
      );
    };

    const TestComponentWithFactory = withComponentFactory<TestComponentProps>(TestComponent);

    const c = renderer.create(
      <ComponentFactoryReactContext.Provider value={componentFactory}>
        <TestComponentWithFactory customProperty="yyy" />
      </ComponentFactoryReactContext.Provider>
    );

    expect(c).toMatchSnapshot();
  });

  test('should pass factory to wrapped component from props', () => {
    const propsFactoryComponents = new Map();
    const contextFactoryComponents = new Map();

    type TestComponentProps = {
      customProperty?: string;
      componentFactory?: ComponentFactory | null;
    }

    contextFactoryComponents.set('xxx', () => <Text>I'm component from context factory</Text>);

    propsFactoryComponents.set('xxx', () => <Text>I'm component from props factory</Text>);

    const propsComponentFactory: ComponentFactory = (componentName) =>
      propsFactoryComponents.get(componentName);
    const contextComponentFactory: ComponentFactory = (componentName) =>
      contextFactoryComponents.get(componentName);

    const TestComponent = (props: TestComponentProps) => {
      if (!props.componentFactory) return null;
      
      const ComponentFromFactory = props.componentFactory('xxx');

      return (
        <View>
          <Text>Hello world...</Text>
          <Text>Custom property:{props.customProperty}</Text>
          <ComponentFromFactory />
        </View>
      );
    };

    const TestComponentWithFactory = withComponentFactory<TestComponentProps>(TestComponent);

    const c = renderer.create(
      <ComponentFactoryReactContext.Provider value={contextComponentFactory}>
        <TestComponentWithFactory componentFactory={propsComponentFactory} customProperty="yyy" />
      </ComponentFactoryReactContext.Provider>
    );

    expect(c).toMatchSnapshot();
  });
});
