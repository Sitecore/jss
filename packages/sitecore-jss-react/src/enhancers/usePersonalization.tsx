import { ComponentRendering } from '@sitecore-jss/sitecore-jss';
import { useEffect, createElement, useReducer, ComponentType, useContext } from 'react';
import { MissingComponent } from '../components/MissingComponent';
import { ComponentFactory } from '../components/sharedTypes';
import { SitecorePersonalizationReactContext } from './withSitecorePersonalizationContext';

export interface UsePersonalizationOptions {
  /**
   * The unique identifier of the component
   */
  uid: string;
  /**
   * The component factory
   */
  componentFactory: ComponentFactory;
  /**
   * A component that is rendered in place of a personalizable component
   * that does not have a definition in the componentFactory (i.e. don't have a React implementation)
   */
  missingComponentComponent?: ComponentType;
}

export interface UsePersonalizationResult {
  /**
   * A value that indicates whether loading is in-progress
   */
  isLoading: boolean;
  /**
   * The personalized component which is provided as a result of the personalization
   */
  personalizedComponent: React.ReactElement | null | undefined;
}

/**
 * This hook encapsulates awaiting for personalized component and its creation.
 * @param {UsePersonalizationOptions} options
 * @returns {UsePersonalizationResult} result
 */
export function usePersonalization(options: UsePersonalizationOptions): UsePersonalizationResult {
  // forceUpdate emulating, we need to re-render the component after personalization loading
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const sitecorePersonalizationContext = useContext(SitecorePersonalizationReactContext);
  let personalizedComponentLayout: ComponentRendering | null | undefined = undefined;
  let isLoading = false;
  if (sitecorePersonalizationContext) {
    personalizedComponentLayout = sitecorePersonalizationContext.getPersonalizedComponent(
      options.uid
    );
    isLoading = sitecorePersonalizationContext.isLoading(options.uid);
  }

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    let isUnMounted = false;
    sitecorePersonalizationContext?.ensurePersonalizedComponentLoaded(options.uid).then(() => {
      // emulate forceUpdate, do not set state if component already unmounted
      if (!isUnMounted) {
        forceUpdate();
      }
    });

    return () => {
      isUnMounted = true;
    };
  });

  return {
    personalizedComponent: personalizedComponentLayout
      ? createPersonalizedComponent(personalizedComponentLayout, options)
      : personalizedComponentLayout,
    isLoading: isLoading,
  };
}

/**
 * @param {ComponentRendering} personalizedComponentLayout
 * @param {UsePersonalizationOptions} options
 * @returns {React.ReactElement | null} component
 */
function createPersonalizedComponent(
  personalizedComponentLayout: ComponentRendering,
  options: UsePersonalizationOptions
): React.ReactElement | null {
  let personalizedComponent: React.ReactElement | null = null;

  if (options.componentFactory) {
    let component = options.componentFactory(personalizedComponentLayout.componentName);
    if (!component) {
      component = options.missingComponentComponent ?? MissingComponent;
      console.error(
        `Unknown component ${personalizedComponentLayout.componentName}. Ensure that a React component exists for it, and that it is registered in your componentFactory.js.`
      );
    }

    personalizedComponent = createElement<{ [attr: string]: unknown }>(
      component as React.ComponentType,
      {
        fields: personalizedComponentLayout.fields,
        params: personalizedComponentLayout.params,
        rendering: personalizedComponentLayout,
      }
    );
  } else {
    console.error('Unable to resolve componentFactory.');
  }
  return personalizedComponent;
}
