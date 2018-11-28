import { Directive, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[renderEach]',
})
export class RenderEachDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
