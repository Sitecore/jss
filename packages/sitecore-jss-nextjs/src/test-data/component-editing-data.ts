import { EDITING_COMPONENT_PLACEHOLDER } from '@sitecore-jss/sitecore-jss/layout';
import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss/src/layout';

const data = {
  path: '/Styleguide',
  layoutData: {
    sitecore: {
      context: {
        pageEditing: true,
        user: {
          domain: 'sitecore',
          name: 'Admin',
        },
        site: {
          name: 'JssNextWeb',
        },
        pageState: LayoutServicePageState.Edit,
        language: 'en',
        itemPath: '/Styleguide',
      },
      route: {
        name: 'Styleguide',
        displayName: 'Styleguide',
        fields: {
          pageTitle: {
            value: 'Styleguide | Sitecore JSS',
            editable:
              '<input id=\'fld_52961EEABAFD5287A532A72E36BD8A36_8637EDB87B0350A7A619811410001867_en_1_f8cf3895a17440fe866d993795522799_7\' class=\'scFieldValue\' name=\'fld_52961EEABAFD5287A532A72E36BD8A36_8637EDB87B0350A7A619811410001867_en_1_f8cf3895a17440fe866d993795522799_7\' type=\'hidden\' value="Styleguide | Sitecore JSS" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit:open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit:personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit:editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{52961EEA-BAFD-5287-A532-A72E36BD8A36}?lang=en&ver=1","custom":{},"displayName":"Page Title","expandedDisplayName":null}</span><span id="fld_52961EEABAFD5287A532A72E36BD8A36_8637EDB87B0350A7A619811410001867_en_1_f8cf3895a17440fe866d993795522799_7_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">Styleguide | Sitecore JSS</span>',
          },
        },
        databaseName: 'master',
        deviceId: 'fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3',
        itemId: '52961eea-bafd-5287-a532-a72e36bd8a36',
        itemLanguage: 'en',
        itemVersion: 1,
        layoutId: '4092f843-b14e-5f7a-9ae6-3ed9f5c2b919',
        templateId: 'ca5a5aeb-55ae-501b-bb10-d37d009a97e1',
        templateName: 'App Route',
        placeholders: {},
      },
    },
  },
};

data.layoutData.sitecore.route.placeholders[EDITING_COMPONENT_PLACEHOLDER] = [
  {
    uid: 'e02ddb9b-a062-5e50-924a-1940d7e053ce',
    componentName: 'ContentBlock',
    dataSource: '{FC218D50-FC56-5B2B-99BA-38D570A83386}',
    params: {},
    fields: {
      content: {
        value:
          '<p>This is a live set of examples of how to use JSS. For more information on using JSS, please see <a href="https://jss.sitecore.com" target="_blank" rel="noopener noreferrer">the documentation</a>.</p>\r\n<p>The content and layout of this page is defined in <code>/data/routes/styleguide/en.yml</code></p>\r\n',
        editable:
          '<input id=\'fld_FC218D50FC565B2B99BA38D570A83386_E0585BB396BE5028994034069AEE5491_en_1_91eac8b975e140c682e0eb6bd23c21dc_8\' class=\'scFieldValue\' name=\'fld_FC218D50FC565B2B99BA38D570A83386_E0585BB396BE5028994034069AEE5491_en_1_91eac8b975e140c682e0eb6bd23c21dc_8\' type=\'hidden\' value="&lt;p&gt;This is a live set of examples of how to use JSS. For more information on using JSS, please see &lt;a href=&quot;https://jss.sitecore.com&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;&gt;the documentation&lt;/a&gt;.&lt;/p&gt;\r\n&lt;p&gt;The content and layout of this page is defined in &lt;code&gt;/data/routes/styleguide/en.yml&lt;/code&gt;&lt;/p&gt;\r\n" /><span class="scChromeData">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit:edithtml\\"})","header":"Edit Text","icon":"/temp/iconcache/office/16x16/pencil.png","disabledIcon":"/temp/pencil_disabled16x16.png","isDivider":false,"tooltip":"Edit the text","type":null},{"click":"chrome:field:execute({command:\\"bold\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_bold.png","disabledIcon":"/temp/font_style_bold_disabled16x16.png","isDivider":false,"tooltip":"Bold","type":null},{"click":"chrome:field:execute({command:\\"Italic\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_italics.png","disabledIcon":"/temp/font_style_italics_disabled16x16.png","isDivider":false,"tooltip":"Italic","type":null},{"click":"chrome:field:execute({command:\\"Underline\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_underline.png","disabledIcon":"/temp/font_style_underline_disabled16x16.png","isDivider":false,"tooltip":"Underline","type":null},{"click":"chrome:field:insertexternallink","header":"","icon":"/temp/iconcache/office/16x16/earth_link.png","disabledIcon":"/temp/earth_link_disabled16x16.png","isDivider":false,"tooltip":"Insert an external link into the text field.","type":null},{"click":"chrome:field:insertlink","header":"","icon":"/temp/iconcache/office/16x16/link.png","disabledIcon":"/temp/link_disabled16x16.png","isDivider":false,"tooltip":"Insert a link into the text field.","type":null},{"click":"chrome:field:removelink","header":"","icon":"/temp/iconcache/office/16x16/link_broken.png","disabledIcon":"/temp/link_broken_disabled16x16.png","isDivider":false,"tooltip":"Remove link.","type":null},{"click":"chrome:field:insertimage","header":"Insert image","icon":"/temp/iconcache/office/16x16/photo_landscape.png","disabledIcon":"/temp/photo_landscape_disabled16x16.png","isDivider":false,"tooltip":"Insert an image into the text field.","type":null},{"click":"chrome:common:edititem({command:\\"webedit:open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit:personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit:editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{FC218D50-FC56-5B2B-99BA-38D570A83386}?lang=en&ver=1","custom":{},"displayName":"content","expandedDisplayName":null}</span><span scFieldType="rich text" scDefaultText="[No text in field]" contenteditable="true" class="scWebEditInput" id="fld_FC218D50FC565B2B99BA38D570A83386_E0585BB396BE5028994034069AEE5491_en_1_91eac8b975e140c682e0eb6bd23c21dc_8_edit"><p>This is a live set of examples of how to use JSS. For more information on using JSS, please see <a href="https://jss.sitecore.com" target="_blank" rel="noopener noreferrer">the documentation</a>.</p>\r\n<p>The content and layout of this page is defined in <code>/data/routes/styleguide/en.yml</code></p>\r\n</span>',
      },
      heading: {
        value: 'JSS Styleguide',
        editable:
          '<input id=\'fld_FC218D50FC565B2B99BA38D570A83386_E65EE88A96E75E499C46037DF32842F9_en_1_91eac8b975e140c682e0eb6bd23c21dc_9\' class=\'scFieldValue\' name=\'fld_FC218D50FC565B2B99BA38D570A83386_E65EE88A96E75E499C46037DF32842F9_en_1_91eac8b975e140c682e0eb6bd23c21dc_9\' type=\'hidden\' value="JSS Styleguide" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit:open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit:personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit:editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{FC218D50-FC56-5B2B-99BA-38D570A83386}?lang=en&ver=1","custom":{},"displayName":"heading","expandedDisplayName":null}</span><span id="fld_FC218D50FC565B2B99BA38D570A83386_E65EE88A96E75E499C46037DF32842F9_en_1_91eac8b975e140c682e0eb6bd23c21dc_9_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">JSS Styleguide</span>',
      },
    },
  },
];

export default data;
