import { Component } from '@angular/core';

/**
 * Default component that will be rendered in pages when field is empty; applies for text, richtext, date and link fields.
 */
@Component({
  selector: '<span>[sc-default-empty-text-field-editing-placeholder]</span>',
  template: '[No text in field]',
})
export class DefaultEmptyFieldEditingComponent {}
