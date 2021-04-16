import {
  isServer,
  LayoutPersonalizationService,
  withSitecorePersonalizationContext,
  areQueryParamsReady,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { TrackingService } from '../../../../packages/sitecore-jss-tracking/types';
import { SitecorePageProps } from 'lib/page-props';
import { useRouter } from 'next/router';

export interface WithPersonalizationAndTrackingOptions {
  /**
   * The layout personalization service
   */
  layoutPersonalizationService: LayoutPersonalizationService;
  /**
   * The tracking service
   */
  trackingService: TrackingService;
}

export interface WithCurrentPageTrackingOptions {
  /**
   * The tracking service
   */
  trackingService: TrackingService;
}

export interface WithNotFoundPageTrackingOptions {
  /**
   * The tracking service
   */
  trackingService: TrackingService;
}

/**
 * Checks whether the current page needs to be tracked and tracks the page view.
 * @param {WithCurrentPageTrackingOptions} [options]
 * @returns The wrapped component.
 */
export function withCurrentPageTracking(options: WithCurrentPageTrackingOptions) {
  return function withCurrentPageTracking<T extends SitecorePageProps>(
    Component: React.ComponentType<T>
  ): (props: T) => JSX.Element {
    return function withCurrentPageTracking(props: T) {
      const newProps = { ...props };
      const route = props.layoutData?.sitecore.route;
      if (
        !props.isPreview &&
        !props.tracked &&
        route &&
        route.layoutId !== 'available-in-connected-mode' &&
        areQueryParamsReady(useRouter()) &&
        !isServer()
      ) {
        options.trackingService.trackCurrentPage(props.layoutData?.sitecore.context, route);
        newProps.tracked = true;
      }
      return <Component {...newProps} />;
    };
  };
}

/**
 * Checks whether a not found page can be tracked and tracks it.
 * @param {WithNotFoundPageTrackingOptions} [options]
 * @returns The wrapped component.
 */
export function withNotFoundPageTracking(options: WithNotFoundPageTrackingOptions) {
  return function withNotFoundPageTracking<T>(
    Component: React.ComponentType<T>
  ): (props: T) => JSX.Element {
    return function withNotFoundPageTracking(props: T) {
      if (areQueryParamsReady(useRouter()) && !isServer()) {
        options.trackingService.trackPage(
          {
            url: location.pathname + location.search,
            referrer: document.referrer,
          },
          { sc_trk: 'Page not found' }
        );
      }
      return <Component {...props} />;
    };
  };
}

/**
 * Checks whether a component can be personalized, starts personalization
 * and wraps component to provide it with personalization context.
 * Tracks the page view if the current page was not tracked during personalization.
 * @param {WithPersonalizationAndTrackingOptions} [options]
 * @returns The wrapped component.
 */
export function withPersonalizationAndTracking(options: WithPersonalizationAndTrackingOptions) {
  return function withPersonalizationAndTracking<T extends SitecorePageProps>(
    Component: React.ComponentType<T>
  ): (props: T) => JSX.Element {
    return withSitecorePersonalizationContext({
      layoutPersonalizationService: options.layoutPersonalizationService,
    })(
      withCurrentPageTracking({
        trackingService: options.trackingService,
      })(Component)
    );
  };
}
