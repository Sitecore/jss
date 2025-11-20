import { Component, Input } from '@angular/core';
import { ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';
import { CommonModule } from '@angular/common';

/**
 * Demonstrates usage of a Content Link content field within JSS.
 * Content links are a reference to a single other piece of content.
 */
@Component({
  selector: 'app-styleguide-field-usage-item-link',
  templateUrl: './styleguide-field-usage-item-link.component.html',
  imports: [CommonModule, JssModule, StyleguideSpecimenComponent]
})
export class StyleguideFieldUsageItemLinkComponent {
  @Input() rendering: ComponentRendering;
}
