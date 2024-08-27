import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[placeholderMetadata]',
})
export class PlaceholderMetadataDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
