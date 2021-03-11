import { FormField } from './FormField';
import { FormModel } from './FormModel';
import { HtmlFormField } from './HtmlFormField';

/** The model returned from the Sitecore Forms JSON API for a form schema */
export interface SitecoreForm {
  htmlPrefix: string;
  contextItemId: string;
  formSessionId: HtmlFormField;
  formItemId: HtmlFormField;
  pageItemId: HtmlFormField;
  antiForgeryToken: HtmlFormField;
  metadata: FormModel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: Array<FormField<any>>;
}
