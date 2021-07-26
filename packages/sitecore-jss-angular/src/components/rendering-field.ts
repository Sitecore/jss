/* eslint-disable @typescript-eslint/no-empty-interface */
export interface RenderingField {
  value?: { [key: string]: unknown };
  editable?: string;
}

export interface DateField {
  value?: string | number | Date;
  editable?: string;
}

export interface FileField extends RenderingField {
  src?: string;
  title?: string;
  displayName?: string;
}

export interface ImageFieldValue {
  [key: string]: unknown;
  src?: string;
  srcSet?: {
    [key: string]: string | number | undefined;
  }[];
}

export interface ImageField extends ImageFieldValue, RenderingField {
  value?: ImageFieldValue;
}

export interface LinkFieldValue {
  [key: string]: unknown;
  href?: string;
  text?: string;
}

export interface LinkField extends LinkFieldValue, RenderingField {
  value?: LinkFieldValue;
  editableFirstPart?: string;
  editableLastPart?: string;
}

export interface RichTextField extends RenderingField {}

export interface TextField extends RenderingField {}
