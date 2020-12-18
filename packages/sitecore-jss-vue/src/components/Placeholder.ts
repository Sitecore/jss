import Vue, { CreateElement, PropOptions } from 'vue';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';

import {
  convertVNodesToDynamicComponents,
  getPlaceholderDataFromRenderingData,
  getVNodesForRenderingData,
  PlaceholderProps,
} from './PlaceholderCommon';
import { ComponentFactory } from './sharedTypes';

export { PlaceholderProps };

// Using `ThisTypedComponentOptionsWithRecordProps` seems to be a bit
// unconventional in the Vue/TS realm. However, after using the two
// "recommended" approaches - Vue.extend() or class decorators
// via `vue-class-component` and `vue-property-decorator` - as well as
// some experimentation with the VueConstructor type, this was the only
// way I found to compile AND generate sensible typings.

// Using Vue.extend() somewhat worked, but the compiler didn't like
// the use of properties defined in the `inject` property, e.g.
// `this.injectedComponentFactory`. The error was that the property
// doesn't exist on the type returned by Vue.extend(), `CombinedVueInstance`.
// There's probably an easy way around that, but I tried several
// different approaches but couldn't find the winning declaration.
// This approach in particular was promising: export const Placeholder = (Vue as VueConstructor<Vue>).extend()
// But the generated typings seemed wrong, similar to the typings mentioned
// in the next paragraph.

// Using the class/prop decorators from the libraries mentioned above
// resulted in typings that included non-"prop" properties like
// the `data` properties, `methods` and the `render` function.
// None of which seem particularly relevant to consumers, but I could be wrong about that.
// However, the biggest issue was that using the decorators also changed the compiled code
// and actually _broke_ usage of `this.$jss` in instance methods.
// I didn't dig too deeply into why, but I suspect it's because
// the compiled code attaches methods to the `Placeholder` prototype.
// And `this` within the prototype only referenced a Vue instance,
// but not the global Vue instance that had plugin properties defined.
// Other plugin properties besides `$jss` were also "missing",
// e.g. $router, $apollo

export const Placeholder: ThisTypedComponentOptionsWithRecordProps<
Vue,
any,
any,
any,
PlaceholderProps
> = {
  name: 'Placeholder',

  inheritAttrs: false,

  props: {
    name: {
      type: String,
      required: true,
    },
    rendering: {
      type: Object,
      required: true,
    },
    componentFactory: {
      // Hopefully this PR will negate having to cast the formatter prop
      // to PropOptions<any>: https://github.com/vuejs/vue/pull/6856
      type: Function,
      default: undefined,
    } as PropOptions<any>,
    fields: {
      type: Object,
      default: undefined,
    },
    params: {
      type: Object,
      default: undefined,
    },
    missingComponentComponent: {
      type: Object,
      default: undefined,
    } as PropOptions<any>,
    errorComponent: {
      type: Object,
      default: undefined,
    } as PropOptions<any>,
  },

  // provide / inject does not work with functional components
  // in other words, SitecoreContext and Placeholder cannot be functional
  inject: {
    injectedComponentFactory: {
      type: Function,
      default: undefined,
    } as PropOptions<any>,
  },

  data() {
    return {
      error: null as Error | null,
    };
  },

  methods: {
    resolveComponentFactory(): ComponentFactory | undefined {
      // componentFactory precedence:
      // 1. get from props if defined
      // 2. get from `inject` (via provide/inject) if defined
      // 3. get from Vue instance `$jss` property (via plugin or other global attachment) if defined
      return (
        this.$props.componentFactory ||
        this.injectedComponentFactory ||
        (this.$jss && this.$jss.componentFactory) ||
        undefined
      );
    },
  },

  render(createElement: CreateElement): any {
    const childProps: PlaceholderProps = {
      ...this.$props,
      ...this.$attrs,
    } as PlaceholderProps;
    delete childProps.componentFactory;

    if (this.error) {
      if (this.$props.errorComponent) {
        return createElement(this.$props.errorComponent, {
          props: { error: this.error },
        });
      }

      return createElement('div', { class: 'sc-jss-placeholder-error' }, this.error.toString());
    }

    const placeholderData = getPlaceholderDataFromRenderingData(this.rendering, this.name);

    const componentFactory = this.resolveComponentFactory();

    const vnodes = getVNodesForRenderingData(
      placeholderData,
      childProps,
      createElement,
      componentFactory
    );

    // The use of scoped slots are conceptually similar to render props in React.
    // In the case of the placeholder component, we pass component definitions to the default slot
    // and let the slot determine how to render the Placeholder.
    const scopedSlots = this.$scopedSlots;
    if (scopedSlots.default) {
      // Scoped slots in templated components are not capable of directly rendering Vue VNodes.
      // Therefore, we "convert" the vnodes to simple functional components that render the vnode but allow
      // templated components to iterate and declaritively add <component /> elements to the template.
      // Developers are then able to use the ":is" attribute to render dynamic components in a template: https://vuejs.org/v2/api/#is
      const components = convertVNodesToDynamicComponents(vnodes);
      const isEmpty = components.every(
        (component) => (component.isxEditorComponent ? true : false)
      );
      return scopedSlots.default({ components, isEmpty });
    }
    // Otherwise, if no default scoped slot is defined, assume "normal" rendering of the VNodes that were created from rendering data.
    return vnodes && vnodes.length > 0 ? createElement('div', {}, vnodes) : null;
  },
  errorCaptured(error) {
    this.error = error;
  },
};
