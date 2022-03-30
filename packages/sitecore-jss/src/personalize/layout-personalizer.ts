import { LayoutServiceData, ComponentRendering, HtmlElementRendering } from './../layout/models';

// NULL means Hidden by this experience
export type ComponentRenderingWithExperiences = ComponentRendering & {
  experiences: { [name: string]: ComponentRenderingWithExperiences | null };
};

// recursive go through all placeholders/components and check experiences node, replace default with object from specific experience
/**
 * @param {LayoutServiceData} layout Layout data
 * @param {string} segment segmentId
 */
export function personalizeLayout(layout: LayoutServiceData, segment: string): void {
  const placeholders = layout.sitecore.route?.placeholders;
  if (Object.keys(placeholders ?? {}).length === 0) {
    return;
  }
  if (placeholders) {
    Object.keys(placeholders).forEach((placeholder) => {
      placeholders[placeholder] = personalizePlaceholder(placeholders[placeholder], segment);
    });
  }
}

/**
 * @param {Array} components components within placeholder
 * @param {string} segment segmentId
 */
export function personalizePlaceholder(
  components: Array<ComponentRendering | HtmlElementRendering>,
  segment: string
): Array<ComponentRendering | HtmlElementRendering> {
  return components.map((_, i) =>
    (<ComponentRenderingWithExperiences>components[i]).experiences !== undefined
      ? (personalizeComponent(<ComponentRenderingWithExperiences>components[i], segment) as
          | ComponentRendering
          | HtmlElementRendering)
      : components[i]
  );
}

/**
 * @param {ComponentRenderingWithExperiences} component component with experiences
 * @param {string} segment segmentId
 */
export function personalizeComponent(
  component: ComponentRenderingWithExperiences,
  segment: string
): ComponentRendering | null {
  const segmentVariant = component.experiences[segment];
  if (segmentVariant === undefined && component.componentName === undefined) {
    // DEFAULT IS HIDDEN
    return null;
  } else if (Object.keys(segmentVariant ?? {}).length === 0) {
    // HIDDEN
    return null;
  } else if (segmentVariant) {
    component = segmentVariant;
  }

  if (!component.placeholders) return component;

  Object.keys(component?.placeholders).forEach((placeholder) => {
    if (component.placeholders) {
      component.placeholders[placeholder] = personalizePlaceholder(
        component.placeholders[placeholder],
        segment
      );
    }
  });

  return component;
}
