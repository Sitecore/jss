import { Directive, Input, Renderer2, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LinkDirective } from './link.directive';
import { LinkField } from './rendering-field';

@Directive({ selector: '[scRouterLink]' })
export class RouterLinkDirective extends LinkDirective {
  @Input('scRouterLinkEditable') editable = true;

  @Input('scRouterLinkAttrs') attrs: { [attr: string]: string } = {};

  @Input('scRouterLink') declare field: LinkField;

  viewContainer = inject(ViewContainerRef);
  templateRef = inject(TemplateRef);
  protected renderer = inject(Renderer2);
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
