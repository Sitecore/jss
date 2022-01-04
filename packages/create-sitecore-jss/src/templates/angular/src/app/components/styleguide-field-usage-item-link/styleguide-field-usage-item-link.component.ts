import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Demonstrates usage of a Content Link content field within JSS.
 * Content links are a reference to a single other piece of content.
 */
@Component({
  selector: 'app-styleguide-field-usage-item-link',
  templateUrl: './styleguide-field-usage-item-link.component.html',
})
export class StyleguideFieldUsageItemLinkComponent {
  @Input() rendering: ComponentRendering;
}
