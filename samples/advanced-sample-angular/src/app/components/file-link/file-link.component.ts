import { Component, Input } from '@angular/core';

@Component({
  /* tslint:disable-next-line */
  selector: 'div [app-file-link]',
  templateUrl: './file-link.component.html',
  styleUrls: ['./file-link.component.css']
})
export class FileLinkComponent {
  @Input() rendering: any;
}
