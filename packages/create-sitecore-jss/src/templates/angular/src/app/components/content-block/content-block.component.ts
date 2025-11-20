import { Component, Input } from '@angular/core';
import { ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  imports: [JssModule]
})
export class ContentBlockComponent {
  @Input() rendering: ComponentRendering;
}
