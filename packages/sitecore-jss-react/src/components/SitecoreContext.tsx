/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';
import { ComponentFactory } from './sharedTypes';

export interface SitecoreContextProps<ContextType = any> {
  componentFactory: ComponentFactory;
  context?: ContextType;
}

export interface SitecoreContextState<ContextType = any> {
  setContext: (value: ContextType) => void;
  context: ContextType;
}

export const SitecoreContextReactContext = React.createContext<SitecoreContextState>(
  {} as SitecoreContextState
);
export const ComponentFactoryReactContext = React.createContext<ComponentFactory>(
  {} as ComponentFactory
);

export class SitecoreContext<ContextType = any> extends React.Component<
  SitecoreContextProps<ContextType>,
  SitecoreContextState<ContextType>
> {
  static propTypes = {
    children: PropTypes.any.isRequired,
    componentFactory: PropTypes.func,
    context: PropTypes.any,
  };

  static displayName = 'SitecoreContext';

  constructor(props: SitecoreContextProps<ContextType>) {
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

  componentDidUpdate(prevProps: any) {
    if (!deepEqual(prevProps.context, this.props.context)) {
      this.setState({
        context: this.props.context,
      });

      return;
    }
  }

  setContext = (value: ContextType) => {
    if (deepEqual(value, this.state.context)) return;

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
