/** The model for a given field's data elements */

export interface ValidationDataModel {
  itemId: string;
  message: string;
  name: string;
}

export interface ViewModel {
  itemId: string;
  name: string;
  templateId: string;
  fieldTypeItemId: string;
  validationDataModels: ValidationDataModel[];
}

export interface TextViewModel extends ViewModel {
  htmlTag?: string;
  cssClass?: string;
  text?: string;
}

export interface FieldViewModel extends ViewModel {
  cssClass?: string;
}

export interface TitleFieldViewModel extends FieldViewModel {
  title: string;
  labelCssClass?: string;
}

export interface InputViewModel extends TitleFieldViewModel {
  required: boolean;
  isTrackingEnabled: boolean;
  value: string | boolean;
}

export function instanceOfInputViewModel(object: ViewModel): object is InputViewModel {
  return 'value' in object;
}

export interface DateInputViewModel extends InputViewModel {
  min?: string;
  max?: string;
}

export interface NumberInputViewModel extends InputViewModel {
  min?: number;
  max?: number;
  step?: number;
}

export interface FileInputViewModel extends InputViewModel {
  isMultiple: boolean;
  maxFileCount: number;
  maxFileSize: number;
  fileSizeUnit: number;
  allowedContentTypes: string;
  files: File[];
}

export interface StringInputViewModel extends InputViewModel {
  minLength?: number;
  maxLength?: number;
  placeholderText?: string;
}

export interface MultiLineStringInputViewModel extends StringInputViewModel {
  rows?: number;
}

export function instanceOfListViewModel(object: ViewModel): object is ListViewModel {
  return 'items' in object;
}

export interface ListViewModel extends InputViewModel {
  items: ListFieldItem[];
}

export interface DropdownListViewModel extends ListViewModel {
  showEmptyItem: boolean;
}

export interface ListBoxViewModel extends ListViewModel {
  rows: number;
  multipleSelection: boolean;
}

export interface ListFieldItem {
  itemId: string;
  selected: boolean;
  text?: string;
  value: string;
}
