import { LinkDirective } from "./link.directive";
import { Directive, ViewContainerRef, TemplateRef, Renderer2, ElementRef, Input } from "@angular/core";
import { Router } from "@angular/router";
import { LinkField } from "./rendering-field";

@Directive({ selector: '[scRouterLink]' })
export class RouterLinkDirective extends LinkDirective {

    // tslint:disable-next-line:no-input-rename
    @Input('scRouterLinkEditable') editable = true;

    // tslint:disable-next-line:no-input-rename
    @Input('scRouterLinkAttrs') attrs: any = {};

    // tslint:disable-next-line:no-input-rename
    @Input('scRouterLink') field: LinkField;

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
            Object.keys(props).forEach((key) => {
                if (key === 'href') {
                    this.renderer.listen(node, 'click', () => {
                        this.router.navigate([props[key]]);
                    })

                } else {
                    this.renderer.setAttribute(node, key, props[key]);
                }
            });

            if (node.childNodes && node.childNodes.length === 0 && linkText) {
                node.textContent = linkText;
            }
        });
    }
}