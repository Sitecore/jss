import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[renderEmpty]',
})
export class RenderEmptyDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
