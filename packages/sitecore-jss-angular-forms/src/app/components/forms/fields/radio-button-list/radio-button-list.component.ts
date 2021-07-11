import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValueFormField, ListViewModel, ListFieldItem, FormTracker } from '@sitecore-jss/sitecore-jss-forms';
import { FormStateService } from '../../services/form-state.service';

@Component({
  selector: 'app-radio-button-list',
  templateUrl: './radio-button-list.component.html',
  styleUrls: ['./radio-button-list.component.scss']
})
export class RadioButtonListComponent implements OnInit {
  field: ValueFormField<ListViewModel>;
  group: FormGroup;
  tracker: FormTracker;

  public items: ListFieldItem[];

  public constructor(private formState: FormStateService) { }

  public ngOnInit(): void { 
    this.items = this.field.model.items;
  }
  
  onChange($event): void {
    let valid = true;
    const errorMessages = [];

    // custom client validation logic here
    if (this.field.model.required && !$event.target.value) {
      valid = false;
      errorMessages.push(`${this.field.model.title} is required`);
    }

    this.formState.setFieldState(this.field.valueField.name, $event.target.value, valid, errorMessages);
  }

  onFocus($event): void {
    this.tracker.onFocusField(this.field, <string>this.field.model.value);
  }

  onBlur($event): void {
    this.tracker.onBlurField(this.field, <string>this.field.model.value);
  }
}
