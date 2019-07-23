/**
 * Represents the components of a HTML form field
 * Used to pass field schema definitions and hidden field values from Sitecore Forms
 */
export interface HtmlFormField {
  name: string;
  id: string;
  value: string;
}
