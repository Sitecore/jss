import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { mediaApi } from '@sitecore-jss/sitecore-jss/media';
import { ImageField, ImageFieldValue } from './rendering-field';

@Directive({ selector: '[scImage]' })
export class ImageDirective implements OnChanges {
  private inlineRef: HTMLSpanElement | null = null;

  @Input('scImage') field: ImageField | '';

  @Input('scImageEditable') editable = true;

  /**
   * Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.
   * @example
   * /\/([-~]{1})assets\//i
   * /-assets/website -> /-/jssmedia/website
   * /~assets/website -> /~/jssmedia/website
   */
  @Input('scImageMediaUrlPrefix') mediaUrlPrefix?: RegExp;

  @Input('scImageUrlParams') urlParams: { [param: string]: string | number } = {};

  @Input('scImageAttrs') attrs: { [param: string]: unknown } = {};

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field || changes.editable || changes.urlParams || changes.attrs) {
      this.viewContainer.clear();
      if (this.inlineRef) {
        this.inlineRef.remove();
        this.inlineRef = null;
      }

      this.updateView();
    }
  }

  private updateView() {
    const overrideAttrs = {
      ...this.getElementAttrs(),
      ...this.attrs,
    };
    const media = this.field;

    if (!media || (!media.editable && !media.value && !media.src)) {
      return;
    }

    let attrs: { [attr: string]: string } | null = {};

    // we likely have an experience editor value, should be a string
    if (this.editable && media.editable) {
      const foundImg = mediaApi.findEditorImageTag(media.editable);
      if (!foundImg) {
        return this.renderInlineWrapper(media.editable);
      }
      attrs = this.getImageAttrs(foundImg.attrs, overrideAttrs, this.urlParams);
      if (!attrs) {
        return this.renderInlineWrapper(media.editable);
      }
      const tempImg: HTMLImageElement = this.renderer.createElement('img');
      Object.entries(attrs).forEach(([key, attrValue]: [string, string]) =>
        tempImg.setAttribute(key, attrValue)
      );
      const editableMarkup = media.editable.replace(foundImg.imgTag, tempImg.outerHTML);
      return this.renderInlineWrapper(editableMarkup);
    }

    // some wise-guy/gal is passing in a 'raw' image object value
    const img = media.src ? media : media.value;
    if (!img) {
      return null;
    }

    attrs = this.getImageAttrs(img, overrideAttrs, this.urlParams);
    if (attrs) {
      this.renderTemplate(attrs);
    }
  }

  private getImageAttrs(
    fieldAttrs: ImageFieldValue,
    parsedAttrs: { [attr: string]: unknown },
    imageParams: { [param: string]: string | number }
  ): { [attr: string]: string } | null {
    const combinedAttrs = {
      ...fieldAttrs,
      ...parsedAttrs,
    };
    // eslint-disable-next-line prefer-const
    let { src, srcSet, ...otherAttrs } = combinedAttrs;
    if (!src) {
      return null;
    }
    const newAttrs: { [attr: string]: string } = {
      ...(otherAttrs as { [key: string]: string }),
    };
    // update image URL for jss handler and image rendering params
    src = mediaApi.updateImageUrl(src, imageParams, this.mediaUrlPrefix);
    if (srcSet) {
      // replace with HTML-formatted srcset, including updated image URLs
      newAttrs.srcSet = mediaApi.getSrcSet(src, srcSet, imageParams, this.mediaUrlPrefix);
    } else {
      newAttrs.src = src;
    }
    return newAttrs;
  }

  private renderTemplate(imageProps: { [prop: string]: string }) {
    const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    viewRef.rootNodes.forEach((node) => {
      Object.entries(imageProps).forEach(([key, imgPropVal]: [string, string]) =>
        this.renderer.setAttribute(node, key, imgPropVal)
      );
    });
  }

  private getElementAttrs(): { [key: string]: string } {
    const view = this.templateRef.createEmbeddedView(null);
    const element: Element = view.rootNodes[0];
    if (!element) {
      return {};
    }
    const attrs: { [key: string]: string } = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes.item(i);
      if (attr) {
        attrs[attr.name] = attr.value;
      }
    }
    return attrs;
  }

  private renderInlineWrapper(editable: string) {
    const span: HTMLSpanElement = this.renderer.createElement('span');
    span.className = 'sc-image-wrapper';
    span.innerHTML = editable;

    const parentNode = this.renderer.parentNode(this.elementRef.nativeElement);
    this.renderer.insertBefore(parentNode, span, this.elementRef.nativeElement);
    parentNode.removeChild(this.elementRef.nativeElement);

    this.inlineRef = span;
  }
}
