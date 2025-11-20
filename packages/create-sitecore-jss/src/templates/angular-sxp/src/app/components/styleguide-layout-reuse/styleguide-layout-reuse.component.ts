import { Component, Input } from '@angular/core';
import { ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';

/**
 * Demonstrates how to reuse content within JSS. See /data/routes/styleguide/en.yml
 * for the reused content definition sample. This component also demonstrates how to use
 * the Placeholder component's render props API to wrap all components in the placeholder
 * in a column tag (thus creating a horizontally laid out placeholder)
 */
@Component({
  selector: 'app-styleguide-layout-reuse',
  templateUrl: './styleguide-layout-reuse.component.html',
  imports: [JssModule, StyleguideSpecimenComponent]
})
export class StyleguideLayoutReuseComponent {
  @Input() rendering: ComponentRendering;
}
