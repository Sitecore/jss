import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue';

export interface TextProps {
  /** The text field data. */
  field: {
    value?: string;
    editable?: string;
  };
  /**
   * The HTML element that will wrap the contents of the field.
   */
  tag?: string;
  /**
   * Can be used to explicitly disable inline editing.
   * If true and `field.editable` has a value, then `field.editable` will
   * be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.
   */
  editable?: boolean;
  /**
   * If false, HTML-encoding of the field value is disabled and the value is rendered as-is.
   */
  encode?: boolean;
}

export const Text: FunctionalComponentOptions<TextProps> = {
  functional: true,
  props: {
    field: { type: Object, required: true },
    tag: { type: String, default: 'span' },
    editable: { type: Boolean, default: true },
    encode: { type: Boolean, default: true },
  },

  // Need to assign `any` return type because Vue type definitions are inaccurate.
  // The Vue type definitions set `render` to a return type of VNode and that's it.
  // However, it is possible to return null | string | VNode[] | VNodeChildrenArrayContents.
  render(createElement: CreateElement, context: RenderContext): any {
    const { field, tag, editable, encode } = context.props;
    if (!field || (!field.editable && !field.value)) {
      return null;
    }

    // can't use editable value if we want to output unencoded
    const isEditable = !encode ? false : editable;

    const output = field.editable && isEditable ? field.editable : field.value;
    const setDangerously = (field.editable && isEditable) || !encode;

    // in functional components, context.data should be passed along to the
    // `createElement` function in order to retain attributes and events
    // https://vuejs.org/v2/guide/render-function.html#Passing-Attributes-and-Events-to-Child-Elements-Components
    const data = { ...context.data };

    let children = null;
    if (setDangerously) {
      data.domProps = { ...context.data.domProps, innerHTML: output };
    } else {
      children = output;
    }

    return createElement(tag || 'span', data, children);
  },
};
