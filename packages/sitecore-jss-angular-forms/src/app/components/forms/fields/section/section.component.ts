import { Component, OnInit } from '@angular/core';
import { FormFieldSection, FormField } from '@sitecore-jss/sitecore-jss-forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html'
})
export class SectionComponent implements OnInit {
  field: FormFieldSection;
  fields: FormField[];
  group: FormGroup;

  public constructor() { }

  public ngOnInit(): void { 
    this.fields = this.field.fields;
  }
}
