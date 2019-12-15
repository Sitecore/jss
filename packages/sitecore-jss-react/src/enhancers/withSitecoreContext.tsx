import React, { ReactNode } from 'react';
import { SitecoreContextReactContext } from '../components/SitecoreContext';

export interface WithSitecoreContextOptions {
  updatable?: boolean;
}

export interface WithSitecoreContextProps {
  sitecoreContext: any;
  updateSitecoreContext?: ((value: any) => void) | false;
}

export interface ComponentConsumerProps extends WithSitecoreContextProps {
  children?: ReactNode;
}

export type WithSitecoreContextHocProps<ComponentProps> = Pick<ComponentProps, Exclude<keyof ComponentProps, keyof WithSitecoreContextProps>>;

export function withSitecoreContext(options?: WithSitecoreContextOptions) {

  return function withSitecoreContextHoc<ComponentProps extends ComponentConsumerProps>(Component: React.ComponentType<ComponentConsumerProps>) {

    return function WithSitecoreContext(props: WithSitecoreContextHocProps<ComponentProps>) {

      return (
        <SitecoreContextReactContext.Consumer>
          {context => {
            const { setSitecoreContext, ...contextValue } = context;
            return <Component {...props}
                       sitecoreContext={contextValue}
                       updateSitecoreContext={options && options.updatable && setSitecoreContext} />
          }}
        </SitecoreContextReactContext.Consumer>
      );
    };

    
  };
}
