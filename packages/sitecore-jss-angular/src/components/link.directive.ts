import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { LinkField } from './rendering-field';

@Directive({ selector: '[scLink]' })
export class LinkDirective implements OnChanges {
  private inlineRef: HTMLSpanElement | null = null;

  // tslint:disable-next-line:no-input-rename
  @Input('scLinkEditable') editable = true;

  // tslint:disable-next-line:no-input-rename
  @Input('scLinkAttrs') attrs: any = {};

  // tslint:disable-next-line:no-input-rename
  @Input('scLink') field: LinkField;

  constructor(
    protected viewContainer: ViewContainerRef,
    protected templateRef: TemplateRef<any>,
    protected renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['field'] || changes['editable'] || changes['attrs']) {
      this.viewContainer.clear();
      if (this.inlineRef) {
        this.inlineRef.remove();
        this.inlineRef = null;
      }

      this.updateView();
    }
  }

  private updateView() {
    const field = this.field;
    if (this.editable && field && field.editableFirstPart && field.editableLastPart) {
      this.renderInlineWrapper(field.editableFirstPart, field.editableLastPart);
    } else if (field && (field.href || field.value)) {
      const props = field.href ? field : field.value;
      const linkText = field.text || field.value.text || field.href || field.value.href;
      const mergedAttrs = { ...props, ...this.attrs };
      this.renderTemplate(mergedAttrs, linkText);
    }
  }

  protected renderTemplate(props: any, linkText: string) {
    const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);

    viewRef.rootNodes.forEach((node) => {
      Object.keys(props).forEach((key) => this.renderer.setAttribute(node, key, props[key]));

      if (node.childNodes && node.childNodes.length === 0 && linkText) {
        node.textContent = linkText;
      }
    });
  }

  private renderInlineWrapper(editableFirstPart: string, editableLastPart: string) {
    const span: HTMLSpanElement = this.renderer.createElement('span');
    span.className = 'sc-link-wrapper';
    span.innerHTML = editableFirstPart + editableLastPart;

    // assign attributes from template to inline wrapper
    const attrs = {
      ...this.getElementAttrs(),
      ...this.attrs,
    };
    Object.keys(attrs).forEach((key) => this.renderer.setAttribute(span, key, attrs[key]));

    this.viewContainer.createEmbeddedView(this.templateRef);

    const parentNode = this.renderer.parentNode(this.elementRef.nativeElement);
    this.renderer.insertBefore(parentNode, span, this.elementRef.nativeElement);

    this.inlineRef = span;
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
}
