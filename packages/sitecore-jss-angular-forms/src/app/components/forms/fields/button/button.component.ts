import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ButtonFormField } from '@sitecore-jss/sitecore-jss-forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {
  field: ButtonFormField;
  group: FormGroup;

  public constructor() { }

  public ngOnInit(): void { }
}
