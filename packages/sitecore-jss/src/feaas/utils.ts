import {
  ComponentRendering,
  HtmlElementRendering,
  LayoutServiceData,
  RouteData,
  getFieldValue,
  reduceLayout,
} from '../layout';

// parse id of a library from css class in format `-library--id`
export const FEAAS_LIBRARY_ID_REGEX = /-library--([^\s]+)/;

/**
 * Walks through rendering tree and returns list of ids of all FEAAS Component Libraries that are used
 * @param {LayoutServiceData | RouteData | ComponentRendering | HtmlElementRendering | null } object Layout, route data or rendering
 */
export function getFEAASLibraryIds(
  object: LayoutServiceData | RouteData | ComponentRendering | HtmlElementRendering | null
) {
  return reduceLayout(
    object,
    (initialValue, node) => {
      let libraryId: string | undefined = undefined;

      if ('fields' in node && node.fields) {
        // LibraryID in css class name takes precedence over LibraryId attribute
        libraryId =
          getFieldValue(node.fields, 'CSSStyles', '').match(FEAAS_LIBRARY_ID_REGEX)?.[1] ||
          getFieldValue(node.fields, 'LibraryId', '') ||
          undefined;
        // HTMLRendering its class attribute
      } else if ('attributes' in node && typeof node.attributes.class === 'string') {
        libraryId = node.attributes.class.match(FEAAS_LIBRARY_ID_REGEX)?.[1];
      }

      if (libraryId && !initialValue.includes(libraryId)) {
        return initialValue.concat(libraryId);
      }

      return initialValue;
    },
    [] as string[]
  );
}

/**
 * Format URL for FEAAS Library stylesheet
 * @param libraryId ID of a library that maintains stylesheet
 * @param hostname CDN hostname
 * - 'https://feaas.blob.core.windows.net' for production
 * - 'https://feaasstaging.blob.core.windows.net' for staging
 */
export function getFEAASLibraryStylesheetURL(
  libraryId: string,
  hostname = 'https://feaas.blob.core.windows.net'
) {
  return `${hostname}/styles/${libraryId}/published.css`;
}
