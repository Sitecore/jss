import { Component } from '@angular/core';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styles: [
    `
      :host {
        width: 50%;
        display: inline-block;
      }
      :host ::ng-deep > * {
        width: 100%;
        height: 100%;
      }
      @media (max-width: 992px) {
        :host {
          width: 100%;
        }
      }
    `,
  ],
})
export class PromoComponent extends SxaComponent {}
