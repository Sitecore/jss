import {
  ComponentRendering,
  ComponentFields,
  Field,
  HtmlElementRendering,
  LayoutServiceData,
  RouteData,
} from './models';

/**
 * Safely extracts a field value from a rendering or fields object.
 * Null will be returned if the field is not defined.
 * @param {ComponentRendering | Fields} renderingOrFields the rendering or fields object to extract the field from
 * @param {string} fieldName the name of the field to extract
 * @returns {T | undefined} the field value or null if the field is not defined
 */
export function getFieldValue<T>(
  renderingOrFields: ComponentRendering | ComponentFields,
  fieldName: string
): T | undefined;
// eslint-disable-next-line no-redeclare
export function getFieldValue<T>(
  renderingOrFields: ComponentRendering | ComponentFields,
  fieldName: string,
  defaultValue: T
): T;
/**
 * @param {ComponentRendering | Fields} renderingOrFields the rendering or fields object to extract the field from
 * @param {string} fieldName the name of the field to extract
 * @param {T} [defaultValue] the default value to return if the field is not defined
 * @returns {Field | T} the field value or the default value if the field is not defined
 */
// eslint-disable-next-line no-redeclare
export function getFieldValue<T>(
  renderingOrFields: ComponentRendering | ComponentFields,
  fieldName: string,
  defaultValue?: T
) {
  if (!renderingOrFields || !fieldName) {
    return defaultValue;
  }

  const fields = renderingOrFields as ComponentFields;
  const field = (fields[fieldName] as unknown) as Field<T>;
  if (field && typeof field.value !== 'undefined') {
    return field.value;
  }

  const rendering = renderingOrFields as ComponentRendering;
  if (
    !rendering.fields ||
    !rendering.fields[fieldName] ||
    typeof (rendering.fields[fieldName] as Field).value === 'undefined'
  ) {
    return defaultValue;
  }

  return ((rendering.fields[fieldName] as unknown) as Field<T>).value;
}

/**
 * Gets rendering definitions in a given child placeholder under a current rendering.
 * @param {ComponentRendering} rendering
 * @param {string} placeholderName
 * @returns {Array<ComponentRendering | HtmlElementRendering>} child placeholder
 */
export function getChildPlaceholder(
  rendering: ComponentRendering,
  placeholderName: string
): Array<ComponentRendering | HtmlElementRendering> {
  if (
    !rendering ||
    !placeholderName ||
    !rendering.placeholders ||
    !rendering.placeholders[placeholderName]
  ) {
    return [];
  }

  return rendering.placeholders[placeholderName];
}

/**
 * Walks through layout rendering tree and invokes Reduce-compatible callback on every Rendering.
 * Initial value determines return type
 *
 * @param {LayoutServiceData | RouteData<any> | ComponentRendering | HtmlElementRendering | null } object Layout, route data or rendering
 * @param {Function} callback Reduce-style callback, accepting previous value and a rendering
 * @param {any} initialValue Initial value that will be passed to callbacks, e.g. array
 */
export function reduceLayout<T>(
  object: LayoutServiceData | RouteData<any> | ComponentRendering | HtmlElementRendering | null,
  callback: (
    previousValue: T,
    component: ComponentRendering | HtmlElementRendering | RouteData
  ) => T,
  initialValue: T
): T {
  if (object === null) return initialValue;

  // When layout: Check placheolders
  if ('sitecore' in object) {
    return reduceLayout(object.sitecore.route, callback, initialValue);
  }

  // When rendering / HTML Rendering / RouteData, invoke callback
  initialValue = callback(initialValue, object);

  // When route / component: check its placeholders
  if ('placeholders' in object) {
    initialValue = Object.values(object.placeholders || {})
      .flat()
      .reduce((previousValue, rendering) => {
        return reduceLayout(rendering, callback, previousValue);
      }, initialValue);
  }

  return initialValue;
}
