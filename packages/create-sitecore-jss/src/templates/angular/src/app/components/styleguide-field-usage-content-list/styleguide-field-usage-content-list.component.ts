import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Demonstrates usage of a Content List field type within JSS.
 * Content Lists are references to 0..n other content items.
 * In Sitecore terms, this maps by default to a Treelist field.
 */
@Component({
  selector: 'app-styleguide-field-usage-content-list',
  templateUrl: './styleguide-field-usage-content-list.component.html',
})
export class StyleguideFieldUsageContentListComponent {
  @Input() rendering: ComponentRendering;
}
