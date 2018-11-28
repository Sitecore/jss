import React from 'react';
import { SitecoreContextReactContext } from '../components/SitecoreContext';

export interface WithSitecoreContextOptions {
  updatable?: boolean;
}

export function withSitecoreContext(options?: WithSitecoreContextOptions) {
  return function withSitecoreContextHoc(Component: React.ComponentClass<any> | React.SFC<any>) {
    return function WithSitecoreContext(props: any) {
      return (
        <SitecoreContextReactContext.Consumer>
          {context => <Component {...props} sitecoreContext={context.context} updateSitecoreContext={options && options.updatable && context.setSitecoreContext} />}
        </SitecoreContextReactContext.Consumer>
      );
    };
  };
}
