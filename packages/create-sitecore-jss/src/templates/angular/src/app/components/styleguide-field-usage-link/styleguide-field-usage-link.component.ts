import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Demonstrates usage of a General Link (hyperlink) content field within JSS.
 */
@Component({
  selector: 'app-styleguide-field-usage-link',
  templateUrl: './styleguide-field-usage-link.component.html',
})
export class StyleguideFieldUsageLinkComponent {
  @Input() rendering: ComponentRendering;
  // this pattern can be used with the 'attrs' arg to the link to inject dynamic attributes from code
  linkDynamicAttributes = {
    rel: 'dynamic',
  };
}
