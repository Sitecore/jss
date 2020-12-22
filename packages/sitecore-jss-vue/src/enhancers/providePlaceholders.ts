import Vue from 'vue';
import { DefaultComputed } from 'vue/types/options';
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

declare module 'vue/types/options' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ComponentOptions<V extends Vue> {
    withPlaceholder?:
      | (() => {
          placeholders: WithPlaceholderSpec;
          options?: WithPlaceholderOptions;
        })
      | {
          placeholders: WithPlaceholderSpec;
          options?: WithPlaceholderOptions;
        };
  }
}

/**
 * @param {Vue} vm
 * @param {ComponentFactory} [componentFactory]
 */
export function providePlaceholders(vm: Vue, componentFactory?: ComponentFactory) {
  const instanceOptions = vm.$options;
  const propsData: any = instanceOptions.propsData;
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

  const computedProps: DefaultComputed = definitelyArrayPlaceholders.reduce(
    (result: DefaultComputed, placeholderDefinition: any) => {
      const placeholderName = placeholderDefinition.placeholder
        ? placeholderDefinition.placeholder
        : placeholderDefinition;
      const computedPropName = placeholderDefinition.computedPropName
        ? placeholderDefinition.computedPropName
        : placeholderDefinition;

      const placeholderData = getPlaceholderDataFromRenderingData(renderingData, placeholderName);
      if (placeholderData) {
        // eslint-disable-next-line no-param-reassign
        result[computedPropName] = {
          get() {
            return getDynamicComponentsFromRenderingData(
              placeholderData,
              { ...propsData, ...vm.$attrs },
              vm.$createElement,
              (options && options.componentFactory) || componentFactory
            );
          },
        };
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
