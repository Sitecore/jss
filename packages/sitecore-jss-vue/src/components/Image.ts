import { mediaApi } from '@sitecore-jss/sitecore-jss';
import { h, defineComponent } from 'vue';
import { generateHtmlTag } from '../utils';

export interface ImageFieldValue {
  [attributeName: string]: any;
  src?: string;
  /** HTML attributes that will be appended to the rendered <img /> tag. */
}

export interface ImageField {
  value?: ImageFieldValue;
  editable?: string;
}

export interface ImageProps {
  /** The image field data. */
  media: ImageField | ImageFieldValue;

  /**
   * Can be used to explicitly disable inline editing.
   * If true and `media.editable` has a value, then `media.editable` will be processed
   * and rendered as component output. If false, `media.editable` value will be ignored and not rendered.
   */
  editable?: boolean;

  /**
   * Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.
   * @example
   * /\/([-~]{1})assets\//i
   * /-assets/website -> /-/jssmedia/website
   * /~assets/website -> /~/jssmedia/website
   */
  mediaUrlPrefix?: RegExp;

  /**
   * Parameters that will be attached to Sitecore media URLs
   */
  imageParams?: {
    [paramName: string]: string;
  };
}

const getEditableWrapper = (editableMarkup: string) =>
  // create an inline wrapper and use dangerouslySetInnerHTML.
  // if we try to parse the EE value, the parser may strip invalid or disallowed attributes from html elements - and EE uses several
  h('span', {
    class: 'sc-image-wrapper',
    innerHTML: editableMarkup,
  });

const getImageAttrs = (
  {
    src,
    srcSet,
    ...otherAttrs
  }: {
    src?: string;
    srcSet?: any;
    otherAttrs?: any;
  },
  imageParams: any,
  mediaUrlPrefix?: RegExp
) => {
  if (!src) {
    return null;
  }
  const newAttrs: any = {
    ...otherAttrs,
  };

  // update image URL for jss handler and image rendering params
  const resolvedSrc = mediaApi.updateImageUrl(src, imageParams, mediaUrlPrefix);
  if (srcSet) {
    // replace with HTML-formatted srcset, including updated image URLs
    newAttrs.srcSet = mediaApi.getSrcSet(resolvedSrc, srcSet, imageParams, mediaUrlPrefix);
  } else {
    newAttrs.src = resolvedSrc;
  }
  return newAttrs;
};

export const Image = defineComponent({
  inheritAttrs: false,
  props: {
    media: { type: Object, required: true },
    editable: { type: Boolean, default: true },
    imageParams: { type: Object, default: () => ({}) },
    mediaUrlPrefix: { type: RegExp, default: undefined },
  },
  render() {
    const { media, editable, imageParams, mediaUrlPrefix } = this.$props;
    const contextAttrs = this.$attrs;

    if (!media || (!media.editable && !media.value && !media.src)) {
      return null;
    }

    // we likely have an experience editor value, should be a string
    if (editable && media.editable) {
      const foundImg = mediaApi.findEditorImageTag(media.editable);
      if (!foundImg) {
        return getEditableWrapper(media.editable);
      }

      const imgAttrs = getImageAttrs(
        { ...foundImg.attrs, ...contextAttrs },
        imageParams,
        mediaUrlPrefix
      );
      if (!imgAttrs) {
        return getEditableWrapper(media.editable);
      }

      const imgHtml = generateHtmlTag('img', imgAttrs);
      const editableMarkup = media.editable.replace(foundImg.imgTag, imgHtml);
      return getEditableWrapper(editableMarkup);
    }

    // some wise-guy/gal is passing in a 'raw' image object value
    const img = media.src ? media : media.value;
    if (!img) {
      return null;
    }

    const attrs = getImageAttrs({ ...img, ...contextAttrs }, imageParams, mediaUrlPrefix);
    if (attrs) {
      // this.$data should be passed along to the
      // `createElement` function in order to retain attributes and events
      // https://v3.vuejs.org/guide/render-function.html#render-functions
      const data = { ...this.$data, ...attrs };
      return h('img', data);
    }

    return null; // we can't handle the truth
  },
});
