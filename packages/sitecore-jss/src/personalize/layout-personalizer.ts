import { LayoutServiceData, ComponentRendering, HtmlElementRendering } from './../layout/models';

// NULL means Hidden by this experience
export type ComponentRenderingWithExpiriences = ComponentRendering & {
  experiences: { [name: string]: ComponentRenderingWithExpiriences | null };
};

// recursive go through all placeholders/components and check experiences node, replace default with object from specific experience
/**
 * @param {LayoutServiceData} layout Layout data
 * @param {string} segment segmentId
 */
export function personalizeLayout(layout: LayoutServiceData, segment: string): void {
  const placeholders = layout.sitecore.route?.placeholders;
  if (!placeholders) {
    return;
  }
  Object.keys(placeholders).forEach((placeholder) => {
    placeholders[placeholder] = personalizePlaceholder(placeholders[placeholder], segment);
  });
}

/**
 * @param {Array} components components within placeholder
 * @param {string} segment segmentId
 */
export function personalizePlaceholder(
  components: Array<ComponentRendering | HtmlElementRendering>,
  segment: string
): Array<ComponentRendering | HtmlElementRendering> {
  const newComponents = new Array<ComponentRendering | HtmlElementRendering>();
  for (let i = 0; i < components.length; i++) {
    if ((<ComponentRenderingWithExpiriences>components[i]).experiences !== undefined) {
      const personalizedComponent = personalizeComponent(
        <ComponentRenderingWithExpiriences>components[i],
        segment
      );
      if (personalizedComponent) {
        newComponents.push(personalizedComponent);
      }
    } else {
      newComponents.push(components[i]);
    }
  }
  return newComponents;
}

/**
 * @param {ComponentRenderingWithExpiriences} component component with experiences
 * @param {string} segment segmentId
 */
export function personalizeComponent(
  component: ComponentRenderingWithExpiriences,
  segment: string
): ComponentRendering | null {
  const segmentVariant = component.experiences[segment];
  if (segmentVariant === null) {
    // HIDDEN
    return null;
  } else if (segmentVariant === undefined && component.componentName === undefined) {
    // DEFAULT IS HIDDEN
    return null;
  } else if (segmentVariant) {
    component = segmentVariant;
  }

  if (component.placeholders) {
    Object.keys(component.placeholders).forEach((placeholder) => {
      if (component.placeholders) {
        component.placeholders[placeholder] = personalizePlaceholder(
          component.placeholders[placeholder],
          segment
        );
      }
    });
  }

  return component;
}
