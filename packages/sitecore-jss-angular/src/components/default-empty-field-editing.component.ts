import { Component } from '@angular/core';

/**
 * Default component that will be rendered in pages when field is empty; applies for text, richtext, date and link fields.
 */
@Component({
  selector: 'app-default-empty-field-editing',
  template: '<span>[No text in field]</span>',
})
export class DefaultEmptyFieldEditingComponent {}
