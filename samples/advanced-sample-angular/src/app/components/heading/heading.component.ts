import { Component, Input } from '@angular/core';

@Component({
  /* tslint:disable-next-line */
  selector: 'div [app-heading],app-heading',
  templateUrl: './heading.component.html',
})
export class HeadingComponent {
  private _field: any;

  @Input() rendering: any;
  @Input() size = 1;

  @Input() set field(field: any) {
    this._field = field;
  }

  get field(): any {
    if (this._field) {
      return this._field;
    }
    if (this.rendering && this.rendering.fields) {
      return this.rendering.fields.text;
    }
    return null;
  }
}
