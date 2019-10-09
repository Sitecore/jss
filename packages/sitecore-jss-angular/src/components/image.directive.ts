import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { mediaApi } from '@sitecore-jss/sitecore-jss';
import { ImageField } from './rendering-field';

@Directive({ selector: '[scImage]' })
export class ImageDirective implements OnChanges {
  private inlineRef: HTMLSpanElement | null = null;

  // tslint:disable-next-line:no-input-rename
  @Input('scImage') field: ImageField | '';

  // tslint:disable-next-line:no-input-rename
  @Input('scImageEditable') editable = true;

  // tslint:disable-next-line:no-input-rename
  @Input('scImageUrlParams') urlParams = {};

  // tslint:disable-next-line:no-input-rename
  @Input('scImageAttrs') attrs = {};

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['field'] || changes['editable'] || changes['urlParams'] || changes['attrs']) {
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

    let attrs: any = {};

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
      Object.entries(attrs).forEach(([key, attrValue]: [string, any]) =>
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

  private getImageAttrs(fieldAttrs: any, parsedAttrs: any, imageParams: any): any {
    const combinedAttrs = {
      ...fieldAttrs,
      ...parsedAttrs,
    };
    // tslint:disable-next-line:prefer-const
    let { src, srcSet, ...otherAttrs } = combinedAttrs;
    if (!src) {
      return null;
    }
    const newAttrs = {
      ...otherAttrs,
    };
    // update image URL for jss handler and image rendering params
    src = mediaApi.updateImageUrl(src, imageParams);
    if (srcSet) {
      // replace with HTML-formatted srcset, including updated image URLs
      newAttrs.srcSet = mediaApi.getSrcSet(src, srcSet, imageParams);
    } else {
      newAttrs.src = src;
    }
    return newAttrs;
  }

  private renderTemplate(imageProps: any) {
    const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    viewRef.rootNodes.forEach((node) => {
      Object.entries(imageProps).forEach(([key, imgPropVal]: [string, any]) => this.renderer.setAttribute(node, key, imgPropVal));
    });
  }

  private getElementAttrs(): { [key: string]: any; } {
    const view = this.templateRef.createEmbeddedView(null);
    const element: Element = view.rootNodes[0];
    if (!element) {
      return {};
    }
    const attrs: { [key: string]: any; } = {};
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
