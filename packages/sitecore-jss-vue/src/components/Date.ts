import { CreateElement, FunctionalComponentOptions, PropOptions, RenderContext } from 'vue';

export interface FieldShape {
  value?: string;
  editable?: string;
}

export type FormatterFunction = (date: Date | null, createElement: CreateElement) => any;

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

export const DateField: FunctionalComponentOptions<DateProps> = {
  name: 'ScDateField',
  functional: true,
  props: {
    field: {
      type: Object,
      required: true,
    },
    tag: {
      type: String,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    // Hopefully this PR will negate having to cast the formatter prop
    // to PropOptions<any>: https://github.com/vuejs/vue/pull/6856
    formatter: {
      type: Function,
      default: undefined,
    } as PropOptions<any>,
  },

  // Need to assign `any` return type because Vue type definitions are inaccurate.
  // The Vue type definitions set `render` to a return type of VNode and that's it.
  // However, it is possible to return null | string | VNode[] | VNodeChildrenArrayContents.
  render(createElement: CreateElement, context: RenderContext): any {
    const { field, editable, formatter, tag } = context.props;

    if (!field || (!field.editable && !field.value)) {
      return null;
    }

    // In functional components, context.data should be passed along to the
    // `createElement` function in order to retain attributes and events
    // https://vuejs.org/v2/guide/render-function.html#Passing-Attributes-and-Events-to-Child-Elements-Components
    const data = { ...context.data };

    let children;
    if (field.editable && editable) {
      data.domProps = { ...data.domProps, innerHTML: field.editable };
    } else if (context.data.scopedSlots && context.data.scopedSlots.default) {
      // if default slot is defined, pass it the date value and use the output as the return value for the `render` function.
      // note: the output of the scoped slot _should_ be a VNode or VNode array.
      const output = context.data.scopedSlots.default(field.value ? new Date(field.value) : null);
      return output;
    } else if (formatter) {
      children = formatter(field.value ? new Date(field.value) : null, createElement);
    } else {
      children = field.value;
    }

    return createElement(tag || 'span', data, children);
  },
};
