/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PropTypes from 'prop-types';
import { ComponentFactory } from './sharedTypes';

export interface SitecoreContextProps<ContextType = any> {
  componentFactory: ComponentFactory;
  context?: ContextType;
}

export interface SitecoreContextState<ValueType = any> {
  setContext: (value: ValueType) => void;
  context: ValueType;
}

export const SitecoreContextReactContext = React.createContext<SitecoreContextState>(
  {} as SitecoreContextState
);
export const ComponentFactoryReactContext = React.createContext<ComponentFactory>(
  {} as ComponentFactory
);

export class SitecoreContext<ValueType = any> extends React.Component<
  SitecoreContextProps<ValueType>,
  SitecoreContextState<ValueType>
> {
  static propTypes = {
    children: PropTypes.any.isRequired,
    componentFactory: PropTypes.func,
    context: PropTypes.any,
  };

  static displayName = 'SitecoreContext';

  constructor(props: SitecoreContextProps<ValueType>) {
    super(props);

    let context: any = {
      pageEditing: false,
    };

    if (props.context) {
      context = props.context;
    }

    if (props.context === null) {
      context = null;
    }

    this.state = {
      context,
      setContext: this.setContext,
    };
  }

  setContext = (value: ValueType) => {
    this.setState({
      context: value,
    });
  };

  render() {
    return (
      <ComponentFactoryReactContext.Provider value={this.props.componentFactory}>
        <SitecoreContextReactContext.Provider value={this.state}>
          {this.props.children}
        </SitecoreContextReactContext.Provider>
      </ComponentFactoryReactContext.Provider>
    );
  }
}
