import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { isAbsoluteUrl } from '@sitecore-jss/sitecore-jss';
import { LinkDirective } from './link.directive';
import { LinkField } from './rendering-field';

@Directive({ selector: '[scGenericLink]' })
export class GenericLinkDirective extends LinkDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('scGenericLinkEditable')
  editable = true;

  // tslint:disable-next-line:no-input-rename
  @Input('scGenericLinkAttrs')
  attrs: any = {};

  // tslint:disable-next-line:no-input-rename
  @Input('scGenericLink')
  field: LinkField;

  // tslint:disable-next-line:no-input-rename
  @Input('scGenericLinkExtras')
  extras?: NavigationExtras;

  constructor(
    viewContainer: ViewContainerRef,
    templateRef: TemplateRef<any>,
    renderer: Renderer2,
    elementRef: ElementRef,
    private router: Router
  ) {
    super(viewContainer, templateRef, renderer, elementRef);
  }

  protected renderTemplate(props: any, linkText: string) {
    const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);

    viewRef.rootNodes.forEach((node) => {
      Object.entries(props).forEach(([key, propValue]: [string, any]) => {
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
