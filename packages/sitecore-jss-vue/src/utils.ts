export const generateHtmlTag = (elementName: string, attrs: { [key: string]: any }) =>
  Object.keys(attrs)
    .reduce((result, attrName) => `${result} ${attrName}="${attrs[attrName]}"`, `<${elementName}`)
    .concat(' />');
