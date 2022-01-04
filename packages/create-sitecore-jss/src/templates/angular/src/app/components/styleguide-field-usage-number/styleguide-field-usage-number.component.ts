import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering, getFieldValue } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Demonstrates usage of a Number (decimal) content field within JSS.
 */
@Component({
  selector: 'app-styleguide-field-usage-number',
  templateUrl: './styleguide-field-usage-number.component.html',
})
export class StyleguideFieldUsageNumberComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  valueType: string;
  fieldValue: number;

  ngOnInit() {
    // the getFieldValue() helper can be used to safely retrieve a field value from the raw rendering data
    const rawValue = getFieldValue<number>(this.rendering, 'sample');

    this.valueType = typeof rawValue;
    this.fieldValue = rawValue;
  }
}
