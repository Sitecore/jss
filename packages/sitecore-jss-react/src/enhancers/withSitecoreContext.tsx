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
          {context => <Component {...props}
              sitecoreContext={context.context}
              updateSitecoreContext={options && options.updatable && context.setSitecoreContext} />}
        </SitecoreContextReactContext.Consumer>
      );
    };
  };
}

/**
 * This hook grants acess to the current SiteCore page context
 * by default JSS includes the following properties in this context:
 * - pageEditing - Provided by Layout Service, a boolean indicating whether the route is being accessed via the Experience Editor.
 * - pageState - Like pageEditing, but a string: normal, preview or edit.
 * - site - Provided by Layout Service, an object containing the name of the current Sitecore site context.
 *
 * @see https://jss.sitecore.com/docs/techniques/extending-layout-service/layoutservice-extending-context
 *
 * @example
 * const EditMode = () => {
 *    const {pageEditing} = useSitecoreContext();
 *    return <span>Edit Mode is {pageEditing ? 'active' : 'inactive'}</span>
 * }
 */
export function useSitecoreContext() {
  return React.useContext(SitecoreContextReactContext).context;
}
