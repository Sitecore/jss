import { Component, OnInit } from '@angular/core';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
})
export class PromoComponent extends SxaComponent implements OnInit {
  empty: boolean;
  withText: boolean;

  ngOnInit() {
    super.ngOnInit();
    this.empty = !this.rendering.fields;
    if (!this.empty) {
      this.withText = this.rendering.params?.Variant === 'withText';
    }
    console.log(this.rendering.fields);
  }
}
