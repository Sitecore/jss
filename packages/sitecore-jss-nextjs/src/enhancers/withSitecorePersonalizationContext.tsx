import React from 'react';
import { isServer } from '@sitecore-jss/sitecore-jss';
import { useRouter } from 'next/router';
import {
  WithSitecorePersonalizationContextOptions,
  SitecorePersonalizationContextProps,
  withSitecorePersonalizationContext as reactWithSitecorePersonalizationContext,
} from '@sitecore-jss/sitecore-jss-react';
import { areQueryParamsReady } from '../utils';

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
  ): (props: T) => JSX.Element {
    const WrappedComponent = reactWithSitecorePersonalizationContext(options)(Component);
    return function WithSitecorePersonalizationContext(props: T) {
      const router = useRouter();
      const newProps = { ...props };

      if (!isServer() && !areQueryParamsReady(router)) {
        newProps.isPersonalizationSuppressed = true;
      }
      return <WrappedComponent {...newProps} />;
    };
  };
}
