import {
  Field,
  ImageField,
  ImageFieldValue,
  Item,
  LinkField,
  LinkFieldValue,
  RichTextField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * typeguard for Field
 * @param {Field | T} [input]
 * @returns {boolean}
 */
export function isField<T = Item | Item[]>(input: Field | T): input is Field {
  if (input === null) return false;
  if (typeof input !== 'object') return false;
  if (Array.isArray(input)) return false;

  const result =
    'value' in (input as Field) &&
    Object.keys(input as Field).length >= 1 &&
    Object.keys(input as Field).length <= 2;

  return result;
}

/**
 * typeguard for ImageField
 * @param {ImageField | T} [input]
 * @returns {boolean}
 */
export function isImage<T = ImageFieldValue>(input: ImageField | T): input is ImageField {
  const imageField = input as ImageField;
  const result =
    'value' in imageField &&
    isImageFieldValue(imageField.value) &&
    Object.keys(imageField).length >= 1 &&
    Object.keys(imageField).length <= 2;

  return result;
}

/**
 * typeguard for ImageFieldValue
 * @param {ImageFieldValue | T} [input]
 * @returns {boolean}
 */
export function isImageFieldValue<T = ImageField>(
  input: ImageFieldValue | T
): input is ImageFieldValue {
  const imageFieldValue = input as ImageFieldValue;
  const result = 'src' in imageFieldValue && Object.keys(imageFieldValue).length >= 1;

  return result;
}

/**
 * typeguard for Item
 * @param {Item | T} [input]
 * @returns {boolean}
 */
export function isItem<T = Field | Item[]>(input: Item | T): input is Item {
  const item = input as Item;
  if (input === null) return false;
  if (typeof input !== 'object') return false;
  if (Array.isArray(input)) return false;

  const result =
    'fields' in item &&
    'name' in item &&
    Object.keys(item).length >= 2 &&
    Object.keys(item).length <= 5;

  return result;
}

/**
 * typeguard for Array<Item>
 * @param {Item[] | T} [input]
 * @returns {boolean}
 */
export function isItemArray<T = Field | Item>(input: Item[] | T): input is Item[] {
  if (input === null) return false;
  if (!Array.isArray(input)) return false;

  return (input as Item[]).every(isItem);
}

/**
 * typeguard for LinkFields.
 * @param {LinkField | T} [input]
 * @returns {boolean}
 */
export function isLinkField<T = LinkFieldValue>(input: LinkField | T): input is LinkField {
  const linkField = input as LinkField;
  const result =
    'value' in linkField &&
    isLinkFieldValue(linkField.value) &&
    Object.keys(linkField).length >= 1 &&
    Object.keys(linkField).length <= 3;

  return result;
}

/**
 * typeguard for LinkFieldValue
 * @param {LinkFieldValue | T} [input]
 * @returns {boolean}
 */
export function isLinkFieldValue<T = LinkField>(
  input: LinkFieldValue | T
): input is LinkFieldValue {
  const linkFieldValue = input as LinkFieldValue;
  const result = '' in linkFieldValue;

  return result;
}

/**
 * typeguard for RichTextField
 * @param {RichTextField | T} [input]
 * @returns {boolean}
 */
export function isRichTextField<T = object>(input: RichTextField | T): input is RichTextField {
  const richtextfield = input as RichTextField;
  const result =
    'value' in richtextfield &&
    typeof richtextfield.value === 'string' &&
    Object.keys(richtextfield).length >= 1 &&
    Object.keys(richtextfield).length <= 2;

  return result;
}

/**
 * typeguard for TextField
 * @param {TextField | T} [input]
 * @returns {boolean}
 */
export function isTextField<T = object>(input: TextField | T): input is TextField {
  const textField = input as TextField;
  const result =
    'value' in textField &&
    Object.keys(textField).length >= 1 &&
    Object.keys(textField).length <= 2;

  return result;
}
