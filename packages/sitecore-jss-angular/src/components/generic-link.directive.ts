import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
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
        if (key === 'href' && !this.isAbsoluteUrl(propValue)) {
          const urlTree = this.router.createUrlTree([propValue], this.extras);
          this.renderer.setAttribute(node, key, this.router.serializeUrl(urlTree));
          this.renderer.listen(node, 'click', (event) => {
            this.router.navigate([propValue], this.extras);
            event.preventDefault();
          });
        } else {
          this.renderer.setAttribute(node, key, propValue);
        }
      });

      if (node.childNodes && node.childNodes.length === 0 && linkText) {
        node.textContent = linkText;
      }
    });
  }

  private isAbsoluteUrl(url?: unknown) {
    if (url === null) {
      return false;
    }
    if (typeof url !== 'string') {
      throw new TypeError('Expected a string');
    }

    return /^[a-z][a-z0-9+.-]*:/.test(url);
  }
}
