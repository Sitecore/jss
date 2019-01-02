import { FormField, instanceOfButtonFormField, instanceOfFormFieldSection, instanceOfValueFormField } from './FormField';
import { HtmlFormField } from './HtmlFormField';
import { JssFormData } from './JssFormData';
import { SitecoreForm } from './SitecoreForm';
import { instanceOfInputViewModel } from './ViewModel';

/**
 * Serializes a Sitecore Form data into a format ready to POST to the server.
 * @param form The form schema data from the server
 * @param submitButtonName The name of the submit button that was clicked. Excludes other buttons from serialization. If not passed, all buttons are serialized.
 */
export function serializeForm(form: SitecoreForm, submitButtonName?: string): JssFormData {
  const result = new JssFormData();

  pushField(result, form.formSessionId);
  pushField(result, form.antiForgeryToken);
  pushField(result, form.formItemId);
  pushField(result, form.pageItemId);
  pushFields(result, form.fields, submitButtonName);

  return result;
}

function pushFields(result: JssFormData, fields: FormField[], submitButtonName?: string) {
  fields.forEach((field) => {
    if (instanceOfButtonFormField(field) && (!submitButtonName || field.buttonField.name === submitButtonName)) {
      pushField(result, field.buttonField, (field.model as any).title);
      pushField(result, field.navigationButtonsField);
      pushField(result, field.navigationStepField);
    } else if (instanceOfValueFormField(field)) {
      pushField(result, field.indexField);
      pushField(result, field.fieldIdField);
      // get stored value (i.e. if a multistep form)
      if (instanceOfInputViewModel(field.model)) {
        pushField(result, field.valueField, field.model.value);
      }
    } else if (instanceOfFormFieldSection(field)) {
      pushFields(result, field.fields);
    }
  });
}

function pushField(result: JssFormData, field: HtmlFormField, overrideValue?: string) {
  // the '' fallback prevents serializing 'null' as a string for empty field values ;)
  return pushFieldValue(result, field.name, overrideValue || field.value || '');
}

function pushFieldValue(result: JssFormData, fieldName: string, fieldValue: string) {
  if (!fieldName) {
    throw new Error('Field had no name');
  }

  result.append(fieldName, fieldValue);
}
