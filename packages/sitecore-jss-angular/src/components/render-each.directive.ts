import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[renderEach]',
})
export class RenderEachDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
