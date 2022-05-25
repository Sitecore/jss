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
  mounted() {
    this.bindRouteLinks();
  },
  methods: {
    /**
     * Click handler for links.
     * @param {MouseEvent} event - event emmited by clicking the link
     */
    routeHandler(event: MouseEvent): void {
      event.preventDefault();
      let target = event.target as HTMLAnchorElement;
      /**
       * If the target is not the anchor itself we set the target
       * to be the closest anchor parent element
       */
      if (!target.pathname) {
        target = target.closest('a') as HTMLAnchorElement;
      }

      const destination = target.hash ? `${target.pathname}${target.hash}` : target.pathname;

      this.$router.push(destination);
    },
    /**
     * Extracts anchor elements and adds a custom click event
     * listener to prevent page refresh.
     */
    bindRouteLinks() {
      const hasText = this.$props.field && this.$props.field?.value;
      const isEditing = this.$props.editable && this.$props.field?.editable;

      if (hasText && !isEditing) {
        // selects all links that start with '/'
        const internalLinks = this.$el.querySelectorAll('a[href^="/"]') as NodeListOf<
          HTMLAnchorElement
        >;

        // Remove old and add new click event listener
        internalLinks.forEach((link) => {
          link.removeEventListener('click', this.routeHandler, false);
          link.addEventListener('click', this.routeHandler, false);
        });
      }
    },
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
