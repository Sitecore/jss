import { h, defineComponent } from 'vue';

export interface TextProps {
  /** The text field data. */
  field: {
    value?: string | number;
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

export const Text = defineComponent({
  props: {
    field: { type: Object, required: true },
    tag: { type: String, default: 'span' },
    editable: { type: Boolean, default: true },
    encode: { type: Boolean, default: true },
  },
  render() {
    const { field, tag, editable, encode } = this.$props;
    if (!field || (!field.editable && (field.value === undefined || field.value === ''))) {
      return null;
    }

    // can't use editable value if we want to output unencoded
    const isEditable = !encode ? false : editable;

    const output = field.editable && isEditable ? field.editable : field.value;
    const setDangerously = (field.editable && isEditable) || !encode;

    // this.$data should be passed along to the
    // `createElement` function in order to retain attributes and events
    // https://v3.vuejs.org/guide/render-function.html#render-functions
    const data: any = { ...this.$data };

    let children = null;
    if (setDangerously) {
      data.innerHTML = output;
    } else {
      children = output;
    }

    return h(tag || 'span', data, children);
  },
});
