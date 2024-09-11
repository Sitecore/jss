import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  Renderer2,
  Type,
} from '@angular/core';
import { Router } from '@angular/router';
import { isAbsoluteUrl } from '@sitecore-jss/sitecore-jss/utils';
import { RichTextField } from './rendering-field';
import { BaseFieldDirective } from './base-field.directive';
import { DefaultEmptyFieldEditingComponent } from './default-empty-text-field-editing-placeholder.component';

@Directive({
  selector: '[scRichText]',
})
export class RichTextDirective extends BaseFieldDirective implements OnChanges {
  @Input('scRichTextEditable') editable = true;

  @Input('scRichText') field: RichTextField;

  /**
   * Custom template to render in Pages in Metadata edit mode if field value is empty
   */
  @Input('scRichTextEmptyFieldEditingTemplate') emptyFieldEditingTemplate: TemplateRef<unknown>;

  /**
   * Default component to render in Pages in Metadata edit mode if field value is empty and emptyFieldEditingTemplate is not provided
   */
  protected defaultFieldEditingComponent: Type<unknown>;

  constructor(
    viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
    private renderer: Renderer2,
    private router: Router
  ) {
    super(viewContainer);
    this.defaultFieldEditingComponent = DefaultEmptyFieldEditingComponent;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field || changes.editable) {
      this.viewContainer.clear();
      this.updateView();
    }
  }

  private updateView() {
    if (!this.shouldRender()) {
      super.renderEmpty();
      return;
    }

    this.renderMetadataTag('open');
    this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    this.renderMetadataTag('close');

    const field = this.field;
    const html = field.editable && this.editable ? field.editable : field.value;
    this.viewRef.rootNodes.forEach((node) => {
      node.innerHTML = html;

      if (!node.querySelectorAll) {
        return;
      }

      const links: NodeListOf<HTMLLinkElement> = node.querySelectorAll('a[href]');
      const linksArray: Array<HTMLLinkElement> = [].slice.call(links);

      linksArray.forEach((link) => {
        const href = link.getAttribute('href');
        const target = link.getAttribute('target');

        if (!href || isAbsoluteUrl(href) || target === '_blank' || target === '_top') {
          return;
        }

        this.renderer.listen(link, 'click', (event) => {
          this.router.navigateByUrl(href);
          event.preventDefault();
        });
      });
    });
  }
}
