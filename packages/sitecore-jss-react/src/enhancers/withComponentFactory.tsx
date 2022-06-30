import React from 'react';
import { ComponentFactoryReactContext } from '../components/SitecoreContext';
import { ComponentFactory } from '../components/sharedTypes';
import { useContext } from 'react';

export interface ComponentFactoryProps {
  componentFactory?: ComponentFactory;
}

/**
 * @param {React.ComponentClass<T> | React.FC<T>} Component
 */
export function withComponentFactory<T extends ComponentFactoryProps>(
  Component: React.ComponentClass<T> | React.FC<T>
) {
  /**
   * @param {T} props - props to pass to the wrapped component
   * @returns {JSX.Element} - the rendered component
   */
  function WithComponentFactory(props: T) {
    const context = useContext(ComponentFactoryReactContext);
    return (
      <ComponentFactoryReactContext.Consumer>
        {() => <Component {...props} componentFactory={props.componentFactory || context} />}
      </ComponentFactoryReactContext.Consumer>
    );
  }

  WithComponentFactory.displayName = `withComponentFactory(${Component.displayName ||
    Component.name ||
    'Anonymous'})`;

  return WithComponentFactory;
}
