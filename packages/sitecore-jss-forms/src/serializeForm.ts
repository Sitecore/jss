// tslint:disable:max-line-length

import {
  FormField,
  ValueFormField,
  instanceOfButtonFormField,
  instanceOfFormFieldSection,
  instanceOfValueFormField,
} from './FormField';
import { getFieldValueFromModel } from './getFieldValueFromModel';
import { HtmlFormField } from './HtmlFormField';
import { JssFormData } from './JssFormData';
import { SitecoreForm } from './SitecoreForm';
import { FileInputViewModel, instanceOfInputViewModel } from './ViewModel';

export interface SerializeFormOptions {
  submitButtonName?: string | null;
  fieldValueParser?: (field: FormField<any>) => string | string[] | boolean;
}

/**
 * Serializes a Sitecore Form data into a format ready to POST to the server.
 * @param form The form schema data from the server
 * @param submitButtonName The name of the submit button that was clicked. Excludes other buttons from serialization. If not passed, all buttons are serialized.
 */
export function serializeForm(form: SitecoreForm, options?: SerializeFormOptions): JssFormData {
  if (!options) {
    options = {};
  }

  if (!options.fieldValueParser) {
    options.fieldValueParser = getFieldValueFromModel;
  }

  const result = new JssFormData();

  pushField(result, form.formSessionId);
  pushField(result, form.antiForgeryToken);
  pushField(result, form.formItemId);
  pushField(result, form.pageItemId);
  pushFields(result, form.fields, options);

  return result;
}

/**
 * @param {JssFormData} result
 * @param {Array<FormField>} fields
 * @param {SerializeFormOptions} options
 */
function pushFields(result: JssFormData, fields: FormField[], options: SerializeFormOptions) {
  fields.forEach((field) => {
    if (
      instanceOfButtonFormField(field) &&
      (!options.submitButtonName || field.buttonField.name === options.submitButtonName)
    ) {
      pushField(result, field.buttonField, (field.model as any).title);
      pushField(result, field.navigationButtonsField);
      pushField(result, field.navigationStepField);
    } else if (instanceOfValueFormField(field)) {
      pushField(result, field.indexField);
      pushField(result, field.fieldIdField);
      if (field.valueField.name.endsWith('.Files')) {
        const fileUploadField = field as ValueFormField<FileInputViewModel>;
        if (!fileUploadField.model.files) {
          return;
        }
      }

      // get stored value (i.e. if a multistep form)
      if (instanceOfInputViewModel(field.model) && options.fieldValueParser) {
        const fieldValue = options.fieldValueParser(field);
        if (Array.isArray(fieldValue)) {
          fieldValue.forEach((value) => pushField(result, field.valueField, value));
        } else {
          pushField(result, field.valueField, fieldValue.toString());
        }
      }
    } else if (instanceOfFormFieldSection(field)) {
      pushFields(result, field.fields, options);
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
