import { Component, Input } from '@angular/core';
import { ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';

/**
 * Demonstrates usage of a File content field within JSS.
 * File types are stored within Sitecore's Media Library data, and can be edited.
 */
@Component({
  selector: 'app-styleguide-field-usage-file',
  templateUrl: './styleguide-field-usage-file.component.html',
  imports: [JssModule, StyleguideSpecimenComponent]
})
export class StyleguideFieldUsageFileComponent {
  @Input() rendering: ComponentRendering;
}
