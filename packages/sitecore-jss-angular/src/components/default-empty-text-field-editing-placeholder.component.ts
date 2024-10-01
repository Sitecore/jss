import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

/**
 * Default component that will be rendered in pages when field is empty; applies for text, richtext, date and link fields.
 */
@Component({
  selector: 'sc-default-empty-text-field-editing-placeholder',
  template: '[No text in field]',
})
export class DefaultEmptyFieldEditingComponent implements OnInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    // Change the default wrapping element to a <span>
    const nativeElement = this.elementRef.nativeElement;
    const parent = nativeElement.parentNode;

    // Create a new <span> element and move the content
    const span = this.renderer.createElement('span');
    while (nativeElement.firstChild) {
      this.renderer.appendChild(span, nativeElement.firstChild);
    }

    // Replace the original element with the new <span>
    this.renderer.insertBefore(parent, span, nativeElement);
    this.renderer.removeChild(parent, nativeElement);
  }
}
