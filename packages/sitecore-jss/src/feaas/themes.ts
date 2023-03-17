import {
  ComponentRendering,
  HtmlElementRendering,
  LayoutServiceData,
  RouteData,
  getFieldValue,
} from '../layout';
import { HTMLHeadLink } from '../models';

/**
 * Pattern for library ids
 * @example -library--foo
 */
const FEAAS_LIBRARY_ID_REGEX = /-library--([^\s]+)/;

export const FEAAS_SERVER_URL = 'https://feaas.blob.core.windows.net';

/**
 * Walks through rendering tree and returns list of links of all FEAAS Component Library Stylesheets that are used
 * @param {LayoutServiceData} layoutData Layout service data
 * @param {string} [serverUrl] server URL, default is @see {FEAAS_SERVER_URL} url
 * @returns {HTMLHeadLink[]} library stylesheet links
 */
export function getFEAASLibraryStylesheetLinks(
  layoutData: LayoutServiceData,
  serverUrl?: string
): HTMLHeadLink[] {
  const ids = new Set<string>();

  if (!layoutData.sitecore.route) return [];

  traverseComponent(layoutData.sitecore.route, ids);

  return [...ids].map((id) => ({ href: getStylesheetUrl(id, serverUrl), rel: 'style' }));
}

export const getStylesheetUrl = (id: string, serverUrl?: string) =>
  `${serverUrl || FEAAS_SERVER_URL}/styles/${id}/published.css`;

/**
 * Traverse placeholder and components to add library ids
 * @param {Array<ComponentRendering | HtmlElementRendering>} components
 * @param {Set<string>} ids library ids
 */
const traversePlaceholder = (
  components: Array<ComponentRendering | HtmlElementRendering>,
  ids: Set<string>
) => {
  components.map((component) => {
    const rendering = component as ComponentRendering;

    return traverseComponent(rendering, ids);
  });
};

/**
 * Traverse component and children to add library ids
 * @param {RouteData | ComponentRendering | HtmlElementRendering} component component data
 * @param {Set<string>} ids library ids
 */
const traverseComponent = (
  component: RouteData | ComponentRendering | HtmlElementRendering,
  ids: Set<string>
) => {
  let libraryId: string | undefined = undefined;

  if ('fields' in component && component.fields) {
    // LibraryID in css class name takes precedence over LibraryId attribute
    libraryId =
      getFieldValue(component.fields, 'CSSStyles', '').match(FEAAS_LIBRARY_ID_REGEX)?.[1] ||
      getFieldValue(component.fields, 'LibraryId', '') ||
      undefined;
    // HTMLRendering its class attribute
  } else if ('attributes' in component && typeof component.attributes.class === 'string') {
    libraryId = component.attributes.class.match(FEAAS_LIBRARY_ID_REGEX)?.[1];
  }

  if (libraryId) {
    ids.add(libraryId);
  }

  const placeholders = (component as ComponentRendering).placeholders || {};

  Object.keys(placeholders).forEach((placeholder) => {
    traversePlaceholder(placeholders[placeholder], ids);
  });
};
