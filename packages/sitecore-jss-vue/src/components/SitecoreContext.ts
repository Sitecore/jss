import { defineComponent, PropType } from 'vue';
import { ComponentFactory } from './sharedTypes';

export interface SitecoreContextProps {
  componentFactory: ComponentFactory;
}

export const SitecoreContext = defineComponent({
  provide() {
    return {
      injectedComponentFactory: this.componentFactory,
    };
  },
  props: {
    componentFactory: {
      type: Function as PropType<ComponentFactory>,
      default: undefined,
    },
  },

  setup(_props, context) {
    return () => context.slots && context.slots.default();
  },
});
