import { defineComponent, provide } from 'vue';
import { ComponentFactory } from './sharedTypes';

export interface SitecoreContextProps {
  componentFactory: ComponentFactory;
}

// For an explanation of why `ThisTypedComponentOptionsWithRecordProps`
// is used here, see the `Placeholder.ts` component file.
export const SitecoreContext = defineComponent({
  props: {
    componentFactory: {
      // Hopefully this PR will negate having to cast the formatter prop
      // to PropOptions<any>: https://github.com/vuejs/vue/pull/6856
      type: Function,
      default: undefined,
    },
  },

  setup(props, context) {
    provide('injectedComponentFactory', props.componentFactory);
    return () => context.slots && context.slots.default();
  },
});
