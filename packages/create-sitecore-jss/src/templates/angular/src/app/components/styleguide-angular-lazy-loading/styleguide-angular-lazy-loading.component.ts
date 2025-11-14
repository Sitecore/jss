import { Component, Input } from '@angular/core';
import { ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';

@Component({
  selector: 'app-styleguide-angular-lazy-loading',
  templateUrl: './styleguide-angular-lazy-loading.component.html',
  styles: [],
  imports: [JssModule, StyleguideSpecimenComponent]
})
export class StyleguideAngularLazyLoadingComponent {
  @Input() rendering: ComponentRendering;
};