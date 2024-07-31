import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Demonstrates usage of a custom content field type within JSS.
 * See /sitecore/definitions/components/Styleguide-FieldUsage-Custom.sitecore.js
 * for the definition of the structure of the custom field. This code is just for display.
 */
@Component({
  selector: 'app-styleguide-field-usage-custom',
  templateUrl: './styleguide-field-usage-custom.component.html',
})
export class StyleguideFieldUsageCustomComponent {
  @Input() rendering: ComponentRendering;
}
