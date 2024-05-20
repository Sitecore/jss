import React from 'react';
import { EnhancedOmit } from '@sitecore-jss/sitecore-jss/utils';
import { SitecoreContextReactContext, SitecoreContextValue } from '../components/SitecoreContext';

export interface WithSitecoreContextOptions {
  updatable?: boolean;
}

// The props that HOC will inject
export interface WithSitecoreContextProps {
  sitecoreContext: SitecoreContextValue;
  updateSitecoreContext?: ((value: SitecoreContextValue) => void) | false;
}

// The props that HOC will receive.
export type WithSitecoreContextHocProps<ComponentProps> = EnhancedOmit<
  ComponentProps,
  keyof WithSitecoreContextProps
>;

/**
 * @param {WithSitecoreContextOptions} [options]
 */
export function withSitecoreContext(options?: WithSitecoreContextOptions) {
  return function withSitecoreContextHoc<ComponentProps extends WithSitecoreContextProps>(
    Component: React.ComponentType<ComponentProps>
  ) {
    return function WithSitecoreContext(props: WithSitecoreContextHocProps<ComponentProps>) {
      return (
        <SitecoreContextReactContext.Consumer>
          {(context) => (
            <Component
              {...(props as ComponentProps)}
              sitecoreContext={context.context}
              updateSitecoreContext={options && options.updatable && context.setContext}
            />
          )}
        </SitecoreContextReactContext.Consumer>
      );
    };
  };
}

/**
 * This hook grants acсess to the current Sitecore page context
 * by default JSS includes the following properties in this context:
 * - pageEditing - Provided by Layout Service, a boolean indicating whether the route is being accessed via the Experience Editor.
 * - pageState - Like pageEditing, but a string: normal, preview or edit.
 * - site - Provided by Layout Service, an object containing the name of the current Sitecore site context.
 *
 * @see https://jss.sitecore.com/docs/techniques/extending-layout-service/layoutservice-extending-context
 *
 * @param {WithSitecoreContextOptions} [options] hook options
 *
 * @example
 * const EditMode = () => {
 *    const { sitecoreContext } = useSitecoreContext();
 *    return <span>Edit Mode is {sitecoreContext.pageEditing ? 'active' : 'inactive'}</span>
 * }
 *
 * @example
 * const EditMode = () => {
 *    const { sitecoreContext, updateSitecoreContext } = useSitecoreContext({ updatable: true });
 *    const onClick = () => updateSitecoreContext({ pageEditing: true });
 *    return <span onClick={onClick}>Edit Mode is {sitecoreContext.pageEditing ? 'active' : 'inactive'}</span>
 * }
 * @returns {Object} { sitecoreContext, updateSitecoreContext }
 */
export function useSitecoreContext(options?: WithSitecoreContextOptions) {
  const reactContext = React.useContext(SitecoreContextReactContext);
  const updatable = options?.updatable;

  return {
    sitecoreContext: reactContext.context,
    updateSitecoreContext: updatable ? reactContext.setContext : undefined,
  };
}
