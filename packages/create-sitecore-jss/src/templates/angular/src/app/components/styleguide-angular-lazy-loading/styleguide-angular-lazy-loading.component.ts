import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-styleguide-angular-lazy-loading',
  templateUrl: './styleguide-angular-lazy-loading.component.html',
  styles: []
})
export class StyleguideAngularLazyLoadingComponent {
  @Input() rendering: ComponentRendering;

  constructor() { }
}
