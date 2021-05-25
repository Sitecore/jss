import {
  PersonalizedComponentRendering,
  isComponentRendering,
  isPersonalizedComponentRendering,
  ComponentRendering,
  PlaceholdersData,
  hasPersonalization,
  HtmlElementRendering,
} from '../layout/models';

export class LayoutPersonalizationUtils {
  buildPersonalizedFragment(
    uid: string,
    personalizedFragments: { [key: string]: ComponentRendering | null | undefined },
    defaultComponent: ComponentRendering | null
  ): ComponentRendering | null {
    const personalizedFragment = personalizedFragments[uid];
    if (personalizedFragment === null) {
      return null;
    } else if (personalizedFragment === undefined) {
      return defaultComponent;
    }

    /**
     * @param {ComponentRendering} context
     */
    function replacePersonalizedRenderings(context: ComponentRendering): boolean {
      if (context.placeholders) {
        for (const [key, placeholder] of Object.entries(context.placeholders)) {
          const hiddenComponents: PersonalizedComponentRendering[] = [];
          for (let i = 0; i < placeholder.length; i++) {
            const component = placeholder[i];
            if (requirePersonalization(component)) {
              const personalizedFragment = personalizedFragments[component.uid];
              if (personalizedFragment === null) {
                hiddenComponents.push(component);
              } else if (personalizedFragment) {
                const wasReplaced = replacePersonalizedRenderings(personalizedFragment);
                if (!wasReplaced) {
                  return false;
                }
                placeholder[i] = personalizedFragment;
              } else {
                return false;
              }
            }
          }
          if (hiddenComponents.length) {
            context.placeholders[key] = placeholder.filter((component) => {
              return (
                !isPersonalizedComponentRendering(component) ||
                hiddenComponents.indexOf(component) === -1
              );
            });
          }
        }
      }
      return true;
    }

    if (replacePersonalizedRenderings(personalizedFragment)) {
      return personalizedFragment;
    } else {
      return defaultComponent;
    }
  }

  getPersonalizedComponents(placeholders: PlaceholdersData): PersonalizedComponentRendering[] {
    const result: PersonalizedComponentRendering[] = [];
    for (const [, placeholder] of Object.entries(placeholders)) {
      for (const component of placeholder) {
        if (isPersonalizedComponentRendering(component)) {
          result.push(component);
        } else if (isComponentRendering(component) && component.placeholders) {
          const components = this.getPersonalizedComponents(component.placeholders);
          for (const component of components) {
            result.push(component);
          }
        }
      }
    }
    return result;
  }

  replacePersonalizedComponentsWithLoaderComponents(
    placeholders: PlaceholdersData,
    loaderComponentName: string
  ) {
    if (placeholders) {
      for (const [, placeholder] of Object.entries(placeholders)) {
        if (Array.isArray(placeholder)) {
          placeholder.forEach((component, index) => {
            if (hasPersonalization(component) && component.personalization) {
              const personalizedComponent: PersonalizedComponentRendering = {
                componentName: loaderComponentName,
                uid: component.uid as string,
                personalization: {
                  hiddenByDefault: component.personalization.hiddenByDefault,
                  defaultComponent: component.personalization.hiddenByDefault ? null : component,
                },
              };
              placeholder[index] = personalizedComponent;
            } else if (isComponentRendering(component) && component.placeholders) {
              this.replacePersonalizedComponentsWithLoaderComponents(
                component.placeholders,
                loaderComponentName
              );
            }
          });
        }
      }
    }
  }
}

/**
 * @param {PersonalizedComponentRendering | ComponentRendering | HtmlElementRendering} component
 */
export function requirePersonalization(
  component: PersonalizedComponentRendering | ComponentRendering | HtmlElementRendering
): component is PersonalizedComponentRendering {
  return component && Object.keys(component).length === 1 && 'uid' in component;
}
