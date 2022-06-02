import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { isAbsoluteUrl } from '@sitecore-jss/sitecore-jss/utils';
import { LinkDirective } from './link.directive';
import { LinkField } from './rendering-field';

@Directive({ selector: '[scGenericLink]' })
export class GenericLinkDirective extends LinkDirective {
  @Input('scGenericLinkEditable') editable = true;

  @Input('scGenericLinkAttrs') attrs: { [key: string]: string } = {};

  @Input('scGenericLink') field: LinkField;

  @Input('scGenericLinkExtras') extras?: NavigationExtras;

  constructor(
    viewContainer: ViewContainerRef,
    templateRef: TemplateRef<unknown>,
    renderer: Renderer2,
    elementRef: ElementRef,
    private router: Router
  ) {
    super(viewContainer, templateRef, renderer, elementRef);
  }

  protected renderTemplate(props: { [key: string]: string }, linkText: string) {
    const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);

    viewRef.rootNodes.forEach((node) => {
      Object.entries(props).forEach(([key, propValue]: [string, string]) => {
        if (key === 'href' && !isAbsoluteUrl(propValue)) {
          const urlTree = this.router.createUrlTree([propValue], this.extras);
          this.updateAttribute(node, key, this.router.serializeUrl(urlTree));
          this.renderer.listen(node, 'click', (event) => {
            this.router.navigate([propValue], this.extras);
            event.preventDefault();
          });
        } else {
          this.updateAttribute(node, key, propValue);
        }
      });

      if (node.childNodes && node.childNodes.length === 0 && linkText) {
        node.textContent = linkText;
      }
    });
  }
}
