import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  Renderer2,
  inject,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { isAbsoluteUrl } from '@sitecore-jss/sitecore-jss/utils';
import { RichTextField } from './rendering-field';

@Directive({
  selector: '[scRichText]',
})
export class RichTextDirective implements OnChanges {
  @Input('scRichTextEditable') editable = true;

  @Input('scRichText') field: RichTextField;

  /**
   * Custom template to render in Pages in Metadata edit mode if field value is empty
   */
  @Input('scRichTextEmptyFieldEditingTemplate') emptyFieldEditingTemplate: TemplateRef<unknown>;

  private templateRef = inject(TemplateRef);
  private renderer = inject(Renderer2);
  private router = inject(Router);
  private viewRef: EmbeddedViewRef<unknown>;
  private viewContainer = inject(ViewContainerRef);

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
    const field = this.field;
    if (!field || (!field.editable && !field.value)) {
      return;
    }

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
