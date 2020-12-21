import { FormResult } from './FormResult';
import { JssFormData } from './JssFormData';

export type FormFetcher = (formData: JssFormData, endpoint: string) => Promise<FormResult>;

export interface FormSubmitOptions {
  fetcher?: FormFetcher;
}

export function createFetchBasedFormFetcher(options?: RequestInit): FormFetcher {
  return (formData: JssFormData, endpoint: string) =>
    fetch(endpoint, {
      body: formData.toMultipartFormData(),
      method: 'post',
      // IMPORTANT: Sitecore forms relies on cookies for some state management, so credentials must be included.
      credentials: 'include',
      // Browser set 'Content-Type' automatically with multipart/form-data; boundary
      ...options,
    })
      .then((res) => res.json())
      .then((res) => res as FormResult);
}

export function submitForm(
  formData: JssFormData,
  endpoint: string,
  options?: FormSubmitOptions
): Promise<FormResult> {
  options = options || {};

  if (!options.fetcher) {
    options.fetcher = createFetchBasedFormFetcher();
  }

  return options.fetcher(formData, endpoint);
}
