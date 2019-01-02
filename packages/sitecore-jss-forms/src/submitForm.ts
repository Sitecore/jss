import { FormResult } from './FormResult';
import { JssFormData } from './JssFormData';

export interface FormSubmitOptions {
  fetcher?: (formData: JssFormData, endpoint: string) => Promise<FormResult>;
}

export function createFetchBasedFetcher(options?: RequestInit) {
  return (formData: JssFormData, endpoint: string) => fetch(endpoint, {
    // IMPORTANT: Sitecore's antiforgery tokens require x-www-form-urlencoded to validate correctly.
    body: formData.toUrlEncodedFormData(),
    method: 'post',
    // IMPORTANT: Sitecore forms relies on cookies for some state management, so credentials must be included.
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...options,
  })
  .then((res) => res.json())
  .then((res) => res as FormResult);
}

export function submitForm(formData: JssFormData, endpoint: string, options?: FormSubmitOptions): Promise<FormResult> {
  options = options || {};

  if (!options.fetcher) {
    options.fetcher = createFetchBasedFetcher();
  }

  return options.fetcher(formData, endpoint);
}
