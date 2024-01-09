export interface ImageFieldValue {
  src?: string;
  alt?: string;
  height?: string;
  width?: string;
}

export interface ImageField {
  value?: ImageFieldValue;
  editable?: string;
  mediaUrlPrefix?: RegExp;
}