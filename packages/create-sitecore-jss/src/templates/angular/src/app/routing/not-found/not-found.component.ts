import { Component, Input } from '@angular/core';
import { LayoutServiceContextData } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  @Input() errorContextData: LayoutServiceContextData;
}
