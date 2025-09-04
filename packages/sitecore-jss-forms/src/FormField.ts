import { HtmlFormField } from './HtmlFormField';
import { InputViewModel, TitleFieldViewModel, ViewModel, FieldViewModel } from './ViewModel';

export interface FormField<TViewModel extends ViewModel = ViewModel> {
  [key: string]: unknown;
  model: TViewModel;
}

/**
 * @param {object} object
 */
export function instanceOfFormField<T extends ViewModel>(object: {
  [key: string]: unknown;
}): object is FormField<T> {
  return 'model' in object;
}

export interface ValueFormField<TViewModel extends InputViewModel = InputViewModel>
  extends FormField<TViewModel> {
  indexField: HtmlFormField;
  fieldIdField: HtmlFormField;
  valueField: HtmlFormField;
}

/**
 * @param {FormField} object
 */
export function instanceOfValueFormField<T extends InputViewModel>(
  object: FormField<ViewModel>
): object is ValueFormField<T> {
  return 'indexField' in object;
}

export interface ButtonFormField extends FormField<TitleFieldViewModel> {
  navigationButtonsField: HtmlFormField;
  navigationStepField: HtmlFormField;
  buttonField: HtmlFormField;
}

/**
 * @param {FormField} object
 */
export function instanceOfButtonFormField(object: FormField): object is ButtonFormField {
  return 'buttonField' in object;
}

export interface FormFieldSection extends FormField<FieldViewModel> {
  fields: FormField[];
}

/**
 * @param {FormField} object
 */
export function instanceOfFormFieldSection(object: FormField): object is FormFieldSection {
  return 'fields' in object;
}
