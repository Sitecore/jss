import { ComponentFields, getFieldValue } from '@sitecore-jss/sitecore-jss/layout';
import { parse as styleParse } from 'style-attr';

// https://stackoverflow.com/a/10426674/9324
export const convertKebabCasetoCamelCase = (str: string) =>
  str.replace(/^.|-./g, (letter, index) =>
    index === 0 ? letter.toLowerCase() : letter.substr(1).toUpperCase()
  );

/**
 * https://facebook.github.io/react/docs/dom-elements.html
 * We are only concerned with style at the moment, which needs to be converted from string to object to satisfy React.
 * We don't need to convert any other attributes (that we know of), because the placeholder renders them "as-is" by using the special "is" React prop.
 * For whatever reason though, the "style" prop is still validated as needing to be an object when using the "is" prop, which is why we need to convert from string to object.
 * @param {string} [style] style
 * @returns {Array} converted attributes
 */
export const convertStyleAttribute = (style = '') => {
  // styleParse converts a style attribute string into an object format
  const parsedStyle = styleParse(style, { preserveNumbers: true });
  return Object.keys(parsedStyle).reduce((initialResult, styleKey) => {
    const result: { [key: string]: unknown } = initialResult;
    const convertedKey = convertKebabCasetoCamelCase(styleKey);
    result[convertedKey] = parsedStyle[styleKey];
    return result;
  }, {});
};

export const convertAttributesToReactProps = (
  attributes: null | {
    [key: string]: unknown;
    style?: string;
    class?: string;
  }
): [] | { [attr: string]: unknown } => {
  if (!attributes) {
    return [];
  }
  return Object.keys(attributes).reduce((initialResult, attrName) => {
    const result: { [key: string]: unknown } = initialResult;
    switch (attrName) {
      case 'class': {
        result.className = attributes.class;
        break;
      }
      case 'style': {
        result.style = convertStyleAttribute(attributes.style);
        break;
      }
      default: {
        result[attrName] = attributes[attrName];
        break;
      }
    }

    return result;
  }, {});
};

/**
 * "class" property will be transformed into or appended to "className" instead.
 * @param {string} otherAttrs all other props included on the image component
 * @returns {void}
 */
export const addClassName = (otherAttrs: { [key: string]: unknown }): void => {
  if (otherAttrs.class) {
    // if any classes are defined properly already
    if (otherAttrs.className) {
      let className: string = otherAttrs.className as string;
      className += ` ${otherAttrs.class}`;
      otherAttrs.className = className;
    } else {
      otherAttrs.className = otherAttrs.class;
    }
    delete otherAttrs.class;
  }
};

/**
 * Converts the given tag attributes object to a string
 * @param {{[key: string]: unknown}} attributes the attributes object
 * @returns {string} string representation of the attributes
 */
export const getAttributesString = (attributes: { [key: string]: unknown }): string => {
  const { className, ...restAttributes } = attributes;
  const attributesEntries = Object.entries(restAttributes).map(([key, value]) => {
    if (typeof value === 'object') {
      const valueString = JSON.stringify(value)
        .replace(/"|{|}/g, '')
        .replace(/,/g, ';');
      return `${key}="${valueString}"`;
    }
    return `${key}="${value}"`;
  });

  if (className) {
    attributesEntries.push(`class="${className}"`);
  }

  return attributesEntries.join(' ');
};

/**
 * Used in FEAAS and BYOC implementations to convert datasource item field values into component props
 * @param {ComponentFields} fields field collection from Sitecore
 * @returns JSON object that can be used as props
 */
export const getDataFromFields = (fields: ComponentFields): { [key: string]: unknown } => {
  let data: { [key: string]: unknown } = {};
  data = Object.entries(fields).reduce((acc, [key]) => {
    acc[key] = getFieldValue(fields, key);
    return acc;
  }, data);
  return data;
};
