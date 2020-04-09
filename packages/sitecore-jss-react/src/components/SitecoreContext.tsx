import React from 'react';

import PropTypes from 'prop-types';
import { ComponentFactory } from './sharedTypes';

export interface SitecoreContextProps {
  componentFactory: ComponentFactory;
  contextFactory?: SitecoreContextFactory;
  context?: any;
  [k: string]: any;
}

export class SitecoreContextFactory {
  subscribers: any[] = [];
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
    this.subscribers.push(func);
  }

  unsubscribeFromContext = (func: any) => {
    const index = this.subscribers.indexOf(func);
    if (index >= 0) {
      this.subscribers.splice(index, 1);
    }
  }

  setSitecoreContext = (value: any) => {
    this.context = value;
    this.subscribers.forEach((func) => func(value));
  }
}

export const SitecoreContextReactContext = React.createContext<SitecoreContextFactory>({} as SitecoreContextFactory);
export const ComponentFactoryReactContext = React.createContext<ComponentFactory>({} as ComponentFactory);

export class SitecoreContext extends React.Component<SitecoreContextProps> {
  static propTypes = {
    children: PropTypes.any.isRequired,
    componentFactory: PropTypes.func,
    contextFactory: PropTypes.object,
  };

  static displayName = 'SitecoreContext';

  componentFactory: ComponentFactory;
  contextFactory: SitecoreContextFactory;

  constructor(props: SitecoreContextProps, context: any) {
    super(props, context);

    this.componentFactory = props.componentFactory;
    if (props.contextFactory) {
      this.contextFactory = props.contextFactory;
    } else {
      this.contextFactory = new SitecoreContextFactory();
    }
  }

  componentDidMount() {
    // we force the children of the context to re-render when the context is updated
    // even if the local props are unchanged; we assume the contents depend on the Sitecore context
    this.contextFactory.subscribeToContext(this.contextListener);
  }

  contextListener = () => this.forceUpdate();

  componentWillUnmount() {
    this.contextFactory.unsubscribeFromContext(this.contextListener);
  }

  /**
   * React Context Provider should accept Object instead of
   * SitecoreContextFactory class instance
   */
  getSitecoreContextValue = () => ({ ...this.contextFactory });

  render() {
    return (
    <ComponentFactoryReactContext.Provider value={this.componentFactory}>
      <SitecoreContextReactContext.Provider value={this.getSitecoreContextValue()}>
        {this.props.children}
      </SitecoreContextReactContext.Provider>
    </ComponentFactoryReactContext.Provider>
    );
  }
}
