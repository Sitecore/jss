import { ComponentRendering, Field, HtmlElementRendering, Item } from './dataModels';

/**
 * Safely extracts a field value from a rendering or fields object.
 * Null will be returned if the field is not defined.
 */
export function getFieldValue<T>(
  renderingOrFields: ComponentRendering | { [name: string]: Field | Item[] },
  fieldName: string,
  defaultValue?: T) {

  if (!renderingOrFields || !fieldName) {
    return defaultValue;
  }

  const fields = renderingOrFields as any;
  const field = fields[fieldName] as Field<T>;
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

  return (rendering.fields[fieldName] as Field<T>).value;
}

/**
 * Gets rendering definitions in a given child placeholder under a current rendering.
 */
export function getChildPlaceholder(rendering: ComponentRendering, placeholderName: string)
: Array<ComponentRendering | HtmlElementRendering> {
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
