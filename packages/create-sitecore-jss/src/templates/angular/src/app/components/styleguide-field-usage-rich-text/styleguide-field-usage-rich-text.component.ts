import { Component, Input } from '@angular/core';
import { ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';

/**
 * Demonstrates usage of a Rich Text (HTML) content field within JSS.
 */
@Component({
  selector: 'app-styleguide-field-usage-rich-text',
  templateUrl: './styleguide-field-usage-rich-text.component.html',
  imports: [JssModule, StyleguideSpecimenComponent]
})
export class StyleguideFieldUsageRichTextComponent {
  @Input() rendering: ComponentRendering;
}
