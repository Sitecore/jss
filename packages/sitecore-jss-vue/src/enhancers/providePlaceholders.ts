import { ComponentPublicInstance } from 'vue';
import {
  getDynamicComponentsFromRenderingData,
  getPlaceholderDataFromRenderingData,
} from '../components/PlaceholderCommon';
import { ComponentFactory } from '../components/sharedTypes';

export interface PlaceholderToPropMapping {
  /**
   * The name of the placeholder this component will expose
   */
  placeholder: string;
  /**
   * The name of the prop on your wrapped component that you would like the placeholder data injected on
   */
  computedPropName: string;
}

export type WithPlaceholderSpec =
  | (string | PlaceholderToPropMapping)
  | Array<string | PlaceholderToPropMapping>;

export interface WithPlaceholderOptions {
  componentFactory?: ComponentFactory;
}

/**
 * @param {Vue} vm
 * @param {ComponentFactory} [componentFactory]
 */
export function providePlaceholders(
  vm: ComponentPublicInstance,
  componentFactory?: ComponentFactory
) {
  const instanceOptions = vm.$options;
  const propsData: any = vm.$props;
  if (
    typeof instanceOptions.withPlaceholder === 'undefined' ||
    typeof propsData === 'undefined' ||
    typeof propsData.rendering === 'undefined'
  ) {
    return;
  }

  // Initialize the computed option if it hasn't already been initialized.
  if (typeof vm.$options.computed === 'undefined') {
    // eslint-disable-next-line no-param-reassign
    vm.$options.computed = {};
  }

  const { placeholders, options } =
    typeof instanceOptions.withPlaceholder === 'function'
      ? instanceOptions.withPlaceholder()
      : instanceOptions.withPlaceholder;

  const renderingData = propsData.rendering;

  const definitelyArrayPlaceholders = !Array.isArray(placeholders) ? [placeholders] : placeholders;

  const computedProps: { [key: string]: any } = definitelyArrayPlaceholders.reduce(
    (result: { [key: string]: any }, placeholderDefinition: any) => {
      const placeholderName = placeholderDefinition.placeholder
        ? placeholderDefinition.placeholder
        : placeholderDefinition;
      const computedPropName = placeholderDefinition.computedPropName
        ? placeholderDefinition.computedPropName
        : placeholderDefinition;

      const placeholderData = getPlaceholderDataFromRenderingData(renderingData, placeholderName);
      if (placeholderData) {
        Object.defineProperty(result, computedPropName, {
          get: function() {
            return getDynamicComponentsFromRenderingData(
              placeholderData,
              { ...propsData, ...vm.$attrs },
              (options && options.componentFactory) || componentFactory
            );
          },
          enumerable: true,
        });
      }
      return result;
    },
    {}
  );

  vm.$options.computed = {
    ...vm.$options.computed,
    ...computedProps,
  };
}
