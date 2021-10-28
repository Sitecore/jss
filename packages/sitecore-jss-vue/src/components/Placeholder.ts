import { defineComponent, h, ref, onErrorCaptured, inject, getCurrentInstance } from 'vue';
import { ComponentRendering, RouteData, Field, Item } from '@sitecore-jss/sitecore-jss/layout';
import {
  convertVNodesToDynamicComponents,
  getPlaceholderDataFromRenderingData,
  getVNodesForRenderingData,
  PlaceholderProps,
} from './PlaceholderCommon';
import { ComponentFactory } from './sharedTypes';

export { PlaceholderProps };

export const Placeholder = defineComponent({
  name: 'Placeholder',

  inheritAttrs: false,

  /**
   * @type {PlaceholderProps} see PlaceholderCommon.js
   */
  props: {
    name: {
      type: String,
      required: true,
    },
    rendering: {
      type: Object as () => ComponentRendering | RouteData,
      required: true,
    },
    componentFactory: {
      type: Object as () => ComponentFactory,
      default: undefined,
    },
    fields: {
      type: Object as () => {
        [name: string]: Field | Item[];
      },
      default: undefined,
    },
    params: {
      type: Object as () => {
        [name: string]: string;
      },
      default: undefined,
    },
    missingComponentComponent: {
      type: Object,
      default: undefined,
    },
    hiddenRenderingComponent: {
      type: Object,
      default: undefined,
    },
    errorComponent: {
      type: Object,
      default: undefined,
    },
  },
  setup(props, context) {
    const instance = getCurrentInstance();
    const injectedComponentFactory = inject<ComponentFactory>('injectedComponentFactory', null);
    const error = ref<Error>();

    onErrorCaptured((err: unknown) => {
      error.value = err as Error;
    });

    const resolveComponentFactory = (): ComponentFactory | undefined => {
      // componentFactory precedence:
      // 1. get from props if defined
      // 2. get from `inject` (via provide/inject) if defined
      // 3. get from Vue instance `$jss` property (via plugin or other global attachment) if defined
      return (
        props.componentFactory ||
        injectedComponentFactory ||
        (instance &&
          instance.appContext.config.globalProperties.$jss &&
          instance.appContext.config.globalProperties.$jss.componentFactory) ||
        undefined
      );
    };

    const childProps: PlaceholderProps = {
      ...props,
      ...context.attrs,
    } as PlaceholderProps;
    delete childProps.componentFactory;

    if (error.value) {
      if (props.errorComponent) {
        return () =>
          h(props.errorComponent, {
            props: { error: error.value },
          });
      }

      return () => h('div', { class: 'sc-jss-placeholder-error' }, error.value.toString());
    }

    const placeholderData = getPlaceholderDataFromRenderingData(props.rendering as any, props.name);

    const componentFactory = resolveComponentFactory();

    const vnodes = getVNodesForRenderingData(placeholderData, childProps, componentFactory);

    // The use of scoped slots are conceptually similar to render props in React.
    // In the case of the placeholder component, we pass component definitions to the default slot
    // and let the slot determine how to render the Placeholder.
    const scopedSlots = context.slots;
    if (scopedSlots.default) {
      // Scoped slots in templated components are not capable of directly rendering Vue VNodes.
      // Therefore, we "convert" the vnodes to simple functional components that render the vnode but allow
      // templated components to iterate and declaritively add <component /> elements to the template.
      // Developers are then able to use the ":is" attribute to render dynamic components in a template: https://v3.vuejs.org/api/special-attributes.html#is
      const components = convertVNodesToDynamicComponents(vnodes);
      const isEmpty = components.every((component) =>
        component.isxEditorComponent ? true : false
      );
      return () => scopedSlots.default({ components, isEmpty });
    }
    // Otherwise, if no default scoped slot is defined, assume "normal" rendering of the VNodes that were created from rendering data.
    return () => (vnodes && vnodes.length > 0 ? vnodes : null);
  },
});
