/**
 * The Experience Editor will send the following body data structure,
 * though we're only concerned with the "args".
 * {
 *   id: 'JSS app name', UNUSED
 *   args: ['path', 'serialized layout data object', 'serialized viewbag object'],
 *   functionName: 'renderView', UNUSED
 *   moduleName: 'server.bundle' UNUSED
 * }
 * The 'serialized viewbag object' structure:
 * {
 *   language: 'language',
 *   dictionary: 'key-value representation of tokens and their corresponding translations',
 *   httpContext: 'serialized request data' UNUSED
 * }
 */

export const EE_PATH = '/test/path';
export const EE_LANGUAGE = 'en';
export const EE_LAYOUT = `{"sitecore":{"context":{"pageEditing":true,"site":{"name":"JssNext"},"pageState":"normal","language":"en","itemPath":"${EE_PATH}"},"route":{"name":"home","displayName":"home","fields":{"pageTitle":{"value":"Welcome to Sitecore JSS"}},"databaseName":"master","deviceId":"fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3","itemId":"d6ac9d26-9474-51cf-982d-4f8d44951229","itemLanguage":"en","itemVersion":1,"layoutId":"4092f843-b14e-5f7a-9ae6-3ed9f5c2b919","templateId":"ca5a5aeb-55ae-501b-bb10-d37d009a97e1","templateName":"App Route","placeholders":{"jss-main":[{"uid":"2c4a53cc-9da8-5f51-9d79-6ee2fc671b2d","componentName":"ContentBlock","dataSource":"{FF0E7D28-D8EF-539C-9CEC-28E1175F8C1D}","params":{},"fields":{"heading":{"value":"Welcome to Sitecore JSS"},"content":{"value":"<p>Thanks for using JSS!! Here are some resources to get you started:</p>"}}}]}}}}`;
export const EE_DICTIONARY = '{"entry1":"Entry One","entry2":"Entry Two"}';

export const EE_BODY = {
  id: 'JssApp',
  args: ['/', EE_LAYOUT, `{\"language\":\"${EE_LANGUAGE}\",\"dictionary\":${EE_DICTIONARY}}`],
  functionName: 'renderView',
  moduleName: 'server.bundle',
};
