import { SITECORE_EDGE_URL_DEFAULT } from '../constants';
import {
  ComponentRendering,
  Field,
  HtmlElementRendering,
  Item,
  LayoutServiceData,
  RouteData,
} from './index';
import { HTMLLink } from '../models';

/**
 * Regular expression to check if the content styles are used in the field value
 */
const CLASS_REGEXP = /class=".*(\bck-content\b).*"/g;

type Config = { loadStyles: boolean };

/**
 * Get the content styles link to be loaded from the Sitecore Edge Platform
 * @param {LayoutServiceData} layoutData Layout service data
 * @param {string} sitecoreEdgeContextId Sitecore Edge Context ID
 * @param {string} [sitecoreEdgeUrl] Sitecore Edge Platform URL. Default is https://edge-platform.sitecorecloud.io
 * @returns {HTMLLink | null} content styles link, null if no styles are used in layout
 */
export const getContentStylesheetLink = (
  layoutData: LayoutServiceData,
  sitecoreEdgeContextId: string,
  sitecoreEdgeUrl = SITECORE_EDGE_URL_DEFAULT
): HTMLLink | null => {
  if (!layoutData.sitecore.route) return null;

  const config: Config = { loadStyles: false };

  traverseComponent(layoutData.sitecore.route, config);

  if (!config.loadStyles) return null;

  return {
    href: getContentStylesheetUrl(sitecoreEdgeContextId, sitecoreEdgeUrl),
    rel: 'stylesheet',
  };
};

export const getContentStylesheetUrl = (
  sitecoreEdgeContextId: string,
  sitecoreEdgeUrl = SITECORE_EDGE_URL_DEFAULT
): string =>
  `${sitecoreEdgeUrl}/v1/files/pages/styles/content-styles.css?sitecoreContextId=${sitecoreEdgeContextId}`;

export const traversePlaceholder = (
  components: Array<ComponentRendering | HtmlElementRendering>,
  config: Config
) => {
  if (config.loadStyles) return;

  components.forEach((component) => {
    traverseComponent(component, config);
  });
};

export const traverseField = (field: Field | Item | Item[] | undefined, config: Config) => {
  if (!field || config.loadStyles) return;
  if (typeof field === 'string' && field) return;
  if ('editable' in field && field.editable) {
    config.loadStyles = CLASS_REGEXP.test(field.editable);
  } else if ('value' in field && typeof field.value === 'string') {
    config.loadStyles = CLASS_REGEXP.test(field.value);
  } else if ('fields' in field) {
    Object.values(field.fields).forEach((field) => {
      traverseField(field, config);
    });
  } else if (Array.isArray(field)) {
    field.forEach((field) => {
      traverseField(field, config);
    });
  }
};

export const traverseComponent = (
  component: RouteData | ComponentRendering | HtmlElementRendering,
  config: Config
) => {
  if (config.loadStyles) return;

  if ('fields' in component && component.fields) {
    Object.values(component.fields).forEach((field) => {
      traverseField(field, config);
    });
  }

  const placeholders = (component as ComponentRendering).placeholders || {};

  Object.keys(placeholders).forEach((placeholder) => {
    traversePlaceholder(placeholders[placeholder], config);
  });
};
