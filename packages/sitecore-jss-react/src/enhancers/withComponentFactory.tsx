import React from 'react';
import { ComponentFactoryReactContext } from '../components/SitecoreContext';
import { ComponentFactory } from '../components/sharedTypes';

export interface ComponentFactoryProps {
  componentFactory?: ComponentFactory;
}

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
