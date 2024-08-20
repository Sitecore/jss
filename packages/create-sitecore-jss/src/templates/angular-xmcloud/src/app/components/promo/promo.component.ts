import { Component, ViewChild, TemplateRef } from '@angular/core';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
})
export class PromoComponent extends SxaComponent {
  @ViewChild('default', { static: true }) defaultVariant: TemplateRef<any>;
  @ViewChild('withText', { static: true }) withTextVariant: TemplateRef<any>;
  @ViewChild('empty', { static: true }) empty: TemplateRef<any>;

  public get variant(): TemplateRef<any> {
    if (!this.rendering.fields) {
      return this.empty;
    }

    return this.rendering.params?.FieldNames === 'WithText'
      ? this.withTextVariant
      : this.defaultVariant;
  }
}
