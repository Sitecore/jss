import {
  PersonalizedComponentRendering,
  isComponentRendering,
  isPersonalizedComponentRendering,
  ComponentRendering,
  PlaceholdersData,
  hasPersonalization
} from '../layout/models';

export class LayoutPersonalizationUtils {

  buildPersonalizedFragment(uid: string, personalizedFragments: { [key: string]: ComponentRendering | null | undefined; }, defaultComponent: ComponentRendering | null): ComponentRendering | null {
    var personalizedFragment = personalizedFragments[uid];
    if (personalizedFragment === null) {
      return null;
    } else if (personalizedFragment === undefined) {
      return defaultComponent;
    }

    function replacePersonalizedRenderings(context: ComponentRendering): boolean {
      if (context.placeholders) {
        for (const key in context.placeholders) {
          if (context.placeholders.hasOwnProperty(key)) {
            const placeholder = context.placeholders[key];
            var hiddenComponents: any[] = [];
            for (let i = 0; i < placeholder.length; i++) {
              var component = placeholder[i];
              if (requirePersonalization(component)) {
                var personalizedFragment = personalizedFragments[component.uid];
                if (personalizedFragment === null) {
                  hiddenComponents.push(component);
                } else if (personalizedFragment) {
                  var wasReplaced = replacePersonalizedRenderings(personalizedFragment);
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
              context.placeholders[key] = placeholder.filter(function (item: any) {
                return hiddenComponents.indexOf(item) == -1;
              });
            }
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

  getPersonalizedComponents(item: any): PersonalizedComponentRendering[] {
    const result: PersonalizedComponentRendering[] = [];
    if (isPersonalizedComponentRendering(item)) {
      result.push(item);
    } else if (item.placeholders) {
      for (const key in item.placeholders) {
        if (item.placeholders.hasOwnProperty(key)) {
          const placeholder = item.placeholders[key];
          for (const component of placeholder) {
            const components = this.getPersonalizedComponents(component);
            for (const component of components) {
              result.push(component);
            }
          }
        }
      }
    }
    return result;
  };

  replacePersonalizedComponentsWithLoaderComponents(placeholders: PlaceholdersData, loaderComponentName: string) {
    if (placeholders) {
      for (const key in placeholders) {
        const placeholder = placeholders[key];
        if (Array.isArray(placeholder)) {
          placeholder.forEach((component, index) => {
            if (hasPersonalization(component) && component.personalization) {
              const personalizedComponent: PersonalizedComponentRendering = {
                componentName: loaderComponentName,
                uid: component.uid as string,
                personalization: {
                  hiddenByDefault: component.personalization.hiddenByDefault,
                  defaultComponent: component.personalization.hiddenByDefault ? null : component
                }
              };
              placeholder[index] = personalizedComponent;
            } else if (isComponentRendering(component) && component.placeholders) {
              this.replacePersonalizedComponentsWithLoaderComponents(component.placeholders, loaderComponentName);
            }
          });
        }
      }
    }
  }
}

export function requirePersonalization(component: any): component is { uid: string } {
  return component && Object.keys(component).length === 1 && 'uid' in component;
}
