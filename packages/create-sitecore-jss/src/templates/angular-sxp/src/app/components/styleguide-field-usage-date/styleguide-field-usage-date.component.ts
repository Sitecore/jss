import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';

/**
 * Demonstrates usage of date and time content field types within JSS.
 * NOTE: Usage of the *scDate directive is necessary to enable inline editing
 * of the date values in the Sitecore Experience Editor. The date value (as an ISO string)
 * is still available using the `getFieldValue()` helper if the raw value is needed.
 */
@Component({
  selector: 'app-styleguide-field-usage-date',
  templateUrl: './styleguide-field-usage-date.component.html',
  imports: [CommonModule, JssModule, StyleguideSpecimenComponent]
})
export class StyleguideFieldUsageDateComponent {
  @Input() rendering: ComponentRendering;
  isoDateFormat = 'y-MM-ddTHH:mm:ss\'Z\'';
  utcTimezone = '+0000';
}
