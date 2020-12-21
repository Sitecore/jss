import Vue, { PropOptions } from 'vue';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';
import { ComponentFactory } from './sharedTypes';

export interface SitecoreContextProps {
  componentFactory: ComponentFactory;
}

// For an explanation of why `ThisTypedComponentOptionsWithRecordProps`
// is used here, see the `Placeholder.ts` component file.
export const SitecoreContext: ThisTypedComponentOptionsWithRecordProps<
  Vue,
  any,
  any,
  any,
  SitecoreContextProps
> = {
  props: {
    componentFactory: {
      // Hopefully this PR will negate having to cast the formatter prop
      // to PropOptions<any>: https://github.com/vuejs/vue/pull/6856
      type: Function,
      default: undefined,
    } as PropOptions<any>,
  },

  provide() {
    return {
      injectedComponentFactory: this.componentFactory,
    };
  },

  render(): any {
    return this.$slots && this.$slots.default[0];
  },
};
