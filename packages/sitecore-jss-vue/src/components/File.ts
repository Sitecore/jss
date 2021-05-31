import { defineComponent, h } from 'vue';

export interface FileFieldValue {
  [propName: string]: any;
  src?: string;
  title?: string;
  displayName?: string;
}

export interface FileField {
  value: FileFieldValue;
}

export interface FileProps {
  /** The file field data. */
  field: FileFieldValue | FileField;
}

export const File = defineComponent({
  name: 'ScFileField',
  inheritAttrs: false,
  props: {
    field: {
      type: Object,
      required: true,
    },
  },

  // Need to assign `any` return type because Vue type definitions are inaccurate.
  // The Vue type definitions set `render` to a return type of VNode and that's it.
  // However, it is possible to return null | string | VNode[] | VNodeChildrenArrayContents.
  render(): any {
    const { field } = this.$props;

    /*
    File fields cannot be managed via the EE. We never output "editable."
  */
    if (!field || (!field.value && !(field as FileFieldValue).src)) {
      return null;
    }

    // handle link directly on field for forgetful devs
    const file = (field as FileFieldValue).src ? field : field.value;
    if (!file) {
      return null;
    }

    if (this.$slots && this.$slots.default) {
      return this.$slots.default(file);
    }

    const linkText = file.title || file.displayName;
    // in functional components, context.data should be passed along to the
    // `createElement` function in order to retain attributes and events
    // https://vuejs.org/v2/guide/render-function.html#Passing-Attributes-and-Events-to-Child-Elements-Components
    const data = { ...this.$data, ...this.$attrs, href: file.src };
    return h('a', data, linkText);
  },
});
