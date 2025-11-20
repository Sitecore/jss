import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering, getFieldValue } from '@sitecore-jss/sitecore-jss-angular';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';

/**
 * Demonstrates usage of a Checkbox (boolean) content field within JSS.
 */
@Component({
  selector: 'app-styleguide-field-usage-checkbox',
  templateUrl: './styleguide-field-usage-checkbox.component.html',
  imports: [StyleguideSpecimenComponent]
})
export class StyleguideFieldUsageCheckboxComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  checkbox1Value: boolean;
  checkbox2Value: boolean;

  ngOnInit() {
    /*
      The getFieldValue helper allows safely extracting a field value that could be undefined,
      without needing to check that props.fields or props.fields.checkbox are traversable,
      and allowing the specification of an optional default value (default is undefined if unspecified).
    */
   this.checkbox1Value = getFieldValue<boolean>(this.rendering, 'checkbox');
   this.checkbox2Value = getFieldValue<boolean>(this.rendering, 'checkbox2');
  }
}
