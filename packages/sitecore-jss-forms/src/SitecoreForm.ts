import { FormField } from './FormField';
import { FormModel } from './FormModel';
import { HtmlFormField } from './HtmlFormField';

/** The model returned from the Sitecore Forms JSON API for a form schema */
export interface SitecoreForm {
  htmlPrefix: string;
  formSessionId: HtmlFormField;
  formItemId: HtmlFormField;
  pageItemId: HtmlFormField;
  antiForgeryToken: HtmlFormField;
  metadata: FormModel;
  fields: FormField[];
}
