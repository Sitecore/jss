import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[renderEach]',
})
export class RenderEachDirective {
  public templateRef = inject(TemplateRef);
}
