import { LayoutPersonalizationService } from '@sitecore-jss/sitecore-jss';
import { useEffect, createElement, useReducer } from 'react';
import { MissingComponent } from '../components/MissingComponent';
import { useComponentFactory } from './withComponentFactory';

export function usePersonalization(props: { uid: string, layoutPersonalizationService: LayoutPersonalizationService, missingComponentComponent?: React.ComponentClass<unknown> | React.FC<unknown> }) {
  // forceUpdate emulating, we need to re-render the component after personalization loading
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const componentFactory = useComponentFactory();

  const personalizedComponentLayout = props.layoutPersonalizationService.getPersonalizedComponent(props.uid);
  const isLoading = props.layoutPersonalizationService.isLoading();

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    var isUnMounted = false;
    props.layoutPersonalizationService.loadPersonalizedComponent(props.uid).then(() => {
      // emulate forceUpdate, do not set state if component already unmounted
      if (!isUnMounted) {
        forceUpdate();
      }
    });
    return () => { isUnMounted = true; };
  });

  var personalizedComponent: React.ReactElement | null = null;
  if (personalizedComponentLayout) {
    if (componentFactory) {
      let component = componentFactory(personalizedComponentLayout.componentName);
      if (!component) {
        component = props.missingComponentComponent ?? MissingComponent;
        console.error(
          `Unknown component ${personalizedComponentLayout.componentName}. Ensure that a React component exists for it, and that it is registered in your componentFactory.js.`
        );
      }
      personalizedComponent = createElement<{ [attr: string]: unknown }>(
        component as React.ComponentType, {
          fields: personalizedComponentLayout.fields,
          params: personalizedComponentLayout.params,
          rendering: personalizedComponentLayout
        }
      )
    } else {
      console.error(`Unable to resolve componentFactory.`);
    }
  }

  return {
    personalizedComponent: personalizedComponent,
    isLoading: isLoading
  };
}
