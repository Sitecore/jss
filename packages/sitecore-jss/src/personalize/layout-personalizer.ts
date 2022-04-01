import { LayoutServiceData, ComponentRendering, HtmlElementRendering } from './../layout/models';

// NULL means Hidden by this experience
export type ComponentRenderingWithExperiences = ComponentRendering & {
  experiences: { [name: string]: ComponentRenderingWithExperiences | null };
};

/**
 * recursively go through all placeholders/components, check experiences nodes and replace default with object from specific experience
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
  return components.map((component) =>
    ((component as unknown) as ComponentRenderingWithExperiences).experiences !== undefined
      ? (personalizeComponent(
          (component as unknown) as ComponentRenderingWithExperiences,
          segment
        ) as ComponentRendering | HtmlElementRendering)
      : ((component as unknown) as ComponentRenderingWithExperiences)
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
