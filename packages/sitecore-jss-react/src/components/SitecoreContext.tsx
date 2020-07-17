import React from 'react';

import PropTypes from 'prop-types';
import { ComponentFactory } from './sharedTypes';

export interface SitecoreContextProps {
  componentFactory: ComponentFactory;
  contextFactory?: SitecoreContextFactory;
  context?: any;
  [k: string]: any;
}

export interface SitecoreContextState { 
  contextFactory: SitecoreContextFactory;
  componentFactory: ComponentFactory;
}

export class SitecoreContextFactory {
  subscriber: any;
  context: any;

  constructor() {
    this.context = {
      pageEditing: false,
    };
  }

  getSitecoreContext = () => {
    return this.context;
  }

  subscribeToContext = (func: any) => {
    this.subscriber = func;
  }

  setSitecoreContext = (value: any) => {
    this.context = value;
    this.subscriber(this);
  }
}

export const SitecoreContextReactContext = React.createContext<SitecoreContextFactory>({} as SitecoreContextFactory);
export const ComponentFactoryReactContext = React.createContext<ComponentFactory>({} as ComponentFactory);

export class SitecoreContext extends React.Component<SitecoreContextProps, SitecoreContextState> {
  static propTypes = {
    children: PropTypes.any.isRequired,
    componentFactory: PropTypes.func,
    contextFactory: PropTypes.object,
  };

  static displayName = 'SitecoreContext';

  constructor(props: SitecoreContextProps) {
    super(props);

    const contextFactory = props.contextFactory
      ? props.contextFactory
      : { ...new SitecoreContextFactory() };

    this.state = {
      contextFactory,
      componentFactory: props.componentFactory
    };

    // we force the children of the context to re-render when the context is updated
    // even if the local props are unchanged; we assume the contents depend on the Sitecore context
    this.state.contextFactory.subscribeToContext(this.contextListener);
  }

  /**
   * React Context Provider should accept Object instead of
   * SitecoreContextFactory class instance
   */
  contextListener = (ctx: SitecoreContextFactory) => {
    this.setState({
      contextFactory: { ...ctx }
    });
  }

  render() {
    return (
    <ComponentFactoryReactContext.Provider value={this.state.componentFactory}>
      <SitecoreContextReactContext.Provider value={this.state.contextFactory}>
        {this.props.children}
      </SitecoreContextReactContext.Provider>
    </ComponentFactoryReactContext.Provider>
    );
  }
}
