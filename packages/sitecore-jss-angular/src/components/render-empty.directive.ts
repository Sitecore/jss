import { Directive, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[renderEmpty]',
})
export class RenderEmptyDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
