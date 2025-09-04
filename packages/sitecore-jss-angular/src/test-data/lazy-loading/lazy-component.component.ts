import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { MockService } from './mock.service';
import { Component, Input } from '@angular/core';

/**
 * This component is used to test lazy loading functionality.
 */
@Component({
  selector: 'lazy-component',
  template: `
    {{ rendering?.fields?.linkText?.value }}
    {{ getText() }}
  `,
})
export class LazyComponent {
  @Input() rendering: ComponentRendering;

  constructor(private mockService: MockService) {}

  getText() {
    return this.mockService.get('Hello world');
  }
}
