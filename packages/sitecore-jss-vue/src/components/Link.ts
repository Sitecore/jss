import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue';

export interface LinkFieldValue {
  [attributeName: string]: any;
  href?: string;
  className?: string;
  title?: string;
  target?: string;
}

export interface LinkField {
  value: LinkFieldValue;
  editableFirstPart?: string;
  editableLastPart?: string;
}

export interface LinkProps {
  /** The link field data. */
  field: LinkField | LinkFieldValue;
  /**
   * Can be used to explicitly disable inline editing.
   * If true and `field.editable` has a value,
   * then `field.editable` will be processed and rendered as
   * component output. If false, `field.editable` value will be ignored and not rendered.
   */
  editable?: boolean;

  /**
   * Displays a link text ('description' in Sitecore) even when children exist
   * NOTE: when in Sitecore Experience Editor, this setting is ignored due to technical limitations, and the description is always rendered.
   */
  showLinkTextWithChildrenPresent?: boolean;
}

export const Link: FunctionalComponentOptions<LinkProps> = {
  functional: true,
  props: {
    field: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    showLinkTextWithChildrenPresent: {
      type: Boolean,
      default: false,
    },
  },
  // Need to assign `any` return type because Vue type definitions are inaccurate.
  // The Vue type definitions set `render` to a return type of VNode and that's it.
  // However, it is possible to return null | string | VNode[] | VNodeChildrenArrayContents.
  render(createElement: CreateElement, context: RenderContext): any {
    const {
      children,
      props: { field, editable, showLinkTextWithChildrenPresent },
    } = context;

    const dynamicField: any = field;

    if (!field || (!dynamicField.editableFirstPart && !dynamicField.value && !dynamicField.href)) {
      return null;
    }

    // EXPERIENCE EDITOR RENDERING
    if (editable && dynamicField.editableFirstPart) {
      let markup = dynamicField.editableFirstPart;

      // in an ideal world, we'd pre-render Vue children here and inject them between editableFirstPart and editableLastPart.
      // However, we cannot combine arbitrary unparsed HTML (innerHTML) based components with actual vDOM components (the children)
      // because the innerHTML is not parsed - it'd make a discontinuous vDOM.
      // So, we'll go for the next best compromise of rendering the link field and children separately
      // under a wrapping div. Should be "good enough" for most cases - and write your own helper if it isn't. Or bring xEditor out of 2006.

      markup += dynamicField.editableLastPart;

      // in functional components, context.data should be passed along to the
      // `createElement` function in order to retain attributes and events
      // https://vuejs.org/v2/guide/render-function.html#Passing-Attributes-and-Events-to-Child-Elements-Components
      const elementData = {
        ...context.data,
        class: 'sc-link-wrapper',
        domProps: { innerHTML: markup },
      };

      const xEditorElement = createElement('span', elementData);

      if (children) {
        const childElements = createElement(
          'span',
          { class: 'sc-link-editable-children-wrapper' },
          children
        );

        return createElement('span', { class: 'sc-link-editable-wrapper' }, [
          xEditorElement,
          childElements
        ]);
      }

      return xEditorElement;
    }

    // handle link directly on field for forgetful devs
    const link = dynamicField.href ? field : dynamicField.value;
    if (!link) {
      return null;
    }

    const linkText =
      showLinkTextWithChildrenPresent || !children || children.length === 0 ? (link.text || link.href) : null;

    const finalChildren = children ? [linkText, ...children] : linkText;

    // in functional components, context.data should be passed along to the
    // `createElement` function in order to retain attributes and events
    // https://vuejs.org/v2/guide/render-function.html#Passing-Attributes-and-Events-to-Child-Elements-Components
    const data = {
      ...context.data,
      class: link.class,
      attrs: { ...context.data.attrs, href: link.href, title: link.title, target: link.target },
    };
    return createElement('a', data, finalChildren);
  },
};
