import React from 'react';
import PropTypes from 'prop-types';
import { ComponentFactory } from './sharedTypes';

export interface SitecoreContextProps {
  componentFactory: ComponentFactory;
  children: unknown;
}

export const ComponentFactoryReactContext = React.createContext<ComponentFactory>(
  {} as ComponentFactory
);

export class SitecoreContext extends React.Component<SitecoreContextProps> {
  static propTypes = {
    children: PropTypes.any.isRequired,
    componentFactory: PropTypes.func,
  };

  static displayName = 'SitecoreContext';

  componentFactory: ComponentFactory;

  constructor(props: SitecoreContextProps, context: unknown) {
    super(props, context);
    this.componentFactory = props.componentFactory;
  }

  render() {
    return (
      <ComponentFactoryReactContext.Provider value={this.componentFactory}>
        {this.props.children}
      </ComponentFactoryReactContext.Provider>
    );
  }
}
