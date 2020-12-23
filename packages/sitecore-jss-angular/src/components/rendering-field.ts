/* eslint-disable @typescript-eslint/no-empty-interface */
export interface RenderingField {
  value?: any;
  editable?: string;
}

export interface FileField extends RenderingField {
  src?: string;
}

export interface ImageField extends RenderingField {
  src?: string;
}

export interface LinkField extends RenderingField {
  href?: string;
  text?: string;
  editableFirstPart?: string;
  editableLastPart?: string;
}

export interface RichTextField extends RenderingField {}

export interface TextField extends RenderingField {}
