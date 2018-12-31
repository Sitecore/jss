import { HtmlFormField } from './HtmlFormField';
import { ViewModel } from './ViewModel';

export interface FormField {
  model: ViewModel;
}

export interface ValueFormField extends FormField {
  indexField: HtmlFormField;
  fieldIdField: HtmlFormField;
  valueField: HtmlFormField;
}

export function instanceOfValueFormField(object: FormField): object is ValueFormField {
  return 'indexField' in object;
}

export interface ButtonFormField extends FormField {
  navigationButtonsField: HtmlFormField;
  navigationStepField: HtmlFormField;
  buttonField: HtmlFormField;
}

export function instanceOfButtonFormField(object: FormField): object is ButtonFormField {
  return 'buttonField' in object;
}

export interface FormFieldSection extends FormField {
  fields: FormField[];
}

export function instanceOfFormFieldSection(object: FormField): object is FormFieldSection {
  return 'fields' in object;
}
