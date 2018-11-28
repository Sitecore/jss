import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue';

export interface MissingComponentProps {
  rendering?: {
    componentName?: string;
  };
}

export const MissingComponent: FunctionalComponentOptions<MissingComponentProps> = {
  functional: true,
  props: {
    rendering: {
      type: Object,
    },
  },
  render(createElement: CreateElement, context: RenderContext) {
    const { rendering } = context.props;
    const componentName =
      rendering && rendering.componentName ? rendering.componentName : 'Unnamed Component';

    console.log(`Component props for unimplemented '${componentName}' component`, context.props);

    return createElement(
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
        createElement('h2', componentName),
        createElement(
          'p',
          'JSS component is missing Vue implementation. See the developer console for more information.'
        ),
      ]
    );
  },
};
