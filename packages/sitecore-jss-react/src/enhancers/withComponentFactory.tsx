import React from 'react';
import { ComponentFactoryReactContext } from '../components/SitecoreContext';
import { ComponentFactory } from '../components/sharedTypes';

export interface ComponentFactoryProps {
  componentFactory?: ComponentFactory;
}

/**
 * @param {React.ComponentClass<T> | React.SFC<T>} Component
 */
export function withComponentFactory<T extends ComponentFactoryProps>(
  Component: React.ComponentClass<T> | React.SFC<T>
) {
  return function WithComponentFactory(props: T) {
    return (
      <ComponentFactoryReactContext.Consumer>
        {(context) => <Component {...props} componentFactory={props.componentFactory || context} />}
      </ComponentFactoryReactContext.Consumer>
    );
  };
}

export function useComponentFactory() {
  const componentFactory = React.useContext(ComponentFactoryReactContext);
  if (!componentFactory || typeof componentFactory !== 'function') {
    console.error(`No componentFactory available to use`);
    return null;
  }
  return componentFactory;
}
