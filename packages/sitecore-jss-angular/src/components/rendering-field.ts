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

// tslint:disable-next-line:no-empty-interface
export interface RichTextField extends RenderingField { }

// tslint:disable-next-line:no-empty-interface
export interface TextField extends RenderingField { }
