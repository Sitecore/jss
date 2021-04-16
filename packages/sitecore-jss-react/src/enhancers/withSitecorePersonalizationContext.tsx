import React from 'react';
import {
  isServer,
  LayoutPersonalizationService,
  LayoutServiceData,
  SitecorePersonalizationContextState,
} from '@sitecore-jss/sitecore-jss';

export const SitecorePersonalizationReactContext = React.createContext<
  SitecorePersonalizationContextState | undefined
>(undefined);

export interface SitecorePersonalizationContextProps {
  /**
   * The layout data
   */
  layoutData: LayoutServiceData | null;
  /**
   * The boolean indicating whether the route is being accessed in preview mode
   */
  isPreview: boolean;
  /**
   * The boolean indicating whether the personalization is suppressed
   */
  isPersonalizationSuppressed?: boolean;
  /**
   * The boolean indicating whether the page view has been already tracked
   */
  tracked: boolean;
}

export interface WithSitecorePersonalizationContextOptions {
  /**
   * The layout personalization service
   */
  layoutPersonalizationService: LayoutPersonalizationService;
}

/**
 * Checks whether a component can be personalized, starts personalization
 * and wraps component to provide it with personalization context.
 * @param {WithSitecorePersonalizationContextOptions} [options]
 * @returns The wrapped component.
 */
export function withSitecorePersonalizationContext(
  options: WithSitecorePersonalizationContextOptions
) {
  return function withSitecorePersonalizationContext<T extends SitecorePersonalizationContextProps>(
    Component: React.ComponentType<T>
  ) {
    return function withSitecorePersonalizationContext(props: T) {
      const route = props.layoutData?.sitecore.route;

      let personalizationContext: SitecorePersonalizationContextState | undefined = undefined;
      const newProps = { ...props };
      if (
        !props.isPersonalizationSuppressed &&
        !props.isPreview &&
        route &&
        route.layoutId !== 'available-in-connected-mode' &&
        !isServer()
      ) {
        personalizationContext = options.layoutPersonalizationService.startPersonalization(
          {
            language: props.layoutData?.sitecore.context.language as string,
            routePath: props.layoutData?.sitecore.context.itemPath as string,
          },
          route
        );
        if (personalizationContext) {
          newProps.tracked = personalizationContext.isTracked;
        }
      }

      return (
        <SitecorePersonalizationReactContext.Provider value={personalizationContext}>
          <Component {...newProps} />
        </SitecorePersonalizationReactContext.Provider>
      );
    };
  };
}
