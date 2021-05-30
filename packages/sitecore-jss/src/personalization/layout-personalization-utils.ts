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

    return this.replaceNestedPersonalizedRenderings(personalizedFragment, personalizedFragments)
      ? personalizedFragment
      : defaultComponent;
  }

  getPersonalizedComponents(placeholders: PlaceholdersData): PersonalizedComponentRendering[] {
    const result: PersonalizedComponentRendering[] = [];
    for (const [, placeholder] of Object.entries(placeholders)) {
      for (const component of placeholder) {
        if (isPersonalizedComponentRendering(component)) {
          result.push(component);
        } else if (isComponentRendering(component) && component.placeholders) {
          const components = this.getPersonalizedComponents(component.placeholders);
          result.push(...components);
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

  /**
   * @param {ComponentRendering} context
   * @param {object} personalizedFragments
   */
  private replaceNestedPersonalizedRenderings(
    context: ComponentRendering,
    personalizedFragments: { [key: string]: ComponentRendering | null | undefined }
  ): boolean {
    if (!context.placeholders) {
      return true;
    }

    for (const [key, placeholder] of Object.entries(context.placeholders)) {
      const hiddenComponents: PersonalizedComponentRendering[] = [];

      for (let i = 0; i < placeholder.length; i++) {
        const component = placeholder[i];
        if (!this.requirePersonalization(component)) {
          continue;
        }

        const personalizedFragment = personalizedFragments[component.uid];
        if (personalizedFragment === null) {
          hiddenComponents.push(component);
        } else if (personalizedFragment) {
          const wasReplaced = this.replaceNestedPersonalizedRenderings(
            personalizedFragment,
            personalizedFragments
          );
          if (!wasReplaced) {
            return false;
          }
          placeholder[i] = personalizedFragment;
        } else {
          return false;
        }
      }

      if (hiddenComponents.length) {
        context.placeholders[key] = placeholder.filter(
          (component) =>
            !isPersonalizedComponentRendering(component) ||
            hiddenComponents.indexOf(component) === -1
        );
      }
    }
    return true;
  }

  /**
   * @param {PersonalizedComponentRendering | ComponentRendering | HtmlElementRendering} component
   */
  private requirePersonalization(
    component: PersonalizedComponentRendering | ComponentRendering | HtmlElementRendering
  ): component is PersonalizedComponentRendering {
    return component && Object.keys(component).length === 1 && 'uid' in component;
  }
}
