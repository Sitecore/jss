import { Component } from '@angular/core';

/**
 * Default component that will be rendered in pages when field is empty; applies for text, richtext, date and link fields.
 */
@Component({
  selector: 'sc-default-empty-text-field-editing-placeholder',
  template: '<span>[No text in field]</span>',
})
export class DefaultEmptyFieldEditingComponent {}
