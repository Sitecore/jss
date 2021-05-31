import { defineComponent, h, ref, onErrorCaptured, inject, getCurrentInstance } from 'vue';
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

export const Placeholder = defineComponent({
  name: 'Placeholder',

  inheritAttrs: false,

  props: {
    name: {
      type: String,
      required: true,
    } as any,
    rendering: {
      type: Object,
      required: true,
    } as any,
    componentFactory: {
      // Hopefully this PR will negate having to cast the formatter prop
      // to PropOptions<any>: https://github.com/vuejs/vue/pull/6856
      type: Function,
      default: undefined,
    } as any,
    fields: {
      type: Object,
      default: undefined,
    } as any,
    params: {
      type: Object,
      default: undefined,
    } as any,
    missingComponentComponent: {
      type: Object,
      default: undefined,
    } as any,
    errorComponent: {
      type: Object,
      default: undefined,
    } as any,
  },
  setup(props, context) {
    const instance = getCurrentInstance();
    const injectedComponentFactory = inject('injectedComponentFactory', null);
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
      // Developers are then able to use the ":is" attribute to render dynamic components in a template: https://vuejs.org/v2/api/#is
      const components = convertVNodesToDynamicComponents(vnodes);
      const isEmpty = components.every((component) =>
        component.isxEditorComponent ? true : false
      );
      return () => scopedSlots.default({ components, isEmpty });
    }
    // Otherwise, if no default scoped slot is defined, assume "normal" rendering of the VNodes that were created from rendering data.
    return () => (vnodes && vnodes.length > 0 ? h('div', {}, vnodes) : null);
  },
});
