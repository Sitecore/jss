import { form } from '@sitecore-cloudsdk/events/browser';
import { getEdgeProxyFormsUrl } from '../graphql';
import debug from '../debug';

/**
 * Fetches the form markup from the Sitecore Edge service and renders it in the component's template.
 * @param {string} contextId - The unique identifier of the current context
 * @param {string} formId - The unique identifier of the form
 * @param {string} [edgeUrl] - The URL of the Sitecore Edge Platform
 */
export const loadForm = async (contextId: string, formId: string, edgeUrl?: string) => {
  if (!contextId) {
    debug.form('Form was not able to render since context id was not provided');

    return '';
  }

  const url = getEdgeProxyFormsUrl(contextId, formId, edgeUrl);

  try {
    debug.form(`Fetching form data from ${url}`);

    const rsp = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
    });

    if (rsp.status !== 200) {
      throw new Error('Failed to fetch form data');
    }

    const content = await rsp.text();

    debug.form(`Form data fetch response: ${content}`);

    return content;
  } catch (error) {
    debug.form(`Form '${formId}' was not able to render`, error);

    throw error;
  }
};

/**
 * When you set the innerHTML property of an element, the browser does not execute any <script> tags included in the HTML string
 * This method ensures that any <script> elements within the loaded HTML are executed.
 * It re-creates the script elements and appends the to the component's template, then removes old script elements to avoid duplication.
 * @param {HTMLElement} rootElement - The root element to execute script elements within
 */
export const executeScriptElements = (rootElement: HTMLElement) => {
  const scriptElements = rootElement.querySelectorAll('script');

  if (!scriptElements) {
    return;
  }

  Array.from(scriptElements).forEach((scriptElement) => {
    const clonedElement = document.createElement('script');

    Array.from(scriptElement.attributes).forEach((attribute) => {
      clonedElement.setAttribute(attribute.name, attribute.value);
    });

    clonedElement.text = scriptElement.text;

    scriptElement?.parentNode?.replaceChild(clonedElement, scriptElement);
  });
};

/**
 * Subscribes to the Form event and then sends data to CloudSDK.
 * This listener captures interactions such as form views or submissions
 * @param {HTMLElement} formElement - The form element to subscribe to events on
 * @param {string} [componentId] - The unique identifier of the component
 */
export const subscribeToFormSubmitEvent = (formElement: HTMLElement, componentId?: string) => {
  formElement.addEventListener('form:engage', ((
    e: CustomEvent<{ formId: string; name: 'VIEWED' | 'SUBMITTED' }>
  ) => {
    const { formId, name } = e.detail;

    if (formId && name) {
      debug.form('Sending form event', formId, name);

      form(formId, name, componentId?.replace(/-/g, '') || '');
    }
  }) as EventListener);
};
