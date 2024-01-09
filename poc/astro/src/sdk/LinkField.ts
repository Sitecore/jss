export interface LinkFieldValue {
  [attributeName: string]: any;
  href?: string;
  title?: string;
  target?: string;
  querystring?: string;
}

export interface LinkField {
  value: LinkFieldValue;
  editableFirstPart?: string;
  editableLastPart?: string;
}