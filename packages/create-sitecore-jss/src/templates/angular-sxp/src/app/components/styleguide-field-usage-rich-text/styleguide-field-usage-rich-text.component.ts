import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Demonstrates usage of a Rich Text (HTML) content field within JSS.
 */
@Component({
  selector: 'app-styleguide-field-usage-rich-text',
  templateUrl: './styleguide-field-usage-rich-text.component.html',
})
export class StyleguideFieldUsageRichTextComponent {
  @Input() rendering: ComponentRendering;
}
