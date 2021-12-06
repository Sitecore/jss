import { Component, Input, OnInit } from '@angular/core';
import { ComponentRendering, getFieldValue } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Demonstrates usage of a Text content field within JSS.
 * Text fields are HTML encoded by default.
 */
@Component({
  selector: 'app-styleguide-field-usage-text',
  templateUrl: './styleguide-field-usage-text.component.html',
})
export class StyleguideFieldUsageTextComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  rawFieldValue: string;

  ngOnInit() {
    // the `getFieldValue()` function can get you the raw field value for programmatic needs.
    // NOTE: using this value will preclude editors from using experience editor on this field.
    // stick to the helpers for rendering general values when possible.
    this.rawFieldValue = getFieldValue(this.rendering, 'sample');
  }
}
