import { defineComponent, h, PropType } from 'vue';

export interface FileFieldValue {
  [propName: string]: any;
  src?: string;
  title?: string;
  displayName?: string;
}

export interface FileField {
  value: FileFieldValue;
}

export const File = defineComponent({
  name: 'ScFileField',
  inheritAttrs: false,
  props: {
    /** The file field data. */
    field: {
      type: Object as PropType<FileFieldValue | FileField>,
      default() {
        return {} as FileFieldValue | FileField;
      },
      required: true,
    },
  },
  render() {
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
    // this.$data should be passed along to the
    // `createElement` function in order to retain attributes and events
    // https://v3.vuejs.org/guide/render-function.html#render-functions
    const data = { ...this.$data, ...this.$attrs, href: file.src };
    return h('a', data, linkText);
  },
});
