import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValueFormField, ListViewModel, ListFieldItem, FormTracker } from '@sitecore-jss/sitecore-jss-forms';
import { FormStateService } from '../../services/form-state.service';


@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss']
})
export class CheckboxListComponent implements OnInit {
  field: ValueFormField<ListViewModel>;
  group: FormGroup;
  tracker: FormTracker;
  value: string[];

  public items: ListFieldItem[];

  public constructor(private formState: FormStateService) { }

  public ngOnInit(): void { 
    this.items = this.field.model.items;

    this.value = this.items
      .filter(i => i.selected)
      .map(i => i.value);
  }

  onChange($event): void {
    let valid = true;
    const errorMessages = [];

    if ($event.target.checked) {
      this.value.push($event.target.value);
    }
    else {
      this.value.filter(v => v !== $event.target.value);
    }

    if (this.field.model.required && !this.value.length) {
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
