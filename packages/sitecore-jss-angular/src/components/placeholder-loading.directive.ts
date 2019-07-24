import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[scPlaceholderLoading]',
})
export class PlaceholderLoadingDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
