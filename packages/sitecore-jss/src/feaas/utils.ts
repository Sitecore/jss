import {
  ComponentRendering,
  HtmlElementRendering,
  LayoutServiceData,
  RouteData,
  reduceLayout,
} from '../layout';

/**
 * Walks through rendering tree and returns list of ids of all FEAAS Component Libraries that are used
 * @param {LayoutServiceData | RouteData<any> | ComponentRendering | HtmlElementRendering | null } object Layout, route data or rendering
 */
export function getFEAASLibraryIds(
  object: LayoutServiceData | RouteData<any> | ComponentRendering | HtmlElementRendering | null
) {
  return reduceLayout(
    object,
    (initialValue, node) => {
      let libraryId: string | undefined = undefined;

      if ('fields' in node && node.fields !== undefined) {
        // Read out FEAASComponent's libraryid
        if (node.fields.LibraryId) {
          if ('value' in node.fields.LibraryId && typeof node.fields.LibraryId.value === 'string') {
            libraryId = node.fields.LibraryId.value;
          }
        }
        // Check CSSStyles override
        if (node.fields.CSSStyles) {
          if ('value' in node.fields.CSSStyles && typeof node.fields.CSSStyles.value === 'string') {
            libraryId = node.fields.CSSStyles.value.match(/-library--([^\s]+)/)?.[1] || libraryId;
          }
        }
        // HTMLRendering its class attribute
      } else if ('attributes' in node && typeof node.attributes.class === 'string') {
        libraryId = node.attributes.class.match(/-library--([^\s]+)/)?.[1];
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
