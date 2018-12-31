import { FormField } from './FormField';
import { FormModel } from './FormModel';
import { HtmlFormField } from './HtmlFormField';

export interface SitecoreForm {
  htmlPrefix: string;
  formSessionId: HtmlFormField;
  formItemId: HtmlFormField;
  pageItemId: HtmlFormField;
  antiForgeryToken: HtmlFormField;
  metadata: FormModel;
  fields: FormField[];
}
