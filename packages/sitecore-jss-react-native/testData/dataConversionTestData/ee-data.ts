export const rawData = {
  context: {
    pageEditing: true,
    user: {
      domain: 'sitecore',
      name: 'Admin',
    },
    site: {
      name: 'jssadvancedapp',
    },
    navigation: [
      {
        name: 'Home',
        path: '/',
        children: [
          {
            name: 'About',
            path: '/about',
          },
          {
            name: 'Portfolio',
            path: '/portfolio',
          },
          {
            name: 'Services',
            path: '/services',
          },
        ],
      },
    ],
  },
  name: 'portfolio',
  displayName: 'Portfolio',
  fields: {
    metaTitle: {
      value: '',
      editable:
        '<input id=\'fld_0C727FB29E8446A3A46E1DB91C7B115F_FB00D0EA46A34F769C3B67552395C539_en_1_b9e700b508bb46378e3ed4159ff0fe36_6\' class=\'scFieldValue\' name=\'fld_0C727FB29E8446A3A46E1DB91C7B115F_FB00D0EA46A34F769C3B67552395C539_en_1_b9e700b508bb46378e3ed4159ff0fe36_6\' type=\'hidden\' value="" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{0C727FB2-9E84-46A3-A46E-1DB91C7B115F}?lang=en&ver=1","custom":{},"displayName":"metaTitle","expandedDisplayName":null}</span><span id="fld_0C727FB29E8446A3A46E1DB91C7B115F_FB00D0EA46A34F769C3B67552395C539_en_1_b9e700b508bb46378e3ed4159ff0fe36_6_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]" scWatermark="true">[No text in field]</span>',
    },
  },
  placeholders: [
    {
      name: 'main',
      path: 'main',
      elements: [
        {
          name: 'code',
          type: 'text/sitecore',
          contents:
            '{"commands":[{"click":"chrome:placeholder:addControl","header":"Add to here","icon":"/temp/iconcache/office/16x16/add.png","disabledIcon":"/temp/add_disabled16x16.png","isDivider":false,"tooltip":"Add a new rendering to the \'{0}\' placeholder.","type":""},{"click":"chrome:placeholder:editSettings","header":"","icon":"/temp/iconcache/office/16x16/window_gear.png","disabledIcon":"/temp/window_gear_disabled16x16.png","isDivider":false,"tooltip":"Edit the placeholder settings.","type":""}],"contextItemUri":"sitecore://master/{0C727FB2-9E84-46A3-A46E-1DB91C7B115F}?lang=en&ver=1","custom":{"allowedRenderings":["95991A47B356449FA4B1D4293771BE5B","0459E414DD26478F87D86756EA3772A2","5478062B9BED43F5967A8C42066B053F","7143F00E934242D1901E2C48A7794796"],"editable":"true"},"displayName":"main","expandedDisplayName":null}',
          attributes: {
            type: 'text/sitecore',
            chrometype: 'placeholder',
            kind: 'open',
            id: 'main',
            key: 'main',
            class: 'scpm',
            'data-selectable': 'true',
          },
        },
        {
          name: 'code',
          type: 'text/sitecore',
          contents:
            '{"commands":[{"click":"chrome:rendering:sort","header":"Change position","icon":"/temp/iconcache/office/16x16/document_size.png","disabledIcon":"/temp/document_size_disabled16x16.png","isDivider":false,"tooltip":"Move component.","type":""},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:componentoptions(referenceId={0A44B6E4-67A9-4E82-8246-A17E048B9EB8},renderingId={5478062B-9BED-43F5-967A-8C42066B053F},id={0C727FB2-9E84-46A3-A46E-1DB91C7B115F})\',null,false)","header":"Edit Experience Editor Options","icon":"/temp/iconcache/office/16x16/clipboard_check_edit.png","disabledIcon":"/temp/clipboard_check_edit_disabled16x16.png","isDivider":false,"tooltip":"Edit the Experience Editor options for the component.","type":"common"},{"click":"chrome:rendering:properties","header":"Edit component properties","icon":"/temp/iconcache/office/16x16/elements_branch.png","disabledIcon":"/temp/elements_branch_disabled16x16.png","isDivider":false,"tooltip":"Edit the properties for the component.","type":"common"},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:setdatasource(referenceId={0A44B6E4-67A9-4E82-8246-A17E048B9EB8},renderingId={5478062B-9BED-43F5-967A-8C42066B053F},id={0C727FB2-9E84-46A3-A46E-1DB91C7B115F})\',null,false)","header":"{dsHeader}","icon":"/temp/iconcache/office/16x16/data.png","disabledIcon":"/temp/data_disabled16x16.png","isDivider":false,"tooltip":"{dsTooltip}","type":"datasourcesmenu"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Test the component.","type":"sticky"},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"datasourcesmenu"},{"click":"chrome:rendering:delete","header":"Delete","icon":"/temp/iconcache/office/16x16/delete.png","disabledIcon":"/temp/delete_disabled16x16.png","isDivider":false,"tooltip":"Remove component.","type":"sticky"}],"contextItemUri":"sitecore://master/{0C727FB2-9E84-46A3-A46E-1DB91C7B115F}?lang=en&ver=1","custom":{"renderingID":"5478062B9BED43F5967A8C42066B053F","editable":"true"},"displayName":"Portfolio","expandedDisplayName":null}',
          attributes: {
            type: 'text/sitecore',
            chrometype: 'rendering',
            kind: 'open',
            hintname: 'Portfolio',
            id: 'r_0A44B6E467A94E828246A17E048B9EB8',
            class: 'scpm',
            'data-selectable': 'true',
          },
        },
        {
          componentName: 'Portfolio',
          renderingName: 'Portfolio',
          renderingParams: {},
          uid: '0a44b6e4-67a9-4e82-8246-a17e048b9eb8',
          dataSource: '{F5ECF6C0-2FF2-497A-BB75-96E4B847D9EF}',
          placeholders: [
            {
              name: 'page-header',
              path: '/main/page-header_0A44B6E4-67A9-4E82-8246-A17E048B9EB8',
              elements: [
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:placeholder:addControl","header":"Add to here","icon":"/temp/iconcache/office/16x16/add.png","disabledIcon":"/temp/add_disabled16x16.png","isDivider":false,"tooltip":"Add a new rendering to the \'{0}\' placeholder.","type":""},{"click":"chrome:placeholder:editSettings","header":"","icon":"/temp/iconcache/office/16x16/window_gear.png","disabledIcon":"/temp/window_gear_disabled16x16.png","isDivider":false,"tooltip":"Edit the placeholder settings.","type":""}],"contextItemUri":"sitecore://master/{0C727FB2-9E84-46A3-A46E-1DB91C7B115F}?lang=en&ver=1","custom":{"allowedRenderings":["0458209CE5F14D1E839051ED91CF3122"],"editable":"true"},"displayName":"page-header","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'placeholder',
                    kind: 'open',
                    id: '_main_page_header_0A44B6E4_67A9_4E82_8246_A17E048B9EB8',
                    key: '/main/page-header_0A44B6E4-67A9-4E82-8246-A17E048B9EB8',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:rendering:sort","header":"Change position","icon":"/temp/iconcache/office/16x16/document_size.png","disabledIcon":"/temp/document_size_disabled16x16.png","isDivider":false,"tooltip":"Move component.","type":""},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:componentoptions(referenceId={8A0D4795-C7D0-4FEC-9369-0B89F3162073},renderingId={0458209C-E5F1-4D1E-8390-51ED91CF3122},id={24E8F2AC-6685-4A64-8601-9F7165F6FE62})\',null,false)","header":"Edit Experience Editor Options","icon":"/temp/iconcache/office/16x16/clipboard_check_edit.png","disabledIcon":"/temp/clipboard_check_edit_disabled16x16.png","isDivider":false,"tooltip":"Edit the Experience Editor options for the component.","type":"common"},{"click":"chrome:rendering:properties","header":"Edit component properties","icon":"/temp/iconcache/office/16x16/elements_branch.png","disabledIcon":"/temp/elements_branch_disabled16x16.png","isDivider":false,"tooltip":"Edit the properties for the component.","type":"common"},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:setdatasource(referenceId={8A0D4795-C7D0-4FEC-9369-0B89F3162073},renderingId={0458209C-E5F1-4D1E-8390-51ED91CF3122},id={24E8F2AC-6685-4A64-8601-9F7165F6FE62})\',null,false)","header":"{dsHeader}","icon":"/temp/iconcache/office/16x16/data.png","disabledIcon":"/temp/data_disabled16x16.png","isDivider":false,"tooltip":"{dsTooltip}","type":"datasourcesmenu"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Test the component.","type":"sticky"},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"datasourcesmenu"},{"click":"chrome:rendering:delete","header":"Delete","icon":"/temp/iconcache/office/16x16/delete.png","disabledIcon":"/temp/delete_disabled16x16.png","isDivider":false,"tooltip":"Remove component.","type":"sticky"}],"contextItemUri":"sitecore://master/{24E8F2AC-6685-4A64-8601-9F7165F6FE62}?lang=en&ver=1","custom":{"renderingID":"0458209CE5F14D1E839051ED91CF3122","editable":"true"},"displayName":"Jumbotron","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'rendering',
                    kind: 'open',
                    hintname: 'Jumbotron',
                    id: 'r_8A0D4795C7D04FEC93690B89F3162073',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  componentName: 'Jumbotron',
                  renderingName: 'Jumbotron',
                  renderingParams: {
                    shade: 'light',
                    titleSize: '2',
                  },
                  uid: '8a0d4795-c7d0-4fec-9369-0b89f3162073',
                  dataSource: '{F5ECF6C0-2FF2-497A-BB75-96E4B847D9EF}',
                  placeholders: [],
                  name: 'code',
                  type: 'data/json',
                  contents: {
                    titleText: {
                      value: 'Portfolio',
                      editable:
                        '<input id=\'fld_24E8F2AC66854A6486019F7165F6FE62_91833116CE0949D1B951C47EC9054F66_en_1_a84bd781ddb44e93a2e65838a1386619_7\' class=\'scFieldValue\' name=\'fld_24E8F2AC66854A6486019F7165F6FE62_91833116CE0949D1B951C47EC9054F66_en_1_a84bd781ddb44e93a2e65838a1386619_7\' type=\'hidden\' value="Portfolio" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{24E8F2AC-6685-4A64-8601-9F7165F6FE62}?lang=en&ver=1","custom":{},"displayName":"Title Text","expandedDisplayName":null}</span><span id="fld_24E8F2AC66854A6486019F7165F6FE62_91833116CE0949D1B951C47EC9054F66_en_1_a84bd781ddb44e93a2e65838a1386619_7_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">Portfolio</span>',
                    },
                    body: {
                      value: '',
                      editable:
                        '<input id=\'fld_24E8F2AC66854A6486019F7165F6FE62_0404166A350A43D4BC1592D7B2F43834_en_1_a84bd781ddb44e93a2e65838a1386619_8\' class=\'scFieldValue\' name=\'fld_24E8F2AC66854A6486019F7165F6FE62_0404166A350A43D4BC1592D7B2F43834_en_1_a84bd781ddb44e93a2e65838a1386619_8\' type=\'hidden\' value="" /><span class="scChromeData">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: edithtml\\"})","header":"Edit Text","icon":"/temp/iconcache/office/16x16/pencil.png","disabledIcon":"/temp/pencil_disabled16x16.png","isDivider":false,"tooltip":"Edit the text","type":null},{"click":"chrome:field:execute({command:\\"bold\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_bold.png","disabledIcon":"/temp/font_style_bold_disabled16x16.png","isDivider":false,"tooltip":"Bold","type":null},{"click":"chrome:field:execute({command:\\"Italic\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_italics.png","disabledIcon":"/temp/font_style_italics_disabled16x16.png","isDivider":false,"tooltip":"Italic","type":null},{"click":"chrome:field:execute({command:\\"Underline\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_underline.png","disabledIcon":"/temp/font_style_underline_disabled16x16.png","isDivider":false,"tooltip":"Underline","type":null},{"click":"chrome:field:insertlink","header":"","icon":"/temp/iconcache/office/16x16/link.png","disabledIcon":"/temp/link_disabled16x16.png","isDivider":false,"tooltip":"Insert a link into the text field.","type":null},{"click":"chrome:field:insertimage","header":"Insert image","icon":"/temp/iconcache/office/16x16/photo_landscape.png","disabledIcon":"/temp/photo_landscape_disabled16x16.png","isDivider":false,"tooltip":"Insert an image into the text field.","type":null},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{24E8F2AC-6685-4A64-8601-9F7165F6FE62}?lang=en&ver=1","custom":{},"displayName":"Body","expandedDisplayName":null}</span><span id="fld_24E8F2AC66854A6486019F7165F6FE62_0404166A350A43D4BC1592D7B2F43834_en_1_a84bd781ddb44e93a2e65838a1386619_8_edit" contenteditable="true" class="scWebEditInput" scFieldType="rich text" scDefaultText="[No text in field]" scWatermark="true">[No text in field]</span>',
                    },
                  },
                  attributes: {
                    type: 'data/json',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents: '',
                  attributes: {
                    type: 'text/sitecore',
                    id: 'scEnclosingTag_r_',
                    chrometype: 'rendering',
                    kind: 'close',
                    hintkey: 'Jumbotron',
                    class: 'scpm',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents: '',
                  attributes: {
                    type: 'text/sitecore',
                    id: 'scEnclosingTag_',
                    chrometype: 'placeholder',
                    kind: 'close',
                    hintname: 'page-header',
                    class: 'scpm',
                  },
                },
              ],
            },
            {
              name: 'page-content',
              path: '/main/page-content_0A44B6E4-67A9-4E82-8246-A17E048B9EB8',
              elements: [
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:placeholder:addControl","header":"Add to here","icon":"/temp/iconcache/office/16x16/add.png","disabledIcon":"/temp/add_disabled16x16.png","isDivider":false,"tooltip":"Add a new rendering to the \'{0}\' placeholder.","type":""},{"click":"chrome:placeholder:editSettings","header":"","icon":"/temp/iconcache/office/16x16/window_gear.png","disabledIcon":"/temp/window_gear_disabled16x16.png","isDivider":false,"tooltip":"Edit the placeholder settings.","type":""}],"contextItemUri":"sitecore://master/{0C727FB2-9E84-46A3-A46E-1DB91C7B115F}?lang=en&ver=1","custom":{"allowedRenderings":["2121DEA51D324E22865C6C03EF1B228C","99DEC8C2B93A49328630575F115C87AA","024A959995F34985A3D05EECE09FB8E0","C87E2F6F2F2445BFBBD109F0BE520F4C"],"editable":"true"},"displayName":"page-content","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'placeholder',
                    kind: 'open',
                    id: '_main_page_content_0A44B6E4_67A9_4E82_8246_A17E048B9EB8',
                    key: '/main/page-content_0A44B6E4-67A9-4E82-8246-A17E048B9EB8',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:rendering:sort","header":"Change position","icon":"/temp/iconcache/office/16x16/document_size.png","disabledIcon":"/temp/document_size_disabled16x16.png","isDivider":false,"tooltip":"Move component.","type":""},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:componentoptions(referenceId={D28A2E1F-866E-475C-9ED6-246EE5CC7AEA},renderingId={C87E2F6F-2F24-45BF-BBD1-09F0BE520F4C},id={D484E0E0-2E81-4326-A560-5F070B98813E})\',null,false)","header":"Edit Experience Editor Options","icon":"/temp/iconcache/office/16x16/clipboard_check_edit.png","disabledIcon":"/temp/clipboard_check_edit_disabled16x16.png","isDivider":false,"tooltip":"Edit the Experience Editor options for the component.","type":"common"},{"click":"chrome:rendering:properties","header":"Edit component properties","icon":"/temp/iconcache/office/16x16/elements_branch.png","disabledIcon":"/temp/elements_branch_disabled16x16.png","isDivider":false,"tooltip":"Edit the properties for the component.","type":"common"},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:setdatasource(referenceId={D28A2E1F-866E-475C-9ED6-246EE5CC7AEA},renderingId={C87E2F6F-2F24-45BF-BBD1-09F0BE520F4C},id={D484E0E0-2E81-4326-A560-5F070B98813E})\',null,false)","header":"{dsHeader}","icon":"/temp/iconcache/office/16x16/data.png","disabledIcon":"/temp/data_disabled16x16.png","isDivider":false,"tooltip":"{dsTooltip}","type":"datasourcesmenu"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Test the component.","type":"sticky"},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"datasourcesmenu"},{"click":"chrome:rendering:delete","header":"Delete","icon":"/temp/iconcache/office/16x16/delete.png","disabledIcon":"/temp/delete_disabled16x16.png","isDivider":false,"tooltip":"Remove component.","type":"sticky"}],"contextItemUri":"sitecore://master/{D484E0E0-2E81-4326-A560-5F070B98813E}?lang=en&ver=1","custom":{"renderingID":"C87E2F6F2F2445BFBBD109F0BE520F4C","editable":"true"},"displayName":"Carousel","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'rendering',
                    kind: 'open',
                    hintname: 'Carousel',
                    id: 'r_D28A2E1F866E475C9ED6246EE5CC7AEA',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  componentName: 'Carousel',
                  renderingName: 'Carousel',
                  renderingParams: {},
                  uid: 'd28a2e1f-866e-475c-9ed6-246ee5cc7aea',
                  dataSource: '{F5ECF6C0-2FF2-497A-BB75-96E4B847D9EF}',
                  placeholders: [],
                  name: 'code',
                  type: 'data/json',
                  contents: {
                    items: [
                      {
                        body: {
                          value:
                            '<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>',
                          editable:
                            '<input id=\'fld_F5201E35767444EBB903E52488A0EB5A_B4B1C4B8AA0349D1871A918BC61A532D_en_1_0f581df6173e468f9c0b36bd730739e4_9\' class=\'scFieldValue\' name=\'fld_F5201E35767444EBB903E52488A0EB5A_B4B1C4B8AA0349D1871A918BC61A532D_en_1_0f581df6173e468f9c0b36bd730739e4_9\' type=\'hidden\' value="&lt;p&gt;Nulla vitae elit libero, a pharetra augue mollis interdum.&lt;/p&gt;" /><span class="scChromeData">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: edithtml\\"})","header":"Edit Text","icon":"/temp/iconcache/office/16x16/pencil.png","disabledIcon":"/temp/pencil_disabled16x16.png","isDivider":false,"tooltip":"Edit the text","type":null},{"click":"chrome:field:execute({command:\\"bold\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_bold.png","disabledIcon":"/temp/font_style_bold_disabled16x16.png","isDivider":false,"tooltip":"Bold","type":null},{"click":"chrome:field:execute({command:\\"Italic\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_italics.png","disabledIcon":"/temp/font_style_italics_disabled16x16.png","isDivider":false,"tooltip":"Italic","type":null},{"click":"chrome:field:execute({command:\\"Underline\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_underline.png","disabledIcon":"/temp/font_style_underline_disabled16x16.png","isDivider":false,"tooltip":"Underline","type":null},{"click":"chrome:field:insertlink","header":"","icon":"/temp/iconcache/office/16x16/link.png","disabledIcon":"/temp/link_disabled16x16.png","isDivider":false,"tooltip":"Insert a link into the text field.","type":null},{"click":"chrome:field:insertimage","header":"Insert image","icon":"/temp/iconcache/office/16x16/photo_landscape.png","disabledIcon":"/temp/photo_landscape_disabled16x16.png","isDivider":false,"tooltip":"Insert an image into the text field.","type":null},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{F5201E35-7674-44EB-B903-E52488A0EB5A}?lang=en&ver=1","custom":{},"displayName":"Body","expandedDisplayName":null}</span><span scFieldType="rich text" scDefaultText="[No text in field]" contenteditable="true" class="scWebEditInput" id="fld_F5201E35767444EBB903E52488A0EB5A_B4B1C4B8AA0349D1871A918BC61A532D_en_1_0f581df6173e468f9c0b36bd730739e4_9_edit"><p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p></span>',
                        },
                        title: {
                          value: 'First slide label!',
                          editable:
                            '<input id=\'fld_F5201E35767444EBB903E52488A0EB5A_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_0f581df6173e468f9c0b36bd730739e4_10\' class=\'scFieldValue\' name=\'fld_F5201E35767444EBB903E52488A0EB5A_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_0f581df6173e468f9c0b36bd730739e4_10\' type=\'hidden\' value="First slide label!" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{F5201E35-7674-44EB-B903-E52488A0EB5A}?lang=en&ver=1","custom":{},"displayName":"Title","expandedDisplayName":null}</span><span id="fld_F5201E35767444EBB903E52488A0EB5A_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_0f581df6173e468f9c0b36bd730739e4_10_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">First slide label!</span>',
                        },
                        image: {
                          value: {
                            src:
                              'http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/1.ashx?h=350&amp;la=en&amp;w=650&amp;hash=B973470AA333773341C62A76511361C88897E2D4',
                            alt: '',
                            width: '650',
                            height: '350',
                          },
                          editable:
                            '<input id=\'fld_F5201E35767444EBB903E52488A0EB5A_B7F425624A1F4F3F925C4A4381197239_en_1_0f581df6173e468f9c0b36bd730739e4_11\' class=\'scFieldValue\' name=\'fld_F5201E35767444EBB903E52488A0EB5A_B7F425624A1F4F3F925C4A4381197239_en_1_0f581df6173e468f9c0b36bd730739e4_11\' type=\'hidden\' value="&lt;image mediaid=&quot;{B013777F-C6CA-4880-9562-B9B7688AF63A}&quot; /&gt;" /><code id="fld_F5201E35767444EBB903E52488A0EB5A_B7F425624A1F4F3F925C4A4381197239_en_1_0f581df6173e468f9c0b36bd730739e4_11_edit" type="text/sitecore" chromeType="field" scFieldType="image" class="scpm" kind="open">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: chooseimage\\"})","header":"Choose Image","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2.png","disabledIcon":"/temp/photo_landscape2_disabled16x16.png","isDivider":false,"tooltip":"Choose an image.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: editimage\\"})","header":"Properties","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_edit.png","disabledIcon":"/temp/photo_landscape2_edit_disabled16x16.png","isDivider":false,"tooltip":"Modify image appearance.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: clearimage\\"})","header":"Clear","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_delete.png","disabledIcon":"/temp/photo_landscape2_delete_disabled16x16.png","isDivider":false,"tooltip":"Remove the image.","type":""},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{F5201E35-7674-44EB-B903-E52488A0EB5A}?lang=en&ver=1","custom":{},"displayName":"Image","expandedDisplayName":null}</code><img src="http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/1.ashx?h=350&amp;la=en&amp;w=650&amp;hash=B973470AA333773341C62A76511361C88897E2D4" alt="" width="650" height="350" /><code class="scpm" type="text/sitecore" chromeType="field" kind="close"></code>',
                        },
                      },
                      {
                        body: {
                          value: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
                          editable:
                            '<input id=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_B4B1C4B8AA0349D1871A918BC61A532D_en_1_10eb10c21fed4514b5e227fd8062ece0_12\' class=\'scFieldValue\' name=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_B4B1C4B8AA0349D1871A918BC61A532D_en_1_10eb10c21fed4514b5e227fd8062ece0_12\' type=\'hidden\' value="&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&lt;/p&gt;" /><span class="scChromeData">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: edithtml\\"})","header":"Edit Text","icon":"/temp/iconcache/office/16x16/pencil.png","disabledIcon":"/temp/pencil_disabled16x16.png","isDivider":false,"tooltip":"Edit the text","type":null},{"click":"chrome:field:execute({command:\\"bold\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_bold.png","disabledIcon":"/temp/font_style_bold_disabled16x16.png","isDivider":false,"tooltip":"Bold","type":null},{"click":"chrome:field:execute({command:\\"Italic\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_italics.png","disabledIcon":"/temp/font_style_italics_disabled16x16.png","isDivider":false,"tooltip":"Italic","type":null},{"click":"chrome:field:execute({command:\\"Underline\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_underline.png","disabledIcon":"/temp/font_style_underline_disabled16x16.png","isDivider":false,"tooltip":"Underline","type":null},{"click":"chrome:field:insertlink","header":"","icon":"/temp/iconcache/office/16x16/link.png","disabledIcon":"/temp/link_disabled16x16.png","isDivider":false,"tooltip":"Insert a link into the text field.","type":null},{"click":"chrome:field:insertimage","header":"Insert image","icon":"/temp/iconcache/office/16x16/photo_landscape.png","disabledIcon":"/temp/photo_landscape_disabled16x16.png","isDivider":false,"tooltip":"Insert an image into the text field.","type":null},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{FC4163F7-F334-4F9E-8DD8-C718AC76FC48}?lang=en&ver=1","custom":{},"displayName":"Body","expandedDisplayName":null}</span><span scFieldType="rich text" scDefaultText="[No text in field]" contenteditable="true" class="scWebEditInput" id="fld_FC4163F7F3344F9E8DD8C718AC76FC48_B4B1C4B8AA0349D1871A918BC61A532D_en_1_10eb10c21fed4514b5e227fd8062ece0_12_edit"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></span>',
                        },
                        title: {
                          value: 'Second slide label',
                          editable:
                            '<input id=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_10eb10c21fed4514b5e227fd8062ece0_13\' class=\'scFieldValue\' name=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_10eb10c21fed4514b5e227fd8062ece0_13\' type=\'hidden\' value="Second slide label" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{FC4163F7-F334-4F9E-8DD8-C718AC76FC48}?lang=en&ver=1","custom":{},"displayName":"Title","expandedDisplayName":null}</span><span id="fld_FC4163F7F3344F9E8DD8C718AC76FC48_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_10eb10c21fed4514b5e227fd8062ece0_13_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">Second slide label</span>',
                        },
                        image: {
                          value: {
                            src:
                              'http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/2.ashx?h=350&amp;la=en&amp;w=650&amp;hash=B39765EEA24364E825C8F2660A2730739B2462BA',
                            alt: '',
                            width: '650',
                            height: '350',
                          },
                          editable:
                            '<input id=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_B7F425624A1F4F3F925C4A4381197239_en_1_10eb10c21fed4514b5e227fd8062ece0_14\' class=\'scFieldValue\' name=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_B7F425624A1F4F3F925C4A4381197239_en_1_10eb10c21fed4514b5e227fd8062ece0_14\' type=\'hidden\' value="&lt;image mediaid=&quot;{7B896A1F-49C9-45F1-89A7-0B8A9AC8BC1D}&quot; /&gt;" /><code id="fld_FC4163F7F3344F9E8DD8C718AC76FC48_B7F425624A1F4F3F925C4A4381197239_en_1_10eb10c21fed4514b5e227fd8062ece0_14_edit" type="text/sitecore" chromeType="field" scFieldType="image" class="scpm" kind="open">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: chooseimage\\"})","header":"Choose Image","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2.png","disabledIcon":"/temp/photo_landscape2_disabled16x16.png","isDivider":false,"tooltip":"Choose an image.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: editimage\\"})","header":"Properties","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_edit.png","disabledIcon":"/temp/photo_landscape2_edit_disabled16x16.png","isDivider":false,"tooltip":"Modify image appearance.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: clearimage\\"})","header":"Clear","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_delete.png","disabledIcon":"/temp/photo_landscape2_delete_disabled16x16.png","isDivider":false,"tooltip":"Remove the image.","type":""},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{FC4163F7-F334-4F9E-8DD8-C718AC76FC48}?lang=en&ver=1","custom":{},"displayName":"Image","expandedDisplayName":null}</code><img src="http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/2.ashx?h=350&amp;la=en&amp;w=650&amp;hash=B39765EEA24364E825C8F2660A2730739B2462BA" alt="" width="650" height="350" /><code class="scpm" type="text/sitecore" chromeType="field" kind="close"></code>',
                        },
                      },
                      {
                        body: {
                          value:
                            '<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>',
                          editable:
                            '<input id=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B4B1C4B8AA0349D1871A918BC61A532D_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_15\' class=\'scFieldValue\' name=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B4B1C4B8AA0349D1871A918BC61A532D_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_15\' type=\'hidden\' value="&lt;p&gt;Praesent commodo cursus magna, vel scelerisque nisl consectetur.&lt;/p&gt;" /><span class="scChromeData">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: edithtml\\"})","header":"Edit Text","icon":"/temp/iconcache/office/16x16/pencil.png","disabledIcon":"/temp/pencil_disabled16x16.png","isDivider":false,"tooltip":"Edit the text","type":null},{"click":"chrome:field:execute({command:\\"bold\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_bold.png","disabledIcon":"/temp/font_style_bold_disabled16x16.png","isDivider":false,"tooltip":"Bold","type":null},{"click":"chrome:field:execute({command:\\"Italic\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_italics.png","disabledIcon":"/temp/font_style_italics_disabled16x16.png","isDivider":false,"tooltip":"Italic","type":null},{"click":"chrome:field:execute({command:\\"Underline\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_underline.png","disabledIcon":"/temp/font_style_underline_disabled16x16.png","isDivider":false,"tooltip":"Underline","type":null},{"click":"chrome:field:insertlink","header":"","icon":"/temp/iconcache/office/16x16/link.png","disabledIcon":"/temp/link_disabled16x16.png","isDivider":false,"tooltip":"Insert a link into the text field.","type":null},{"click":"chrome:field:insertimage","header":"Insert image","icon":"/temp/iconcache/office/16x16/photo_landscape.png","disabledIcon":"/temp/photo_landscape_disabled16x16.png","isDivider":false,"tooltip":"Insert an image into the text field.","type":null},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{B7B86C3B-66E3-4BE3-831B-B8B3088EF3DB}?lang=en&ver=1","custom":{},"displayName":"Body","expandedDisplayName":null}</span><span scFieldType="rich text" scDefaultText="[No text in field]" contenteditable="true" class="scWebEditInput" id="fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B4B1C4B8AA0349D1871A918BC61A532D_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_15_edit"><p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p></span>',
                        },
                        title: {
                          value: 'Third slide label',
                          editable:
                            '<input id=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_16\' class=\'scFieldValue\' name=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_16\' type=\'hidden\' value="Third slide label" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{B7B86C3B-66E3-4BE3-831B-B8B3088EF3DB}?lang=en&ver=1","custom":{},"displayName":"Title","expandedDisplayName":null}</span><span id="fld_B7B86C3B66E34BE3831BB8B3088EF3DB_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_16_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">Third slide label</span>',
                        },
                        image: {
                          value: {
                            src:
                              'http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/3.ashx?h=350&amp;la=en&amp;w=650&amp;hash=9B3E9D55580CE7930DB50C0F2378F2025215261F',
                            alt: '',
                            width: '650',
                            height: '350',
                          },
                          editable:
                            '<input id=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B7F425624A1F4F3F925C4A4381197239_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_17\' class=\'scFieldValue\' name=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B7F425624A1F4F3F925C4A4381197239_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_17\' type=\'hidden\' value="&lt;image mediaid=&quot;{79CC4D3E-4CF6-4B51-9F1A-A58B6726D2D7}&quot; /&gt;" /><code id="fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B7F425624A1F4F3F925C4A4381197239_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_17_edit" type="text/sitecore" chromeType="field" scFieldType="image" class="scpm" kind="open">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: chooseimage\\"})","header":"Choose Image","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2.png","disabledIcon":"/temp/photo_landscape2_disabled16x16.png","isDivider":false,"tooltip":"Choose an image.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: editimage\\"})","header":"Properties","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_edit.png","disabledIcon":"/temp/photo_landscape2_edit_disabled16x16.png","isDivider":false,"tooltip":"Modify image appearance.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: clearimage\\"})","header":"Clear","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_delete.png","disabledIcon":"/temp/photo_landscape2_delete_disabled16x16.png","isDivider":false,"tooltip":"Remove the image.","type":""},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{B7B86C3B-66E3-4BE3-831B-B8B3088EF3DB}?lang=en&ver=1","custom":{},"displayName":"Image","expandedDisplayName":null}</code><img src="http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/3.ashx?h=350&amp;la=en&amp;w=650&amp;hash=9B3E9D55580CE7930DB50C0F2378F2025215261F" alt="" width="650" height="350" /><code class="scpm" type="text/sitecore" chromeType="field" kind="close"></code>',
                        },
                      },
                    ],
                  },
                  attributes: {
                    type: 'data/json',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents: '',
                  attributes: {
                    type: 'text/sitecore',
                    id: 'scEnclosingTag_r_',
                    chrometype: 'rendering',
                    kind: 'close',
                    hintkey: 'Carousel',
                    class: 'scpm',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents: '',
                  attributes: {
                    type: 'text/sitecore',
                    id: 'scEnclosingTag_',
                    chrometype: 'placeholder',
                    kind: 'close',
                    hintname: 'page-content',
                    class: 'scpm',
                  },
                },
              ],
            },
          ],
          name: 'code',
          type: 'data/json',
          contents: null,
          attributes: {
            type: 'data/json',
          },
        },
        {
          name: 'code',
          type: 'text/sitecore',
          contents: '',
          attributes: {
            type: 'text/sitecore',
            id: 'scEnclosingTag_r_',
            chrometype: 'rendering',
            kind: 'close',
            hintkey: 'Portfolio',
            class: 'scpm',
          },
        },
        {
          name: 'code',
          type: 'text/sitecore',
          contents: '',
          attributes: {
            type: 'text/sitecore',
            id: 'scEnclosingTag_',
            chrometype: 'placeholder',
            kind: 'close',
            hintname: 'main',
            class: 'scpm',
          },
        },
      ],
    },
  ],
};

/* ************

converted data

************** */

export const convertedData = {
  sitecore: {
    context: {
      pageEditing: true,
      user: {
        domain: 'sitecore',
        name: 'Admin',
      },
      site: {
        name: 'jssadvancedapp',
      },
      navigation: [
        {
          name: 'Home',
          path: '/',
          children: [
            {
              name: 'About',
              path: '/about',
            },
            {
              name: 'Portfolio',
              path: '/portfolio',
            },
            {
              name: 'Services',
              path: '/services',
            },
          ],
        },
      ],
    },
    route: {
      name: 'portfolio',
      displayName: 'Portfolio',
      fields: {
        metaTitle: {
          value: '',
          editable:
            '<input id=\'fld_0C727FB29E8446A3A46E1DB91C7B115F_FB00D0EA46A34F769C3B67552395C539_en_1_b9e700b508bb46378e3ed4159ff0fe36_6\' class=\'scFieldValue\' name=\'fld_0C727FB29E8446A3A46E1DB91C7B115F_FB00D0EA46A34F769C3B67552395C539_en_1_b9e700b508bb46378e3ed4159ff0fe36_6\' type=\'hidden\' value="" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{0C727FB2-9E84-46A3-A46E-1DB91C7B115F}?lang=en&ver=1","custom":{},"displayName":"metaTitle","expandedDisplayName":null}</span><span id="fld_0C727FB29E8446A3A46E1DB91C7B115F_FB00D0EA46A34F769C3B67552395C539_en_1_b9e700b508bb46378e3ed4159ff0fe36_6_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]" scWatermark="true">[No text in field]</span>',
        },
      },
      placeholders: {
        main: [
          {
            name: 'code',
            type: 'text/sitecore',
            contents:
              '{"commands":[{"click":"chrome:placeholder:addControl","header":"Add to here","icon":"/temp/iconcache/office/16x16/add.png","disabledIcon":"/temp/add_disabled16x16.png","isDivider":false,"tooltip":"Add a new rendering to the \'{0}\' placeholder.","type":""},{"click":"chrome:placeholder:editSettings","header":"","icon":"/temp/iconcache/office/16x16/window_gear.png","disabledIcon":"/temp/window_gear_disabled16x16.png","isDivider":false,"tooltip":"Edit the placeholder settings.","type":""}],"contextItemUri":"sitecore://master/{0C727FB2-9E84-46A3-A46E-1DB91C7B115F}?lang=en&ver=1","custom":{"allowedRenderings":["95991A47B356449FA4B1D4293771BE5B","0459E414DD26478F87D86756EA3772A2","5478062B9BED43F5967A8C42066B053F","7143F00E934242D1901E2C48A7794796"],"editable":"true"},"displayName":"main","expandedDisplayName":null}',
            attributes: {
              type: 'text/sitecore',
              chrometype: 'placeholder',
              kind: 'open',
              id: 'main',
              key: 'main',
              class: 'scpm',
              'data-selectable': 'true',
            },
          },
          {
            name: 'code',
            type: 'text/sitecore',
            contents:
              '{"commands":[{"click":"chrome:rendering:sort","header":"Change position","icon":"/temp/iconcache/office/16x16/document_size.png","disabledIcon":"/temp/document_size_disabled16x16.png","isDivider":false,"tooltip":"Move component.","type":""},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:componentoptions(referenceId={0A44B6E4-67A9-4E82-8246-A17E048B9EB8},renderingId={5478062B-9BED-43F5-967A-8C42066B053F},id={0C727FB2-9E84-46A3-A46E-1DB91C7B115F})\',null,false)","header":"Edit Experience Editor Options","icon":"/temp/iconcache/office/16x16/clipboard_check_edit.png","disabledIcon":"/temp/clipboard_check_edit_disabled16x16.png","isDivider":false,"tooltip":"Edit the Experience Editor options for the component.","type":"common"},{"click":"chrome:rendering:properties","header":"Edit component properties","icon":"/temp/iconcache/office/16x16/elements_branch.png","disabledIcon":"/temp/elements_branch_disabled16x16.png","isDivider":false,"tooltip":"Edit the properties for the component.","type":"common"},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:setdatasource(referenceId={0A44B6E4-67A9-4E82-8246-A17E048B9EB8},renderingId={5478062B-9BED-43F5-967A-8C42066B053F},id={0C727FB2-9E84-46A3-A46E-1DB91C7B115F})\',null,false)","header":"{dsHeader}","icon":"/temp/iconcache/office/16x16/data.png","disabledIcon":"/temp/data_disabled16x16.png","isDivider":false,"tooltip":"{dsTooltip}","type":"datasourcesmenu"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Test the component.","type":"sticky"},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"datasourcesmenu"},{"click":"chrome:rendering:delete","header":"Delete","icon":"/temp/iconcache/office/16x16/delete.png","disabledIcon":"/temp/delete_disabled16x16.png","isDivider":false,"tooltip":"Remove component.","type":"sticky"}],"contextItemUri":"sitecore://master/{0C727FB2-9E84-46A3-A46E-1DB91C7B115F}?lang=en&ver=1","custom":{"renderingID":"5478062B9BED43F5967A8C42066B053F","editable":"true"},"displayName":"Portfolio","expandedDisplayName":null}',
            attributes: {
              type: 'text/sitecore',
              chrometype: 'rendering',
              kind: 'open',
              hintname: 'Portfolio',
              id: 'r_0A44B6E467A94E828246A17E048B9EB8',
              class: 'scpm',
              'data-selectable': 'true',
            },
          },
          {
            uid: '0a44b6e4-67a9-4e82-8246-a17e048b9eb8',
            componentName: 'Portfolio',
            dataSource: '{F5ECF6C0-2FF2-497A-BB75-96E4B847D9EF}',
            placeholders: {
              'page-header': [
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:placeholder:addControl","header":"Add to here","icon":"/temp/iconcache/office/16x16/add.png","disabledIcon":"/temp/add_disabled16x16.png","isDivider":false,"tooltip":"Add a new rendering to the \'{0}\' placeholder.","type":""},{"click":"chrome:placeholder:editSettings","header":"","icon":"/temp/iconcache/office/16x16/window_gear.png","disabledIcon":"/temp/window_gear_disabled16x16.png","isDivider":false,"tooltip":"Edit the placeholder settings.","type":""}],"contextItemUri":"sitecore://master/{0C727FB2-9E84-46A3-A46E-1DB91C7B115F}?lang=en&ver=1","custom":{"allowedRenderings":["0458209CE5F14D1E839051ED91CF3122"],"editable":"true"},"displayName":"page-header","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'placeholder',
                    kind: 'open',
                    id: '_main_page_header_0A44B6E4_67A9_4E82_8246_A17E048B9EB8',
                    key: '/main/page-header_0A44B6E4-67A9-4E82-8246-A17E048B9EB8',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:rendering:sort","header":"Change position","icon":"/temp/iconcache/office/16x16/document_size.png","disabledIcon":"/temp/document_size_disabled16x16.png","isDivider":false,"tooltip":"Move component.","type":""},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:componentoptions(referenceId={8A0D4795-C7D0-4FEC-9369-0B89F3162073},renderingId={0458209C-E5F1-4D1E-8390-51ED91CF3122},id={24E8F2AC-6685-4A64-8601-9F7165F6FE62})\',null,false)","header":"Edit Experience Editor Options","icon":"/temp/iconcache/office/16x16/clipboard_check_edit.png","disabledIcon":"/temp/clipboard_check_edit_disabled16x16.png","isDivider":false,"tooltip":"Edit the Experience Editor options for the component.","type":"common"},{"click":"chrome:rendering:properties","header":"Edit component properties","icon":"/temp/iconcache/office/16x16/elements_branch.png","disabledIcon":"/temp/elements_branch_disabled16x16.png","isDivider":false,"tooltip":"Edit the properties for the component.","type":"common"},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:setdatasource(referenceId={8A0D4795-C7D0-4FEC-9369-0B89F3162073},renderingId={0458209C-E5F1-4D1E-8390-51ED91CF3122},id={24E8F2AC-6685-4A64-8601-9F7165F6FE62})\',null,false)","header":"{dsHeader}","icon":"/temp/iconcache/office/16x16/data.png","disabledIcon":"/temp/data_disabled16x16.png","isDivider":false,"tooltip":"{dsTooltip}","type":"datasourcesmenu"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Test the component.","type":"sticky"},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"datasourcesmenu"},{"click":"chrome:rendering:delete","header":"Delete","icon":"/temp/iconcache/office/16x16/delete.png","disabledIcon":"/temp/delete_disabled16x16.png","isDivider":false,"tooltip":"Remove component.","type":"sticky"}],"contextItemUri":"sitecore://master/{24E8F2AC-6685-4A64-8601-9F7165F6FE62}?lang=en&ver=1","custom":{"renderingID":"0458209CE5F14D1E839051ED91CF3122","editable":"true"},"displayName":"Jumbotron","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'rendering',
                    kind: 'open',
                    hintname: 'Jumbotron',
                    id: 'r_8A0D4795C7D04FEC93690B89F3162073',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  uid: '8a0d4795-c7d0-4fec-9369-0b89f3162073',
                  componentName: 'Jumbotron',
                  fields: {
                    titleText: {
                      value: 'Portfolio',
                      editable:
                        '<input id=\'fld_24E8F2AC66854A6486019F7165F6FE62_91833116CE0949D1B951C47EC9054F66_en_1_a84bd781ddb44e93a2e65838a1386619_7\' class=\'scFieldValue\' name=\'fld_24E8F2AC66854A6486019F7165F6FE62_91833116CE0949D1B951C47EC9054F66_en_1_a84bd781ddb44e93a2e65838a1386619_7\' type=\'hidden\' value="Portfolio" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{24E8F2AC-6685-4A64-8601-9F7165F6FE62}?lang=en&ver=1","custom":{},"displayName":"Title Text","expandedDisplayName":null}</span><span id="fld_24E8F2AC66854A6486019F7165F6FE62_91833116CE0949D1B951C47EC9054F66_en_1_a84bd781ddb44e93a2e65838a1386619_7_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">Portfolio</span>',
                    },
                    body: {
                      value: '',
                      editable:
                        '<input id=\'fld_24E8F2AC66854A6486019F7165F6FE62_0404166A350A43D4BC1592D7B2F43834_en_1_a84bd781ddb44e93a2e65838a1386619_8\' class=\'scFieldValue\' name=\'fld_24E8F2AC66854A6486019F7165F6FE62_0404166A350A43D4BC1592D7B2F43834_en_1_a84bd781ddb44e93a2e65838a1386619_8\' type=\'hidden\' value="" /><span class="scChromeData">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: edithtml\\"})","header":"Edit Text","icon":"/temp/iconcache/office/16x16/pencil.png","disabledIcon":"/temp/pencil_disabled16x16.png","isDivider":false,"tooltip":"Edit the text","type":null},{"click":"chrome:field:execute({command:\\"bold\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_bold.png","disabledIcon":"/temp/font_style_bold_disabled16x16.png","isDivider":false,"tooltip":"Bold","type":null},{"click":"chrome:field:execute({command:\\"Italic\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_italics.png","disabledIcon":"/temp/font_style_italics_disabled16x16.png","isDivider":false,"tooltip":"Italic","type":null},{"click":"chrome:field:execute({command:\\"Underline\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_underline.png","disabledIcon":"/temp/font_style_underline_disabled16x16.png","isDivider":false,"tooltip":"Underline","type":null},{"click":"chrome:field:insertlink","header":"","icon":"/temp/iconcache/office/16x16/link.png","disabledIcon":"/temp/link_disabled16x16.png","isDivider":false,"tooltip":"Insert a link into the text field.","type":null},{"click":"chrome:field:insertimage","header":"Insert image","icon":"/temp/iconcache/office/16x16/photo_landscape.png","disabledIcon":"/temp/photo_landscape_disabled16x16.png","isDivider":false,"tooltip":"Insert an image into the text field.","type":null},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{24E8F2AC-6685-4A64-8601-9F7165F6FE62}?lang=en&ver=1","custom":{},"displayName":"Body","expandedDisplayName":null}</span><span id="fld_24E8F2AC66854A6486019F7165F6FE62_0404166A350A43D4BC1592D7B2F43834_en_1_a84bd781ddb44e93a2e65838a1386619_8_edit" contenteditable="true" class="scWebEditInput" scFieldType="rich text" scDefaultText="[No text in field]" scWatermark="true">[No text in field]</span>',
                    },
                  },
                  params: {
                    shade: 'light',
                    titleSize: '2',
                  },
                  dataSource: '{F5ECF6C0-2FF2-497A-BB75-96E4B847D9EF}',
                  placeholders: {},
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents: '',
                  attributes: {
                    type: 'text/sitecore',
                    id: 'scEnclosingTag_r_',
                    chrometype: 'rendering',
                    kind: 'close',
                    hintkey: 'Jumbotron',
                    class: 'scpm',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents: '',
                  attributes: {
                    type: 'text/sitecore',
                    id: 'scEnclosingTag_',
                    chrometype: 'placeholder',
                    kind: 'close',
                    hintname: 'page-header',
                    class: 'scpm',
                  },
                },
              ],
              'page-content': [
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:placeholder:addControl","header":"Add to here","icon":"/temp/iconcache/office/16x16/add.png","disabledIcon":"/temp/add_disabled16x16.png","isDivider":false,"tooltip":"Add a new rendering to the \'{0}\' placeholder.","type":""},{"click":"chrome:placeholder:editSettings","header":"","icon":"/temp/iconcache/office/16x16/window_gear.png","disabledIcon":"/temp/window_gear_disabled16x16.png","isDivider":false,"tooltip":"Edit the placeholder settings.","type":""}],"contextItemUri":"sitecore://master/{0C727FB2-9E84-46A3-A46E-1DB91C7B115F}?lang=en&ver=1","custom":{"allowedRenderings":["2121DEA51D324E22865C6C03EF1B228C","99DEC8C2B93A49328630575F115C87AA","024A959995F34985A3D05EECE09FB8E0","C87E2F6F2F2445BFBBD109F0BE520F4C"],"editable":"true"},"displayName":"page-content","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'placeholder',
                    kind: 'open',
                    id: '_main_page_content_0A44B6E4_67A9_4E82_8246_A17E048B9EB8',
                    key: '/main/page-content_0A44B6E4-67A9-4E82-8246-A17E048B9EB8',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:rendering:sort","header":"Change position","icon":"/temp/iconcache/office/16x16/document_size.png","disabledIcon":"/temp/document_size_disabled16x16.png","isDivider":false,"tooltip":"Move component.","type":""},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:componentoptions(referenceId={D28A2E1F-866E-475C-9ED6-246EE5CC7AEA},renderingId={C87E2F6F-2F24-45BF-BBD1-09F0BE520F4C},id={D484E0E0-2E81-4326-A560-5F070B98813E})\',null,false)","header":"Edit Experience Editor Options","icon":"/temp/iconcache/office/16x16/clipboard_check_edit.png","disabledIcon":"/temp/clipboard_check_edit_disabled16x16.png","isDivider":false,"tooltip":"Edit the Experience Editor options for the component.","type":"common"},{"click":"chrome:rendering:properties","header":"Edit component properties","icon":"/temp/iconcache/office/16x16/elements_branch.png","disabledIcon":"/temp/elements_branch_disabled16x16.png","isDivider":false,"tooltip":"Edit the properties for the component.","type":"common"},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:setdatasource(referenceId={D28A2E1F-866E-475C-9ED6-246EE5CC7AEA},renderingId={C87E2F6F-2F24-45BF-BBD1-09F0BE520F4C},id={D484E0E0-2E81-4326-A560-5F070B98813E})\',null,false)","header":"{dsHeader}","icon":"/temp/iconcache/office/16x16/data.png","disabledIcon":"/temp/data_disabled16x16.png","isDivider":false,"tooltip":"{dsTooltip}","type":"datasourcesmenu"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Test the component.","type":"sticky"},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"datasourcesmenu"},{"click":"chrome:rendering:delete","header":"Delete","icon":"/temp/iconcache/office/16x16/delete.png","disabledIcon":"/temp/delete_disabled16x16.png","isDivider":false,"tooltip":"Remove component.","type":"sticky"}],"contextItemUri":"sitecore://master/{D484E0E0-2E81-4326-A560-5F070B98813E}?lang=en&ver=1","custom":{"renderingID":"C87E2F6F2F2445BFBBD109F0BE520F4C","editable":"true"},"displayName":"Carousel","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'rendering',
                    kind: 'open',
                    hintname: 'Carousel',
                    id: 'r_D28A2E1F866E475C9ED6246EE5CC7AEA',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  uid: 'd28a2e1f-866e-475c-9ed6-246ee5cc7aea',
                  componentName: 'Carousel',
                  fields: {
                    items: [
                      {
                        body: {
                          value:
                            '<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>',
                          editable:
                            '<input id=\'fld_F5201E35767444EBB903E52488A0EB5A_B4B1C4B8AA0349D1871A918BC61A532D_en_1_0f581df6173e468f9c0b36bd730739e4_9\' class=\'scFieldValue\' name=\'fld_F5201E35767444EBB903E52488A0EB5A_B4B1C4B8AA0349D1871A918BC61A532D_en_1_0f581df6173e468f9c0b36bd730739e4_9\' type=\'hidden\' value="&lt;p&gt;Nulla vitae elit libero, a pharetra augue mollis interdum.&lt;/p&gt;" /><span class="scChromeData">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: edithtml\\"})","header":"Edit Text","icon":"/temp/iconcache/office/16x16/pencil.png","disabledIcon":"/temp/pencil_disabled16x16.png","isDivider":false,"tooltip":"Edit the text","type":null},{"click":"chrome:field:execute({command:\\"bold\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_bold.png","disabledIcon":"/temp/font_style_bold_disabled16x16.png","isDivider":false,"tooltip":"Bold","type":null},{"click":"chrome:field:execute({command:\\"Italic\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_italics.png","disabledIcon":"/temp/font_style_italics_disabled16x16.png","isDivider":false,"tooltip":"Italic","type":null},{"click":"chrome:field:execute({command:\\"Underline\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_underline.png","disabledIcon":"/temp/font_style_underline_disabled16x16.png","isDivider":false,"tooltip":"Underline","type":null},{"click":"chrome:field:insertlink","header":"","icon":"/temp/iconcache/office/16x16/link.png","disabledIcon":"/temp/link_disabled16x16.png","isDivider":false,"tooltip":"Insert a link into the text field.","type":null},{"click":"chrome:field:insertimage","header":"Insert image","icon":"/temp/iconcache/office/16x16/photo_landscape.png","disabledIcon":"/temp/photo_landscape_disabled16x16.png","isDivider":false,"tooltip":"Insert an image into the text field.","type":null},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{F5201E35-7674-44EB-B903-E52488A0EB5A}?lang=en&ver=1","custom":{},"displayName":"Body","expandedDisplayName":null}</span><span scFieldType="rich text" scDefaultText="[No text in field]" contenteditable="true" class="scWebEditInput" id="fld_F5201E35767444EBB903E52488A0EB5A_B4B1C4B8AA0349D1871A918BC61A532D_en_1_0f581df6173e468f9c0b36bd730739e4_9_edit"><p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p></span>',
                        },
                        title: {
                          value: 'First slide label!',
                          editable:
                            '<input id=\'fld_F5201E35767444EBB903E52488A0EB5A_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_0f581df6173e468f9c0b36bd730739e4_10\' class=\'scFieldValue\' name=\'fld_F5201E35767444EBB903E52488A0EB5A_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_0f581df6173e468f9c0b36bd730739e4_10\' type=\'hidden\' value="First slide label!" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{F5201E35-7674-44EB-B903-E52488A0EB5A}?lang=en&ver=1","custom":{},"displayName":"Title","expandedDisplayName":null}</span><span id="fld_F5201E35767444EBB903E52488A0EB5A_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_0f581df6173e468f9c0b36bd730739e4_10_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">First slide label!</span>',
                        },
                        image: {
                          value: {
                            src:
                              'http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/1.ashx?h=350&amp;la=en&amp;w=650&amp;hash=B973470AA333773341C62A76511361C88897E2D4',
                            alt: '',
                            width: '650',
                            height: '350',
                          },
                          editable:
                            '<input id=\'fld_F5201E35767444EBB903E52488A0EB5A_B7F425624A1F4F3F925C4A4381197239_en_1_0f581df6173e468f9c0b36bd730739e4_11\' class=\'scFieldValue\' name=\'fld_F5201E35767444EBB903E52488A0EB5A_B7F425624A1F4F3F925C4A4381197239_en_1_0f581df6173e468f9c0b36bd730739e4_11\' type=\'hidden\' value="&lt;image mediaid=&quot;{B013777F-C6CA-4880-9562-B9B7688AF63A}&quot; /&gt;" /><code id="fld_F5201E35767444EBB903E52488A0EB5A_B7F425624A1F4F3F925C4A4381197239_en_1_0f581df6173e468f9c0b36bd730739e4_11_edit" type="text/sitecore" chromeType="field" scFieldType="image" class="scpm" kind="open">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: chooseimage\\"})","header":"Choose Image","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2.png","disabledIcon":"/temp/photo_landscape2_disabled16x16.png","isDivider":false,"tooltip":"Choose an image.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: editimage\\"})","header":"Properties","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_edit.png","disabledIcon":"/temp/photo_landscape2_edit_disabled16x16.png","isDivider":false,"tooltip":"Modify image appearance.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: clearimage\\"})","header":"Clear","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_delete.png","disabledIcon":"/temp/photo_landscape2_delete_disabled16x16.png","isDivider":false,"tooltip":"Remove the image.","type":""},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{F5201E35-7674-44EB-B903-E52488A0EB5A}?lang=en&ver=1","custom":{},"displayName":"Image","expandedDisplayName":null}</code><img src="http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/1.ashx?h=350&amp;la=en&amp;w=650&amp;hash=B973470AA333773341C62A76511361C88897E2D4" alt="" width="650" height="350" /><code class="scpm" type="text/sitecore" chromeType="field" kind="close"></code>',
                        },
                      },
                      {
                        body: {
                          value: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
                          editable:
                            '<input id=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_B4B1C4B8AA0349D1871A918BC61A532D_en_1_10eb10c21fed4514b5e227fd8062ece0_12\' class=\'scFieldValue\' name=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_B4B1C4B8AA0349D1871A918BC61A532D_en_1_10eb10c21fed4514b5e227fd8062ece0_12\' type=\'hidden\' value="&lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&lt;/p&gt;" /><span class="scChromeData">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: edithtml\\"})","header":"Edit Text","icon":"/temp/iconcache/office/16x16/pencil.png","disabledIcon":"/temp/pencil_disabled16x16.png","isDivider":false,"tooltip":"Edit the text","type":null},{"click":"chrome:field:execute({command:\\"bold\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_bold.png","disabledIcon":"/temp/font_style_bold_disabled16x16.png","isDivider":false,"tooltip":"Bold","type":null},{"click":"chrome:field:execute({command:\\"Italic\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_italics.png","disabledIcon":"/temp/font_style_italics_disabled16x16.png","isDivider":false,"tooltip":"Italic","type":null},{"click":"chrome:field:execute({command:\\"Underline\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_underline.png","disabledIcon":"/temp/font_style_underline_disabled16x16.png","isDivider":false,"tooltip":"Underline","type":null},{"click":"chrome:field:insertlink","header":"","icon":"/temp/iconcache/office/16x16/link.png","disabledIcon":"/temp/link_disabled16x16.png","isDivider":false,"tooltip":"Insert a link into the text field.","type":null},{"click":"chrome:field:insertimage","header":"Insert image","icon":"/temp/iconcache/office/16x16/photo_landscape.png","disabledIcon":"/temp/photo_landscape_disabled16x16.png","isDivider":false,"tooltip":"Insert an image into the text field.","type":null},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{FC4163F7-F334-4F9E-8DD8-C718AC76FC48}?lang=en&ver=1","custom":{},"displayName":"Body","expandedDisplayName":null}</span><span scFieldType="rich text" scDefaultText="[No text in field]" contenteditable="true" class="scWebEditInput" id="fld_FC4163F7F3344F9E8DD8C718AC76FC48_B4B1C4B8AA0349D1871A918BC61A532D_en_1_10eb10c21fed4514b5e227fd8062ece0_12_edit"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></span>',
                        },
                        title: {
                          value: 'Second slide label',
                          editable:
                            '<input id=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_10eb10c21fed4514b5e227fd8062ece0_13\' class=\'scFieldValue\' name=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_10eb10c21fed4514b5e227fd8062ece0_13\' type=\'hidden\' value="Second slide label" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{FC4163F7-F334-4F9E-8DD8-C718AC76FC48}?lang=en&ver=1","custom":{},"displayName":"Title","expandedDisplayName":null}</span><span id="fld_FC4163F7F3344F9E8DD8C718AC76FC48_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_10eb10c21fed4514b5e227fd8062ece0_13_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">Second slide label</span>',
                        },
                        image: {
                          value: {
                            src:
                              'http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/2.ashx?h=350&amp;la=en&amp;w=650&amp;hash=B39765EEA24364E825C8F2660A2730739B2462BA',
                            alt: '',
                            width: '650',
                            height: '350',
                          },
                          editable:
                            '<input id=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_B7F425624A1F4F3F925C4A4381197239_en_1_10eb10c21fed4514b5e227fd8062ece0_14\' class=\'scFieldValue\' name=\'fld_FC4163F7F3344F9E8DD8C718AC76FC48_B7F425624A1F4F3F925C4A4381197239_en_1_10eb10c21fed4514b5e227fd8062ece0_14\' type=\'hidden\' value="&lt;image mediaid=&quot;{7B896A1F-49C9-45F1-89A7-0B8A9AC8BC1D}&quot; /&gt;" /><code id="fld_FC4163F7F3344F9E8DD8C718AC76FC48_B7F425624A1F4F3F925C4A4381197239_en_1_10eb10c21fed4514b5e227fd8062ece0_14_edit" type="text/sitecore" chromeType="field" scFieldType="image" class="scpm" kind="open">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: chooseimage\\"})","header":"Choose Image","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2.png","disabledIcon":"/temp/photo_landscape2_disabled16x16.png","isDivider":false,"tooltip":"Choose an image.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: editimage\\"})","header":"Properties","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_edit.png","disabledIcon":"/temp/photo_landscape2_edit_disabled16x16.png","isDivider":false,"tooltip":"Modify image appearance.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: clearimage\\"})","header":"Clear","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_delete.png","disabledIcon":"/temp/photo_landscape2_delete_disabled16x16.png","isDivider":false,"tooltip":"Remove the image.","type":""},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{FC4163F7-F334-4F9E-8DD8-C718AC76FC48}?lang=en&ver=1","custom":{},"displayName":"Image","expandedDisplayName":null}</code><img src="http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/2.ashx?h=350&amp;la=en&amp;w=650&amp;hash=B39765EEA24364E825C8F2660A2730739B2462BA" alt="" width="650" height="350" /><code class="scpm" type="text/sitecore" chromeType="field" kind="close"></code>',
                        },
                      },
                      {
                        body: {
                          value:
                            '<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>',
                          editable:
                            '<input id=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B4B1C4B8AA0349D1871A918BC61A532D_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_15\' class=\'scFieldValue\' name=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B4B1C4B8AA0349D1871A918BC61A532D_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_15\' type=\'hidden\' value="&lt;p&gt;Praesent commodo cursus magna, vel scelerisque nisl consectetur.&lt;/p&gt;" /><span class="scChromeData">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: edithtml\\"})","header":"Edit Text","icon":"/temp/iconcache/office/16x16/pencil.png","disabledIcon":"/temp/pencil_disabled16x16.png","isDivider":false,"tooltip":"Edit the text","type":null},{"click":"chrome:field:execute({command:\\"bold\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_bold.png","disabledIcon":"/temp/font_style_bold_disabled16x16.png","isDivider":false,"tooltip":"Bold","type":null},{"click":"chrome:field:execute({command:\\"Italic\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_italics.png","disabledIcon":"/temp/font_style_italics_disabled16x16.png","isDivider":false,"tooltip":"Italic","type":null},{"click":"chrome:field:execute({command:\\"Underline\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_underline.png","disabledIcon":"/temp/font_style_underline_disabled16x16.png","isDivider":false,"tooltip":"Underline","type":null},{"click":"chrome:field:insertlink","header":"","icon":"/temp/iconcache/office/16x16/link.png","disabledIcon":"/temp/link_disabled16x16.png","isDivider":false,"tooltip":"Insert a link into the text field.","type":null},{"click":"chrome:field:insertimage","header":"Insert image","icon":"/temp/iconcache/office/16x16/photo_landscape.png","disabledIcon":"/temp/photo_landscape_disabled16x16.png","isDivider":false,"tooltip":"Insert an image into the text field.","type":null},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{B7B86C3B-66E3-4BE3-831B-B8B3088EF3DB}?lang=en&ver=1","custom":{},"displayName":"Body","expandedDisplayName":null}</span><span scFieldType="rich text" scDefaultText="[No text in field]" contenteditable="true" class="scWebEditInput" id="fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B4B1C4B8AA0349D1871A918BC61A532D_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_15_edit"><p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p></span>',
                        },
                        title: {
                          value: 'Third slide label',
                          editable:
                            '<input id=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_16\' class=\'scFieldValue\' name=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_16\' type=\'hidden\' value="Third slide label" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{B7B86C3B-66E3-4BE3-831B-B8B3088EF3DB}?lang=en&ver=1","custom":{},"displayName":"Title","expandedDisplayName":null}</span><span id="fld_B7B86C3B66E34BE3831BB8B3088EF3DB_AC35847DC2EF4F54B26FE5E50419ADE5_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_16_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">Third slide label</span>',
                        },
                        image: {
                          value: {
                            src:
                              'http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/3.ashx?h=350&amp;la=en&amp;w=650&amp;hash=9B3E9D55580CE7930DB50C0F2378F2025215261F',
                            alt: '',
                            width: '650',
                            height: '350',
                          },
                          editable:
                            '<input id=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B7F425624A1F4F3F925C4A4381197239_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_17\' class=\'scFieldValue\' name=\'fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B7F425624A1F4F3F925C4A4381197239_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_17\' type=\'hidden\' value="&lt;image mediaid=&quot;{79CC4D3E-4CF6-4B51-9F1A-A58B6726D2D7}&quot; /&gt;" /><code id="fld_B7B86C3B66E34BE3831BB8B3088EF3DB_B7F425624A1F4F3F925C4A4381197239_en_1_1ea9d5762d764a8c9a9c88afb9ead61f_17_edit" type="text/sitecore" chromeType="field" scFieldType="image" class="scpm" kind="open">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit: chooseimage\\"})","header":"Choose Image","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2.png","disabledIcon":"/temp/photo_landscape2_disabled16x16.png","isDivider":false,"tooltip":"Choose an image.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: editimage\\"})","header":"Properties","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_edit.png","disabledIcon":"/temp/photo_landscape2_edit_disabled16x16.png","isDivider":false,"tooltip":"Modify image appearance.","type":""},{"click":"chrome:field:editcontrol({command:\\"webedit: clearimage\\"})","header":"Clear","icon":"/sitecore/shell/themes/standard/custom/16x16/photo_landscape2_delete.png","disabledIcon":"/temp/photo_landscape2_delete_disabled16x16.png","isDivider":false,"tooltip":"Remove the image.","type":""},{"click":"chrome:common:edititem({command:\\"webedit: open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit: personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit: editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{B7B86C3B-66E3-4BE3-831B-B8B3088EF3DB}?lang=en&ver=1","custom":{},"displayName":"Image","expandedDisplayName":null}</code><img src="http://jssadvancedapp/sitecore/shell/-/media/JssAdvancedApp/assets/img/portfolio/3.ashx?h=350&amp;la=en&amp;w=650&amp;hash=9B3E9D55580CE7930DB50C0F2378F2025215261F" alt="" width="650" height="350" /><code class="scpm" type="text/sitecore" chromeType="field" kind="close"></code>',
                        },
                      },
                    ],
                  },
                  dataSource: '{F5ECF6C0-2FF2-497A-BB75-96E4B847D9EF}',
                  placeholders: {},
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents: '',
                  attributes: {
                    type: 'text/sitecore',
                    id: 'scEnclosingTag_r_',
                    chrometype: 'rendering',
                    kind: 'close',
                    hintkey: 'Carousel',
                    class: 'scpm',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents: '',
                  attributes: {
                    type: 'text/sitecore',
                    id: 'scEnclosingTag_',
                    chrometype: 'placeholder',
                    kind: 'close',
                    hintname: 'page-content',
                    class: 'scpm',
                  },
                },
              ],
            },
          },
          {
            name: 'code',
            type: 'text/sitecore',
            contents: '',
            attributes: {
              type: 'text/sitecore',
              id: 'scEnclosingTag_r_',
              chrometype: 'rendering',
              kind: 'close',
              hintkey: 'Portfolio',
              class: 'scpm',
            },
          },
          {
            name: 'code',
            type: 'text/sitecore',
            contents: '',
            attributes: {
              type: 'text/sitecore',
              id: 'scEnclosingTag_',
              chrometype: 'placeholder',
              kind: 'close',
              hintname: 'main',
              class: 'scpm',
            },
          },
        ],
      },
    },
  },
};
