import { defineComponent, h } from 'vue';

export interface FieldShape {
  value?: string;
  editable?: string;
}

export type FormatterFunction = (date: Date | null) => any;

export interface DateProps {
  /** The date field data. */
  field: FieldShape;
  /**
   * The HTML element that will wrap the contents of the field.
   */
  tag?: string;
  /**
   * Can be used to explicitly disable inline editing.
   * If true and `field.editable` has a value, then `field.editable`
   * will be processed and rendered as component output.
   * If false, `field.editable` value will be ignored and not rendered.
   */
  editable?: boolean;
  /**
   * A function that receives the date field value as a parsed JavaScript Date object.
   * The return value will be rendered as child/children of the wrapping element of the component.
   */
  formatter?: FormatterFunction;
}

export const DateField = defineComponent({
  name: 'ScDateField',
  props: {
    field: {
      type: Object,
      required: true,
    },
    tag: {
      type: String,
      default: 'span',
    },
    editable: {
      type: Boolean,
      default: true,
    },
    formatter: {
      type: Function,
      default: undefined,
    },
  },
  render() {
    const { field, editable, formatter, tag } = this.$props;
    if (!field || (!field.editable && !field.value)) {
      return null;
    }

    // this.$data should be passed along to the
    // `createElement` function in order to retain attributes and events
    // https://v3.vuejs.org/guide/render-function.html#render-functions
    const data: { [key: string]: unknown } = { ...this.$data };

    let children;
    if (field.editable && editable) {
      data.innerHTML = field.editable;
    } else if (this.$slots && this.$slots.default) {
      // if default slot is defined, pass it the date value and use the output as the return value for the `render` function.
      // note: the output of the scoped slot _should_ be a VNode or VNode array.
      const output = this.$slots.default({ date: field.value ? new Date(field.value) : null });
      return output;
    } else if (formatter) {
      children = formatter(field.value ? new Date(field.value) : null);
    } else {
      children = field.value;
    }

    return h(tag || 'span', data, children);
  },
});
