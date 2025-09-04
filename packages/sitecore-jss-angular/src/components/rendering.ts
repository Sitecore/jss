import { ComponentRendering, HtmlElementRendering } from '@sitecore-jss/sitecore-jss/layout';

/**
 * @param {HtmlElementRendering | ComponentRendering} rendering
 */
export function isRawRendering(
  rendering: HtmlElementRendering | ComponentRendering
): rendering is HtmlElementRendering {
  return (
    !(rendering as ComponentRendering).componentName &&
    (rendering as HtmlElementRendering).name !== undefined
  );
}
