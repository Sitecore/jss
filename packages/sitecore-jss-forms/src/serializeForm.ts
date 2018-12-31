import { FormField, instanceOfButtonFormField, instanceOfFormFieldSection, instanceOfValueFormField } from './FormField';
import { HtmlFormField } from './HtmlFormField';
import { JssFormData } from './JssFormData';
import { SitecoreForm } from './SitecoreForm';

export function serializeForm(form: SitecoreForm): JssFormData {
  const result = new JssFormData();

  pushField(result, form.formSessionId);
  pushField(result, form.antiForgeryToken);
  pushField(result, form.formItemId);
  pushField(result, form.pageItemId);
  pushFields(result, form.fields);

  return result;
}

function pushFields(result: JssFormData, fields: FormField[]) {
  fields.forEach((field) => {
    if (instanceOfButtonFormField(field)) {
      pushField(result, field.buttonField, (field.model as any).title);
      pushField(result, field.navigationButtonsField);
      pushField(result, field.navigationStepField);
    } else if (instanceOfValueFormField(field)) {
      pushField(result, field.indexField);
      pushField(result, field.fieldIdField);
      pushField(result, field.valueField);
    } else if (instanceOfFormFieldSection(field)) {
      pushFields(result, field.fields);
    }
  });
}

function pushField(result: JssFormData, field: HtmlFormField, overrideValue?: string) {
  return pushFieldValue(result, field.name, overrideValue || field.value);
}

function pushFieldValue(result: JssFormData, fieldName: string, fieldValue: string) {
  if (!fieldName) {
    throw new Error('Field had no name');
  }

  result.append(fieldName, fieldValue);
}
