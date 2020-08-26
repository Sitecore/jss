import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ROUTES } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JssModule, DYNAMIC_COMPONENT } from '@sitecore-jss/sitecore-jss-angular';

import { DynamicFieldDirective } from './directives/dynamic-field/dynamic-field.directive';
import { ReplaceTagDirective } from './directives/replace-tag/replace-tag.directive';

import { FormComponent } from './form/form.component';

import { LabelComponent } from './fields/label/label.component';
import { SectionComponent } from './fields/section/section.component';
import { TextComponent } from './fields/text/text.component';

import { ButtonComponent } from './fields/button/button.component';

import { SingleLineTextComponent } from './fields/single-line-text/single-line-text.component';
import { MultiLineTextComponent } from './fields/multi-line-text/multi-line-text.component';
import { NumberComponent } from './fields/number/number.component';
import { EmailComponent } from './fields/email/email.component';
import { DateComponent } from './fields/date/date.component';

import { CheckboxComponent } from './fields/checkbox/checkbox.component';
import { CheckboxListComponent } from './fields/checkbox-list/checkbox-list.component';
import { RadioButtonListComponent } from './fields/radio-button-list/radio-button-list.component';
import { DropdownListComponent } from './fields/dropdown-list/dropdown-list.component';
import { ListBoxComponent } from './fields/list-box/list-box.component';
import { PasswordComponent } from './fields/password/password.component';
import { TelephoneComponent } from './fields/telephone/telephone.component';
import { FormStateService } from './services/form-state.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JssModule,
    {
      ngModule: JssModule,
      providers: [
        {
          provide: DYNAMIC_COMPONENT,
          useValue: {
            'Form' : FormComponent,
          }
        },
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [
            { name: 'Form', type: FormComponent },
          ],
          multi: true
        }, 
        {
          provide: ROUTES,
          useValue: [],
          multi: true
        },
      ]
    }
  ],
  providers: [FormStateService],
  exports: [
    CommonModule,
  ],
  declarations: [
    FormComponent,
    DynamicFieldDirective,
    ReplaceTagDirective,
    ButtonComponent,
    SingleLineTextComponent,
    MultiLineTextComponent,
    NumberComponent,
    EmailComponent,
    DateComponent,
    PasswordComponent,
    TelephoneComponent,
    CheckboxComponent,
    CheckboxListComponent,
    RadioButtonListComponent,
    DropdownListComponent,
    ListBoxComponent,
    LabelComponent,
    SectionComponent,
    TextComponent,
  ],
  bootstrap: [
    ButtonComponent,
    SingleLineTextComponent,
    MultiLineTextComponent,
    NumberComponent,
    EmailComponent,
    DateComponent,
    CheckboxComponent,
    PasswordComponent,
    TelephoneComponent,
    CheckboxListComponent,
    RadioButtonListComponent,
    DropdownListComponent,
    ListBoxComponent,
    LabelComponent,
    SectionComponent,
    TextComponent,
  ],
})
export class JssFormsModule { }