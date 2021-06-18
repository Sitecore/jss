import { h, defineComponent, PropType } from 'vue';

export const RichText = defineComponent({
  props: {
    /** The rich text field data. */
    field: {
      type: Object as PropType<{
        value?: string;
        editable?: string;
      }>,
      default() {
        return {} as {
          value?: string;
          editable?: string;
        };
      },
      required: true,
    },
    /**
     * The HTML element that will wrap the contents of the field.
     */
    tag: { type: String, default: 'div' },
    /**
     * Can be used to explicitly disable inline editing.
     * If true and `field.editable` has a value, then `field.editable` will
     * be processed and rendered as component output.
     * If false, `field.editable` value will be ignored and not rendered.
     */
    editable: { type: Boolean, default: true },
  },
  render() {
    const { field, tag, editable } = this.$props;
    if (!field || (!field.editable && !field.value)) {
      return null;
    }

    // this.$data should be passed along to the
    // `createElement` function in order to retain attributes and events
    // https://v3.vuejs.org/guide/render-function.html#render-functions
    const data = {
      ...this.$data,
      innerHTML: field.editable && editable ? field.editable : field.value,
    };

    return h(tag || 'div', data);
  },
});
