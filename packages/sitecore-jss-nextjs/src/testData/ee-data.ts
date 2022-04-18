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

export const imageField =
  '<input id=\'fld_F5201E35767444EBB903E52488A0EB5A_B7F425624A1F4F3F925C4A4381197239_en_1_0f581df6173e468f9c0b36bd730739e4_13\' class=\'scFieldValue\' name=\'fld_F5201E35767444EBB903E52488A0EB5A_B7F425624A1F4F3F925C4A4381197239_en_1_0f581df6173e468f9c0b36bd730739e4_13\' type=\'hidden\' value="&lt;image mediaid=&quot;{B013777F-C6CA-4880-9562-B9B7688AF63A}&quot; /&gt;" /><code id="fld_F5201E35767444EBB903E52488A0EB5A_B7F425624A1F4F3F925C4A4381197239_en_1_0f581df6173e468f9c0b36bd730739e4_13_edit" type="text/sitecore" chromeType="field" scFieldType="image" class="scpm" kind="open">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: chooseimage\\"})","header":"Choose Image","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2.png","disabledIcon":"/temp/photo_landscape2_disabled16x16.png","isDivider":false,"tooltip":"Choose an image.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: editimage\\"})","header":"Properties","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_edit.png","disabledIcon":"/temp/photo_landscape2_edit_disabled16x16.png","isDivider":false,"tooltip":"Modify image appearance.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: clearimage\\"})","header":"Clear","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_delete.png","disabledIcon":"/temp/photo_landscape2_delete_disabled16x16.png","isDivider":false,"tooltip":"Remove the image.","type":""},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{F5201E35-7674-44EB-B903-E52488A0EB5A}?lang=en&ver=1","custom":{},"displayName":"Image","expandedDisplayName":null}</code><img src="http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/1.ashx?h=350&amp;la=en&amp;w=650&amp;hash=B973470AA333773341C62A76511361C88897E2D4" alt="" width="650" height="350" /><code class="scpm" type="text/sitecore" chromeType="field" kind="close"></code>';
