import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[scPlaceholderLoading]',
})
export class PlaceholderLoadingDirective {
  public templateRef = inject(TemplateRef);
}
