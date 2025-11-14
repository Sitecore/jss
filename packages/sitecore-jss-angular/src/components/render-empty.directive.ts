import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[renderEmpty]',
})
export class RenderEmptyDirective {
  public templateRef = inject(TemplateRef);
}
