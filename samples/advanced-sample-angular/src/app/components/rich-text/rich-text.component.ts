import { Component, Input } from '@angular/core';

@Component({
  /* tslint:disable-next-line */
  selector: 'div [app-rich-text]',
  templateUrl: './rich-text.component.html',
})
export class RichTextComponent {
  @Input() rendering: any;
}
