import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { MockService } from './mock.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lazy-component',
  template: `
    {{ rendering?.fields?.linkText?.value }}
    {{ getNum() }}
  `,
})
export class LazyComponent {
  @Input() rendering: ComponentRendering;

  constructor(private mockService: MockService) {}

  getNum() {
    return this.mockService.get(10);
  }
}
