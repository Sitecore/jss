import {
  LayoutServiceData,
  ComponentRendering,
  HtmlElementRendering,
  PlaceholdersData,
} from './../layout/models';

export type ComponentRenderingWithExperiences = ComponentRendering & {
  experiences: { [name: string]: ComponentRenderingWithExperiences };
};

/**
 * Apply personalization to layout data. This will recursively go through all placeholders/components, check experiences nodes and replace default with object from specific experience.
 * @param {LayoutServiceData} layout Layout data
 * @param {string} variantId variant id
 * @param {string[]} [componentVariantIds] component variant ids
 */
export function personalizeLayout(
  layout: LayoutServiceData,
  variantId: string,
  componentVariantIds?: string[]
): PlaceholdersData<string> | undefined {
  // Add (page-level) variantId to Sitecore context so that it is accessible here
  layout.sitecore.context.variantId = variantId;
  const placeholders = layout.sitecore.route?.placeholders;
  if (Object.keys(placeholders ?? {}).length === 0) {
    return;
  }
  if (placeholders) {
    Object.keys(placeholders).forEach((placeholder) => {
      placeholders[placeholder] = personalizePlaceholder(placeholders[placeholder], [
        variantId,
        ...(componentVariantIds || []),
      ]);
    });
  }
  return placeholders;
}

/**
 * @param {Array} components components within placeholder
 * @param {string[]} variantIds variant ids
 * @returns {Array<ComponentRendering | HtmlElementRendering>} components with personalization applied
 */
export function personalizePlaceholder(
  components: Array<ComponentRendering | HtmlElementRendering>,
  variantIds: string[]
): Array<ComponentRendering | HtmlElementRendering> {
  return components
    .map((component) => {
      const rendering = component as ComponentRendering;

      if ((rendering as ComponentRenderingWithExperiences).experiences !== undefined) {
        return personalizeComponent(rendering as ComponentRenderingWithExperiences, variantIds) as
          | ComponentRendering
          | HtmlElementRendering;
      } else if (rendering.placeholders) {
        const placeholders = rendering.placeholders as PlaceholdersData;

        Object.keys(placeholders).forEach((placeholder) => {
          placeholders[placeholder] = personalizePlaceholder(placeholders[placeholder], variantIds);
        });
      }

      return component;
    })
    .filter(Boolean);
}

/**
 * @param {ComponentRenderingWithExperiences} component component with experiences
 * @param {string[]} variantIds variant ids
 * @returns {ComponentRendering | null} component with personalization applied or null if hidden
 */
export function personalizeComponent(
  component: ComponentRenderingWithExperiences,
  variantIds: string[]
): ComponentRendering | null {
  // Check if we have a page/component experience matching any of the variants (there should be at most 1)
  const match = Object.keys(component.experiences).find((variantId) =>
    variantIds.includes(variantId)
  );
  const variant = match && component.experiences[match];
  if (variant === undefined && component.componentName === undefined) {
    // DEFAULT IS HIDDEN
    return null;
  } else if (variant && variant.componentName === null && variant.dataSource === null) {
    // VARIANT IS HIDDEN
    return null;
  } else if (variant) {
    component = variant;
  }

  // remove unused experiences from layout data
  if (component.experiences) {
    component.experiences = {};
  }

  if (!component.placeholders) return component;

  Object.keys(component?.placeholders).forEach((placeholder) => {
    if (component.placeholders) {
      component.placeholders[placeholder] = personalizePlaceholder(
        component.placeholders[placeholder],
        variantIds
      );
    }
  });

  return component;
}
