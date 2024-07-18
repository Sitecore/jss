import {
  ComponentRendering,
  ComponentFields,
  Field,
  GenericFieldValue,
  HtmlElementRendering,
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
 * The default value for an empty Date field.
 * This value is defined as a default one by .NET
 */
export const EMPTY_DATE_FIELD_VALUE = '0001-01-01T00:00:00Z';

/**
 * Determines if the passed in field object's value is empty.
 * @param {GenericFieldValue | Partial<Field>} field the field object.
 * Partial<T> type is used here because _field.value_ could be required or optional for the different field types
 */
export function isFieldValueEmpty(field: GenericFieldValue | Partial<Field>): boolean {
  const isImageFieldEmpty = (fieldValue: GenericFieldValue) =>
    !(fieldValue as { [key: string]: unknown }).src;
  const isFileFieldEmpty = (fieldValue: GenericFieldValue) =>
    !(fieldValue as { [key: string]: unknown }).src;
  const isLinkFieldEmpty = (fieldValue: GenericFieldValue) =>
    !(fieldValue as { [key: string]: unknown }).href;
  const isDateFieldEmpty = (fieldValue: GenericFieldValue) => fieldValue === EMPTY_DATE_FIELD_VALUE;

  const isEmpty = (fieldValue: GenericFieldValue) => {
    if (typeof fieldValue === 'object') {
      return (
        isImageFieldEmpty(fieldValue) &&
        isFileFieldEmpty(fieldValue) &&
        isLinkFieldEmpty(fieldValue)
      );
    } else if (typeof fieldValue === 'number' || typeof fieldValue === 'boolean') {
      // Avoid returning true for 0 and false values
      return false;
    } else {
      return !fieldValue || isDateFieldEmpty(fieldValue);
    }
  };

  if (!field) return true;

  const dynamicField = field as Partial<Field>;
  if (dynamicField.value !== undefined) {
    return isEmpty(dynamicField.value);
  }

  return isEmpty(field as GenericFieldValue);
}
