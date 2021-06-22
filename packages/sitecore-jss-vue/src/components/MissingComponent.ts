import { h, defineComponent, PropType } from 'vue';

export const MissingComponent = defineComponent({
  props: {
    rendering: {
      type: Object as PropType<{
        componentName?: string;
      }>,
      default() {
        return undefined as {
          componentName?: string;
        };
      },
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
