import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValueFormField, ListBoxViewModel, ListFieldItem, FormTracker } from '@sitecore-jss/sitecore-jss-forms';
import { FormStateService } from '../../services/form-state.service';

@Component({
  selector: 'app-list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.scss']
})
export class ListBoxComponent implements OnInit {
  field: ValueFormField<ListBoxViewModel>;
  group: FormGroup;
  tracker: FormTracker;

  public items: ListFieldItem[];

  public constructor(private formState: FormStateService) { }

  public ngOnInit(): void { 
    this.items = this.field.model.items;
  }
 
  onChange($event): void {
    let valid = true;
    let options = $event.target.options;

    const errorMessages = [];
    const newValues = [];

    for (let i = 0; i < options.length; i += 1) {
      if (options[i].selected) {
        newValues.push(options[i].value);
      }
    }

    // custom client validation logic here
    if (this.field.model.required && newValues.length === 0) {
      valid = false;
      errorMessages.push(`${this.field.model.title} is required`);
    }

    this.formState.setFieldState(this.field.valueField.name, newValues, valid, errorMessages);
  }

  onFocus($event): void {
    this.tracker.onFocusField(this.field, <string>this.field.model.value);
  }

  onBlur($event): void {
    this.tracker.onBlurField(this.field, <string>this.field.model.value);
  }
}
