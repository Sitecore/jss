import { Directive, Input, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LinkDirective } from './link.directive';
import { LinkField } from './rendering-field';

@Directive({ selector: '[scRouterLink]' })
export class RouterLinkDirective extends LinkDirective {
  @Input('scRouterLinkEditable') editable = true;

  @Input('scRouterLinkAttrs') attrs: { [attr: string]: string } = {};

  @Input('scRouterLink') declare field: LinkField;

  /**
   * Custom template to render in Pages in Metadata edit mode if field value is empty
   */
  @Input('scRouterLinkEmptyFieldEditingTemplate') declare emptyFieldEditingTemplate: TemplateRef<
    unknown
  >;
  private router = inject(Router);

  protected renderTemplate(props: { [prop: string]: string }, linkText: string) {
    const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);

    viewRef.rootNodes.forEach((node) => {
      Object.entries(props).forEach(([key, propValue]) => {
        this.updateAttribute(node, key, propValue);

        if (key === 'href') {
          this.renderer.listen(node, 'click', (event) => {
            this.router.navigateByUrl(propValue);

            // shouldn't prevent default if the link includes a fragment
            if (!propValue.includes('#')) {
              event.preventDefault();
            }
          });
        }
      });

      if (node.childNodes && node.childNodes.length === 0 && linkText) {
        node.textContent = linkText;
      }
    });
  }
}
