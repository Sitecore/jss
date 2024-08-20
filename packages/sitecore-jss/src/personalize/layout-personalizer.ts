import { HIDDEN_RENDERING_NAME } from '../constants';
import {
  LayoutServiceData,
  ComponentRendering,
  HtmlElementRendering,
  PlaceholdersData,
  EditMode,
} from './../layout/models';

const transformToHiddenRenderingVariant = (
  component: ComponentRendering | HtmlElementRendering
) => ({
  ...component,
  componentName: HIDDEN_RENDERING_NAME,
  experiences: {},
});

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
  const metadataEditing =
    layout.sitecore.context.pageEditing && layout.sitecore.context.editMode === EditMode.Metadata;
  if (placeholders) {
    Object.keys(placeholders).forEach((placeholder) => {
      placeholders[placeholder] = personalizePlaceholder(
        placeholders[placeholder],
        [variantId, ...(componentVariantIds || [])],
        metadataEditing
      );
    });
  }
  return placeholders;
}

/**
 * @param {Array} components components within placeholder
 * @param {string[]} variantIds variant ids
 * @param {boolean} metadataEditing indicates if page is rendered in metadata edit mode
 * @returns {Array<ComponentRendering | HtmlElementRendering>} components with personalization applied
 */
export function personalizePlaceholder(
  components: Array<ComponentRendering | HtmlElementRendering>,
  variantIds: string[],
  metadataEditing?: boolean
): Array<ComponentRendering | HtmlElementRendering> {
  return components
    .map((component) => {
      const rendering = component as ComponentRendering;

      if ((rendering as ComponentRenderingWithExperiences).experiences !== undefined) {
        return personalizeComponent(
          rendering as ComponentRenderingWithExperiences,
          variantIds,
          metadataEditing
        ) as ComponentRendering | HtmlElementRendering;
      } else if (rendering.placeholders) {
        const placeholders = rendering.placeholders as PlaceholdersData;

        Object.keys(placeholders).forEach((placeholder) => {
          placeholders[placeholder] = personalizePlaceholder(
            placeholders[placeholder],
            variantIds,
            metadataEditing
          );
        });
      }

      return component;
    })
    .filter(Boolean);
}

/**
 * @param {ComponentRenderingWithExperiences} component component with experiences
 * @param {string[]} variantIds variant ids
 * @param {boolean} metadataEditing indicates if page is rendered in metadata edit mode
 * @returns {ComponentRendering | null} component with personalization applied or null if hidden
 */
export function personalizeComponent(
  component: ComponentRenderingWithExperiences,
  variantIds: string[],
  metadataEditing?: boolean
): ComponentRendering | null {
  // Check if we have a page/component experience matching any of the variants (there should be at most 1)
  const match = Object.keys(component.experiences).find((variantId) =>
    variantIds.includes(variantId)
  );
  const variant = match && component.experiences[match];

  // variant and componentName can be undefined or null
  if (!variant && !component.componentName) {
    // DEFAULT IS HIDDEN
    if (metadataEditing) {
      component = transformToHiddenRenderingVariant(component);
    } else {
      return null;
    }
  } else if (variant && variant.componentName === null && variant.dataSource === null) {
    // VARIANT IS HIDDEN
    if (metadataEditing) {
      component = transformToHiddenRenderingVariant(component);
    } else {
      return null;
    }
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
