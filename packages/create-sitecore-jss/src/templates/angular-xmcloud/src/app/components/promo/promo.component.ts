import { Component } from '@angular/core';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  host: {
    'class': 'component promo',
    '[class]': "styles",
    '[id]': "id",
  },
})
export class PromoComponent extends SxaComponent {}
