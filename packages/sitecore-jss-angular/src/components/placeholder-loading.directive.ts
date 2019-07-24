import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[sc-placeholder-loading]',
})
export class PlaceholderLoadingDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
