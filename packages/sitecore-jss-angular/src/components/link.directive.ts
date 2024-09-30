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
import { LinkField } from './rendering-field';
import { BaseFieldDirective } from './base-field.directive';
import { DefaultEmptyFieldEditingComponent } from './default-empty-text-field-editing-placeholder.component';
import { MetadataKind } from '@sitecore-jss/sitecore-jss/editing';

@Directive({ selector: '[scLink]' })
export class LinkDirective extends BaseFieldDirective implements OnChanges {
  @Input('scLinkEditable') editable = true;

  @Input('scLinkAttrs') attrs: { [attr: string]: string } = {};

  @Input('scLink') field: LinkField;

  /**
   * Custom template to render in Pages in Metadata edit mode if field value is empty
   */
  @Input('scLinkEmptyFieldEditingTemplate') emptyFieldEditingTemplate: TemplateRef<unknown>;

  /**
   * Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided
   */
  protected defaultFieldEditingComponent: Type<unknown>;

  private inlineRef: HTMLSpanElement | null = null;

  constructor(
    viewContainer: ViewContainerRef,
    protected templateRef: TemplateRef<unknown>,
    protected renderer: Renderer2,
    protected elementRef: ElementRef
  ) {
    super(viewContainer, renderer, elementRef);
    this.defaultFieldEditingComponent = DefaultEmptyFieldEditingComponent;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field || changes.editable || changes.attrs) {
      this.viewContainer.clear();
      if (this.inlineRef) {
        this.inlineRef.remove();
        this.inlineRef = null;
      }

      this.updateView();
    }
  }

  protected renderTemplate(props: { [prop: string]: unknown }, linkText?: string) {
    const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);

    viewRef.rootNodes.forEach((node) => {
      Object.entries(props).forEach(([key, propValue]) => {
        this.updateAttribute(node, key, propValue);
      });

      if (node.childNodes && node.childNodes.length === 0 && linkText) {
        node.textContent = linkText;
      }
    });
  }

  protected updateAttribute(node: HTMLElement, key: string, propValue?: unknown) {
    if (typeof propValue !== 'string' || !propValue || propValue === '') {
      return;
    }

    if (key === 'href') {
      const isInvalidLink = !propValue || /^https?:\/\/$/.test(propValue);

      if (isInvalidLink) {
        if (!(node as HTMLLinkElement).href) {
          return;
        }

        propValue = (node as HTMLLinkElement).href as string;
      }
      this.renderer.setAttribute(node, key, propValue as string);
    } else if (key === 'class' && node.className !== '') {
      this.renderer.setAttribute(node, key, `${node.className} ${propValue}`);
    } else {
      this.renderer.setAttribute(node, key, propValue);
    }
  }

  /**
   * Determines if directive should render the field as is
   * Returns true if we are in edit mode 'chromes' (field.editable is present) or field is not empty
   * or link field text is present and we are not in edit mode 'metadata'
   * The right side of the expression was added to preserve existing functionality
   */
  protected shouldRender() {
    return (
      super.shouldRender() ||
      !!((this.field?.text || this.field?.value?.text) && !this.field?.metadata)
    );
  }

  private updateView() {
    const field = this.field;
    if (this.editable && field && field.editableFirstPart && field.editableLastPart) {
      this.renderInlineWrapper(field.editableFirstPart, field.editableLastPart);
    } else {
      if (!this.shouldRender()) {
        super.renderEmpty();
        return;
      }

      const props = field.href ? field : field.value;

      const linkText = field.text || field.value?.text || field.href || field.value?.href;
      const anchor = props?.anchor ? `#${props.anchor}` : '';
      const href = `${props?.href}${anchor}`;

      const mergedAttrs = { ...props, ...this.attrs, href };

      delete mergedAttrs.anchor;
      this.renderMetadata(MetadataKind.Open);
      this.renderTemplate(mergedAttrs, linkText);
      this.renderMetadata(MetadataKind.Close);
    }
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
    Object.entries(attrs).forEach(([key, attrValue]) => this.updateAttribute(span, key, attrValue));

    this.viewContainer.createEmbeddedView(this.templateRef);

    const parentNode = this.renderer.parentNode(this.elementRef.nativeElement);
    this.renderer.insertBefore(parentNode, span, this.elementRef.nativeElement);

    this.inlineRef = span;
  }

  private getElementAttrs() {
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
}
