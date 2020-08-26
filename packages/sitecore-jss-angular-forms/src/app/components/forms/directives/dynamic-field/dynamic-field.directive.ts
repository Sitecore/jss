import { Input, ComponentFactoryResolver, Directive, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField, FormTracker } from '@sitecore-jss/sitecore-jss-forms';
import { FieldTypes } from '../../FieldTypes';

import { SectionComponent } from '../../fields/section/section.component';
import { TextComponent } from '../../fields/text/text.component';

import { ButtonComponent } from '../../fields/button/button.component';

import { SingleLineTextComponent } from '../../fields/single-line-text/single-line-text.component';
import { MultiLineTextComponent } from '../../fields/multi-line-text/multi-line-text.component';
import { NumberComponent } from '../../fields/number/number.component';
import { EmailComponent } from '../../fields/email/email.component';
import { DateComponent } from '../../fields/date/date.component';
import { CheckboxComponent } from '../../fields/checkbox/checkbox.component';
import { CheckboxListComponent } from '../../fields/checkbox-list/checkbox-list.component';
import { RadioButtonListComponent } from '../../fields/radio-button-list/radio-button-list.component';
import { DropdownListComponent } from '../../fields/dropdown-list/dropdown-list.component';
import { ListBoxComponent } from '../../fields/list-box/list-box.component';
import { TelephoneComponent } from '../../fields/telephone/telephone.component';
import { PasswordComponent } from '../../fields/password/password.component';

const componentMapper = { 
  [FieldTypes.Section] : SectionComponent,
  [FieldTypes.TextField] : TextComponent,

  [FieldTypes.SingleLineText] : SingleLineTextComponent,
  [FieldTypes.NumberField] : NumberComponent,
  [FieldTypes.Email] : EmailComponent,
  [FieldTypes.DateField] : DateComponent,
  [FieldTypes.Telephone] : TelephoneComponent,
  [FieldTypes.Password] : PasswordComponent,

  [FieldTypes.Checkbox] : CheckboxComponent,

  [FieldTypes.MultipleLineText] : MultiLineTextComponent,

  [FieldTypes.CheckboxList] : CheckboxListComponent,
  [FieldTypes.RadioButtonList] : RadioButtonListComponent,
  [FieldTypes.DropdownList] : DropdownListComponent,
  [FieldTypes.ListBox] : ListBoxComponent,

  [FieldTypes.Button] : ButtonComponent,
}

@Directive({
  selector: '[dynamicField]'
})

export class DynamicFieldDirective {
  @Input() field: FormField;
  @Input() group: FormGroup;
  @Input() tracker: FormTracker;

  componentRef: any;

  public constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { 
    
  }

  public ngOnInit() : void {
    const component = componentMapper[this.field.model.fieldTypeItemId];

    if (component !== undefined) {
      const factory = this.resolver.resolveComponentFactory(component);

      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.group = this.group;
      this.componentRef.instance.tracker = this.tracker;
    }
  }
}
