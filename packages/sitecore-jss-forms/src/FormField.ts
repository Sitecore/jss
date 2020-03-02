import { HtmlFormField } from './HtmlFormField';
import { InputViewModel, TitleFieldViewModel, ViewModel } from './ViewModel';

export interface FormField<TViewModel extends ViewModel = ViewModel> {
  model: TViewModel;
}

export function instanceOfFormField<T extends ViewModel>(object: any): object is FormField<T> {
  return 'model' in object;
}

export interface ValueFormField<TViewModel extends InputViewModel = InputViewModel> extends FormField<TViewModel> {
  indexField: HtmlFormField;
  fieldIdField: HtmlFormField;
  valueField: HtmlFormField;
}

export function instanceOfValueFormField(object: FormField<any>): object is ValueFormField<any> {
  return 'indexField' in object;
}

export interface ButtonFormField extends FormField<TitleFieldViewModel> {
  navigationButtonsField: HtmlFormField;
  navigationStepField: HtmlFormField;
  buttonField: HtmlFormField;
}

export function instanceOfButtonFormField(object: FormField): object is ButtonFormField {
  return 'buttonField' in object;
}

export interface FormFieldSection extends FormField<ViewModel> {
  fields: FormField[];
  cssClass?: string;
}

export function instanceOfFormFieldSection(object: FormField): object is FormFieldSection {
  return 'fields' in object;
}
