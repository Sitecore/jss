import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  Renderer2,
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

  @Input('scRichTextEmptyFieldEditingTemplate') emptyFieldEditingTemplate: TemplateRef<unknown>;

  constructor(
    viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
    private renderer: Renderer2,
    private router: Router
  ) {
    super(viewContainer);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field || changes.editable) {
      if (!this.viewRef) {
        this.viewContainer.clear();
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
      }

      this.updateView();
    }
  }

  private updateView() {
    if (!this.shouldRender()) {
      super.renderEmpty(DefaultEmptyFieldEditingComponent);
      return;
    }

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
