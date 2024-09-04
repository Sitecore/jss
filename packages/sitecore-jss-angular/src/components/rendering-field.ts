/* eslint-disable @typescript-eslint/no-empty-interface */
import { FieldMetadata, GenericFieldValue } from '@sitecore-jss/sitecore-jss/layout';

export interface RenderingField<V = GenericFieldValue> extends FieldMetadata {
  value?: V;
  editable?: string;
}

export interface DateField extends RenderingField<string | number | Date> {}

export interface FileFieldValue {
  src?: string;
  title?: string;
  displayName?: string;
}

export interface FileField extends FileFieldValue, RenderingField<FileFieldValue> {}

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
  anchor?: string;
}

export interface LinkField extends LinkFieldValue, RenderingField {
  value?: LinkFieldValue;
  editableFirstPart?: string;
  editableLastPart?: string;
}

export interface RichTextField extends RenderingField<string> {}

export interface TextField extends RenderingField<string> {}
