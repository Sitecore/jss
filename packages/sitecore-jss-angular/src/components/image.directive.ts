import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { mediaApi } from '@sitecore-jss/sitecore-jss/media';
import { ImageField, ImageFieldValue } from './rendering-field';
import { BaseFieldDirective } from './base-field.directive';
import { DefaultEmptyImageFieldEditingComponent } from './default-empty-image-field-editing-placeholder.component';
import { MetadataKind } from '@sitecore-jss/sitecore-jss/editing';

@Directive({ selector: '[scImage]' })
export class ImageDirective extends BaseFieldDirective implements OnChanges {
  @Input('scImage') field: ImageField;

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

  /**
   * Custom template to render in Pages in Metadata edit mode if field value is empty
   */
  @Input('scImageEmptyFieldEditingTemplate') emptyFieldEditingTemplate: TemplateRef<unknown>;

  /**
   * Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided
   */
  protected defaultFieldEditingComponent: Type<unknown>;

  private inlineRef: HTMLSpanElement | null = null;

  constructor(
    viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    super(viewContainer);
    this.defaultFieldEditingComponent = DefaultEmptyImageFieldEditingComponent;
  }

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
    if (!this.shouldRender()) {
      if (this.emptyFieldEditingTemplate) {
        super.renderEmpty();
      } else {
        this.defaultEmptyFieldTemplate();
      }
      return;
    }

    const overrideAttrs = {
      ...this.getElementAttrs(),
      ...this.attrs,
    };
    const media = this.field;

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
      this.renderMetadata(MetadataKind.Open);
      this.renderTemplate(attrs);
      this.renderMetadata(MetadataKind.Close);
    }
  }

  private defaultEmptyFieldTemplate() {
    const img = this.renderer.createElement('img');
    // Set image attributes
    this.renderer.setAttribute(img, 'alt', '');
    this.renderer.setAttribute(
      img,
      'src',
      'data:image/svg+xml,%3Csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 240 240" style="enable-background:new 0 0 240 240;" xml:space="preserve"%3E%3Cstyle type="text/css"%3E .st0%7Bfill:none;%7D .st1%7Bfill:%23969696;%7D .st2%7Bfill:%23FFFFFF;%7D .st3%7Bfill:%23FFFFFF;stroke:%23FFFFFF;stroke-width:0.75;stroke-miterlimit:10;%7D%0A%3C/style%3E%3Cg%3E%3Crect class="st0" width="240" height="240"/%3E%3Cg%3E%3Cg%3E%3Crect x="20" y="20" class="st1" width="200" height="200"/%3E%3C/g%3E%3Cg%3E%3Ccircle class="st2" cx="174" cy="67" r="14"/%3E%3Cpath class="st2" d="M174,54c7.17,0,13,5.83,13,13s-5.83,13-13,13s-13-5.83-13-13S166.83,54,174,54 M174,52 c-8.28,0-15,6.72-15,15s6.72,15,15,15s15-6.72,15-15S182.28,52,174,52L174,52z"/%3E%3C/g%3E%3Cpolyline class="st3" points="29.5,179.25 81.32,122.25 95.41,137.75 137.23,91.75 209.5,179.75 "/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'
    );
    this.renderer.setAttribute(img, 'class', 'scEmptyImage');
    this.renderer.setStyle(img, 'min-width', '48px');
    this.renderer.setStyle(img, 'min-height', '48px');
    this.renderer.setStyle(img, 'max-width', '400px');
    this.renderer.setStyle(img, 'max-height', '400px');
    this.renderer.setStyle(img, 'cursor', 'pointer');

    const parentNode = this.renderer.parentNode(this.elementRef.nativeElement);
    if (parentNode) {
      this.renderer.insertBefore(parentNode, img, this.elementRef.nativeElement);
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
      view.destroy();
      return {};
    }
    const attrs: { [key: string]: string } = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes.item(i);
      if (attr) {
        attrs[attr.name] = attr.value;
      }
    }
    view.destroy();
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
