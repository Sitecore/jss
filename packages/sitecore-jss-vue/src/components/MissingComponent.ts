import { h, defineComponent } from 'vue';

export interface MissingComponentProps {
  rendering?: {
    componentName?: string;
  };
}

export const MissingComponent = defineComponent({
  functional: true,
  props: {
    rendering: {
      type: Object,
      default: undefined,
    },
  },
  render() {
    const { rendering } = this.$props;
    const componentName =
      rendering && rendering.componentName ? rendering.componentName : 'Unnamed Component';

    console.log(`Component props for unimplemented '${componentName}' component`, this.$props);

    return h(
      'div',
      {
        style: {
          background: 'darkorange',
          outline: '5px solid orange',
          padding: '10px',
          color: 'white',
          maxWidth: '500px',
        },
      },
      [
        h('h2', componentName),
        h(
          'p',
          'JSS component is missing Vue implementation. See the developer console for more information.'
        ),
      ]
    );
  },
});
