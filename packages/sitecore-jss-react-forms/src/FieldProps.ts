import { FormField, ValueFormField, ListViewModel, InputViewModel, ViewModel } from '@sitecore-jss/sitecore-jss-forms';

export interface FieldProps<TFormField extends FormField = FormField> {
  /** Form field schema data */
  field: TFormField;
  /** Function that can be called to create child form field components (used for sections) */
  fieldFactory: (field: FormField) => React.ReactNode;
  /** Callback for when a submit button is clicked. Tells the parent form which button was clicked when a submit occurs. */
  onButtonClick: (buttonFieldName: string) => void;

  key?: string;
}

export interface FieldWithValueProps<TFormField extends FormField = FormField, TValueType extends string | string[] = string> extends FieldProps<TFormField> {
  /** Form field schema data */
  field: TFormField;
  /** The current value of the form field */
  value: TValueType;
  /** Whether the field is currently in a valid state (always starts as true until user input) */
  isValid: boolean;
  /** If the field is not valid, this contains a list of messages detailing why */
  errors: string[];
  /** Function that can be called to create child form field components (used for sections) */
  fieldFactory: (field: FormField) => React.ReactNode;
  /** Callback for when the value of the form field changes. Will cause the parent form state and value prop to be updated. */
  onChange: FieldChangeCallback;
  /** Callback for when a submit button is clicked. Tells the parent form which button was clicked when a submit occurs. */
  onButtonClick: (buttonFieldName: string) => void;

  key?: string;
}

export type FieldChangeCallback = (fieldName: string, newValue: string | string[], isValid: boolean, errorMessages: string[]) => void;

export type ListFieldProps<TViewModel extends ListViewModel = ListViewModel> = FieldWithValueProps<ValueFormField<TViewModel>, string[]>;
export type ValueFieldProps<TViewModel extends InputViewModel = InputViewModel> = FieldWithValueProps<ValueFormField<TViewModel>>;
