import { SitecoreForm } from './SitecoreForm';

export interface FormResult {
  success: boolean;
  redirectUrl?: string;
  errors: string[];
  validationErrors: FieldValidationErrors;
  nextForm?: SitecoreForm;
}

export interface FieldValidationErrors {
  [key: string]: string[];
}
