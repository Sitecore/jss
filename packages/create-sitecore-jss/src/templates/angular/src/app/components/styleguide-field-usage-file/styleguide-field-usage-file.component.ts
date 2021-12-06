import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Demonstrates usage of a File content field within JSS.
 * File types are stored within Sitecore's Media Library data, and can be edited.
 */
@Component({
  selector: 'app-styleguide-field-usage-file',
  templateUrl: './styleguide-field-usage-file.component.html',
})
export class StyleguideFieldUsageFileComponent {
  @Input() rendering: ComponentRendering;
}
