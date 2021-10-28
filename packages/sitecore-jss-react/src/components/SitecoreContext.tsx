/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';
import { ComponentFactory } from './sharedTypes';
import { LayoutServiceContext, LayoutServiceData, RouteData } from '../index';

export interface SitecoreContextProps {
  componentFactory: ComponentFactory;
  layoutData?: LayoutServiceData;
}

export interface SitecoreContextState {
  setContext: (value: SitecoreContextValue | LayoutServiceData) => void;
  context: SitecoreContextValue;
}

export const SitecoreContextReactContext = React.createContext<SitecoreContextState>(
  {} as SitecoreContextState
);
export const ComponentFactoryReactContext = React.createContext<ComponentFactory>(
  {} as ComponentFactory
);

export type SitecoreContextValue = LayoutServiceContext & {
  itemId?: string;
  route?: RouteData;
};

export class SitecoreContext extends React.Component<SitecoreContextProps, SitecoreContextState> {
  static propTypes = {
    children: PropTypes.any.isRequired,
    componentFactory: PropTypes.func,
    layoutData: PropTypes.shape({
      sitecore: PropTypes.shape({
        context: PropTypes.any,
        route: PropTypes.any,
      }),
    }),
  };

  static displayName = 'SitecoreContext';

  constructor(props: SitecoreContextProps) {
    super(props);

    const context: SitecoreContextValue = this.constructContext(props.layoutData);

    this.state = {
      context,
      setContext: this.setContext,
    };
  }

  constructContext(layoutData?: LayoutServiceData): SitecoreContextValue {
    if (!layoutData) {
      return {
        pageEditing: false,
      };
    }

    return {
      route: layoutData.sitecore.route,
      itemId: layoutData.sitecore.route?.itemId,
      ...layoutData.sitecore.context,
    };
  }

  componentDidUpdate(prevProps: SitecoreContextProps) {
    // In case if somebody will manage SitecoreContext state by passing fresh `layoutData` prop
    // instead of using `updateSitecoreContext`
    if (!deepEqual(prevProps.layoutData, this.props.layoutData)) {
      this.setContext(this.props.layoutData);

      return;
    }
  }

  /**
   * Update context state. Value can be @type {LayoutServiceData} which will be automatically transformed
   * or you can provide exact @type {SitecoreContextValue}
   * @param {SitecoreContextValue | LayoutServiceData} value New context value
   */
  setContext = (value: SitecoreContextValue | LayoutServiceData) => {
    this.setState({
      context: value.sitecore
        ? this.constructContext(value as LayoutServiceData)
        : { ...(value as SitecoreContextValue) },
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
