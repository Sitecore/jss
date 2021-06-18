import { defineComponent, provide, PropType } from 'vue';
import { ComponentFactory } from './sharedTypes';

export interface SitecoreContextProps {
  componentFactory: ComponentFactory;
}

export const SitecoreContext = defineComponent({
  props: {
    componentFactory: {
      type: Function as PropType<ComponentFactory>,
      default: undefined,
    },
  },

  setup(props, context) {
    provide('injectedComponentFactory', props.componentFactory);
    return () => context.slots && context.slots.default();
  },
});
