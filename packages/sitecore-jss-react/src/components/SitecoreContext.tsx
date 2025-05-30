/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import fastDeepEqual from 'fast-deep-equal/es6/react';
import { ComponentFactory } from './sharedTypes';
import { LayoutServiceContext, LayoutServiceData, RouteData } from '../index';
import { constants } from '@sitecore-jss/sitecore-jss';

export interface SitecoreContextProps {
  componentFactory: ComponentFactory;
  layoutData?: LayoutServiceData;
  /**
   * API settings to connect to Sitecore.
   */
  api?: {
    /**
     * Sitecore XM Cloud Edge endpoint credentials for Sitecore connection.
     */
    edge?: {
      /**
       * A unified identifier used to connect and retrieve data from XM Cloud instance
       */
      contextId: string;
      /**
       * XM Cloud endpoint that the app will communicate and retrieve data from
       * @default https://edge-platform.sitecorecloud.io
       */
      edgeUrl?: string;
    };
  };
  children: React.ReactNode;
}

export interface SitecoreContextState {
  setContext: (value: SitecoreContextValue | LayoutServiceData) => void;
  context: SitecoreContextValue;
  api?: SitecoreContextProps['api'];
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
  static displayName = 'SitecoreContext';

  constructor(props: SitecoreContextProps) {
    super(props);

    const context: SitecoreContextValue = this.constructContext(props.layoutData);

    let api = props.api;

    if (props.api?.edge?.contextId && !props.api?.edge?.edgeUrl) {
      api = {
        ...props.api,
        edge: {
          ...props.api.edge,
          edgeUrl: constants.SITECORE_EDGE_URL_DEFAULT,
        },
      };
    }

    this.state = {
      context,
      setContext: this.setContext,
      api,
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
    if (!fastDeepEqual(prevProps.layoutData, this.props.layoutData)) {
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
