import { h, defineComponent } from 'vue';

export interface RichTextProps {
  /** The rich text field data. */
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
   * be processed and rendered as component output.
   * If false, `field.editable` value will be ignored and not rendered.
   */
  editable?: boolean;
}

export const RichText = defineComponent({
  props: {
    field: { type: Object, required: true },
    tag: { type: String, default: 'div' },
    editable: { type: Boolean, default: true },
  },
  // Need to assign `any` return type because Vue type definitions are inaccurate.
  // The Vue type definitions set `render` to a return type of VNode and that's it.
  // However, it is possible to return null | string | VNode[] | VNodeChildrenArrayContents.
  render(): any {
    const { field, tag, editable } = this.$props;
    if (!field || (!field.editable && !field.value)) {
      return null;
    }

    // in functional components, context.data should be passed along to the
    // `createElement` function in order to retain attributes and events
    // https://vuejs.org/v2/guide/render-function.html#Passing-Attributes-and-Events-to-Child-Elements-Components
    const data = {
      ...this.$data,
      innerHTML: field.editable && editable ? field.editable : field.value,
    };

    return h(tag || 'div', data);
  },
});
