import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  Renderer2,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { isAbsoluteUrl } from '@sitecore-jss/sitecore-jss/utils';
import { RichTextField } from './rendering-field';
import { BaseFieldDirective } from './base-field.directive';

@Directive({
  selector: '[scRichText]',
})
export class RichTextDirective extends BaseFieldDirective implements OnChanges {
  @Input('scRichTextEditable') editable = true;

  @Input('scRichText') field: RichTextField;

  private templateRef = inject(TemplateRef);
  private renderer = inject(Renderer2);
  private router = inject(Router);

  ngOnChanges(changes: SimpleChanges) {
    if (changes.field || changes.editable) {
      this.viewContainer.clear();
      this.updateView();
    }
  }

  private updateView() {
    if (!this.shouldRender()) {
      return;
    }

    this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);

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
