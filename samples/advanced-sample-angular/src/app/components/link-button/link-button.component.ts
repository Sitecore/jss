import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  /* tslint:disable-next-line */
  selector: 'div [app-link-button]',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LinkButtonComponent {
  @Input() rendering: any;
}
