import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  imports: [CommonModule, JssModule],
  host: {
    'class': 'component promo',
    '[class]': "styles",
    '[id]': "id",
  },
})
export class PromoComponent extends SxaComponent {}
