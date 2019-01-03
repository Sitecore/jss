import { FormField } from './FormField';
import { instanceOfInputViewModel, instanceOfListViewModel } from './ViewModel';

/** Retrieves the current value of a form field from the form model returned from the JSON API */
export function getFieldValueFromModel(field: FormField) {
  if (instanceOfListViewModel(field.model)) {
    // field state from API view-model items (list fields with possible multi-select)
    // we map this into an array of selected values
    return field.model.items.filter((item) => item.selected).map((item) => item.value);
  }

  if (instanceOfInputViewModel(field.model)) {
    // field state from API view-model value (single valued fields)
    return field.model.value || '';
  }

  // the model cannot be null or undefined as in React a controlled field must be bound to a non-null value
  return '';
}
