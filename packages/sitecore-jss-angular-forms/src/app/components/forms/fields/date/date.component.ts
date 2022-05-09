import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValueFormField, DateInputViewModel, FormTracker } from '@sitecore-jss/sitecore-jss-forms';
import { FormStateService } from '../../services/form-state.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html'
})
export class DateComponent implements OnInit {
  field: ValueFormField<DateInputViewModel>;
  group: FormGroup;
  tracker: FormTracker;

  public constructor(private formState: FormStateService) { }

  public ngOnInit(): void { }

  public formatDateValue(value: string): string {
    if (!value || value.length < 10) {
      return value;
    }
    return value.substring(0, 10);
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
    this.tracker.onFocusField(this.field, $event.target.value);
  }

  onBlur($event): void {
    this.tracker.onBlurField(this.field, $event.target.value);
  }
}
