export const lsDataEeOn = {
  sitecore: {
    context: {
      pageEditing: true,
    },
    route: {
      name: 'home',
      displayName: 'Home',
      placeholders: {
        main: [
          {
            name: 'code',
            type: 'text/sitecore',
            contents:
              '{"commands":[{"click":"chrome:placeholder:addControl","header":"Add to here","icon":"/temp/iconcache/office/16x16/add.png","disabledIcon":"/temp/add_disabled16x16.png","isDivider":false,"tooltip":"Add a new rendering to the \'{0}\' placeholder.","type":""},{"click":"chrome:placeholder:editSettings","header":"","icon":"/temp/iconcache/office/16x16/window_gear.png","disabledIcon":"/temp/window_gear_disabled16x16.png","isDivider":false,"tooltip":"Edit the placeholder settings.","type":""}],"contextItemUri":"sitecore://master/{9BCF4A17-2EC7-4160-9504-5ABD096B46AE}?lang=en&ver=1","custom":{"allowedRenderings":[],"editable":"true"},"displayName":"main","expandedDisplayName":null}',
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
              '{"commands":[{"click":"chrome:rendering:sort","header":"Change position","icon":"/temp/iconcache/office/16x16/document_size.png","disabledIcon":"/temp/document_size_disabled16x16.png","isDivider":false,"tooltip":"Move component.","type":""},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:componentoptions(referenceId={2339622D-093B-4258-8334-95979E41EFA6},renderingId={6CAAAD00-D87A-4B71-BA0E-763BA7003FE5},id={F142E1B0-EFD1-4730-BBC5-C30064AD19D9})\',null,false)","header":"Edit Experience Editor Options","icon":"/temp/iconcache/office/16x16/clipboard_check_edit.png","disabledIcon":"/temp/clipboard_check_edit_disabled16x16.png","isDivider":false,"tooltip":"Edit the Experience Editor options for the component.","type":"common"},{"click":"chrome:rendering:properties","header":"Edit component properties","icon":"/temp/iconcache/office/16x16/elements_branch.png","disabledIcon":"/temp/elements_branch_disabled16x16.png","isDivider":false,"tooltip":"Edit the properties for the component.","type":"common"},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:setdatasource(referenceId={2339622D-093B-4258-8334-95979E41EFA6},renderingId={6CAAAD00-D87A-4B71-BA0E-763BA7003FE5},id={F142E1B0-EFD1-4730-BBC5-C30064AD19D9})\',null,false)","header":"{dsHeader}","icon":"/temp/iconcache/office/16x16/data.png","disabledIcon":"/temp/data_disabled16x16.png","isDivider":false,"tooltip":"{dsTooltip}","type":"datasourcesmenu"},{"click":"chrome:rendering:personalize({command:\\"webedit:personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit:editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Test the component.","type":"sticky"},{"click":"chrome:common:edititem({command:\\"webedit:open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"datasourcesmenu"},{"click":"chrome:rendering:delete","header":"Delete","icon":"/temp/iconcache/office/16x16/delete.png","disabledIcon":"/temp/delete_disabled16x16.png","isDivider":false,"tooltip":"Remove component.","type":"sticky"}],"contextItemUri":"sitecore://master/{F142E1B0-EFD1-4730-BBC5-C30064AD19D9}?lang=en&ver=1","custom":{"renderingID":"6CAAAD00D87A4B71BA0E763BA7003FE5","editable":"true"},"displayName":"HomeRendering","expandedDisplayName":null}',
            attributes: {
              type: 'text/sitecore',
              chrometype: 'rendering',
              kind: 'open',
              hintname: 'HomeRendering',
              id: 'r_2339622D093B4258833495979E41EFA6',
              class: 'scpm',
              'data-selectable': 'true',
            },
          },
          {
            uid: '2339622d-093b-4258-8334-95979e41efa6',
            componentName: 'Home',
            fields: {
              message: {
                value: 'JavaScript all the things!',
                editable: 'JavaScript all the things!',
              },
            },
            params: {},
            placeholders: {
              'page-header': [
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:placeholder:addControl","header":"Add to here","icon":"/temp/iconcache/office/16x16/add.png","disabledIcon":"/temp/add_disabled16x16.png","isDivider":false,"tooltip":"Add a new rendering to the \'{0}\' placeholder.","type":""},{"click":"chrome:placeholder:editSettings","header":"","icon":"/temp/iconcache/office/16x16/window_gear.png","disabledIcon":"/temp/window_gear_disabled16x16.png","isDivider":false,"tooltip":"Edit the placeholder settings.","type":""}],"contextItemUri":"sitecore://master/{9BCF4A17-2EC7-4160-9504-5ABD096B46AE}?lang=en&ver=1","custom":{"allowedRenderings":[],"editable":"true"},"displayName":"page-header","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'placeholder',
                    kind: 'open',
                    id: 'page_header',
                    key: 'page-header',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:rendering:sort","header":"Change position","icon":"/temp/iconcache/office/16x16/document_size.png","disabledIcon":"/temp/document_size_disabled16x16.png","isDivider":false,"tooltip":"Move component.","type":""},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:componentoptions(referenceId={53C31A2A-75D5-43C6-A0B8-66B7C7859C30},renderingId={A46171E9-0E6E-4F4C-ABFD-0B2A642A2C11},id={362C0651-3686-429C-BB70-6113EDD6ECBD})\',null,false)","header":"Edit Experience Editor Options","icon":"/temp/iconcache/office/16x16/clipboard_check_edit.png","disabledIcon":"/temp/clipboard_check_edit_disabled16x16.png","isDivider":false,"tooltip":"Edit the Experience Editor options for the component.","type":"common"},{"click":"chrome:rendering:properties","header":"Edit component properties","icon":"/temp/iconcache/office/16x16/elements_branch.png","disabledIcon":"/temp/elements_branch_disabled16x16.png","isDivider":false,"tooltip":"Edit the properties for the component.","type":"common"},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:setdatasource(referenceId={53C31A2A-75D5-43C6-A0B8-66B7C7859C30},renderingId={A46171E9-0E6E-4F4C-ABFD-0B2A642A2C11},id={362C0651-3686-429C-BB70-6113EDD6ECBD})\',null,false)","header":"{dsHeader}","icon":"/temp/iconcache/office/16x16/data.png","disabledIcon":"/temp/data_disabled16x16.png","isDivider":false,"tooltip":"{dsTooltip}","type":"datasourcesmenu"},{"click":"chrome:rendering:personalize({command:\\"webedit:personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit:editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Test the component.","type":"sticky"},{"click":"chrome:common:edititem({command:\\"webedit:open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"datasourcesmenu"},{"click":"chrome:rendering:delete","header":"Delete","icon":"/temp/iconcache/office/16x16/delete.png","disabledIcon":"/temp/delete_disabled16x16.png","isDivider":false,"tooltip":"Remove component.","type":"sticky"}],"contextItemUri":"sitecore://master/{362C0651-3686-429C-BB70-6113EDD6ECBD}?lang=en&ver=1","custom":{"renderingID":"A46171E90E6E4F4CABFD0B2A642A2C11","editable":"true"},"displayName":"JumbotronRendering","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'rendering',
                    kind: 'open',
                    hintname: 'JumbotronRendering',
                    id: 'r_53C31A2A75D543C6A0B866B7C7859C30',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  uid: '53c31a2a-75d5-43c6-a0b8-66b7c7859c30',
                  componentName: 'Jumbotron',
                  fields: {
                    titleText: {
                      value: 'Your Favorite Source of Free Bootstrap Themes!',
                      editable:
                        '<input id=\'fld_362C06513686429CBB706113EDD6ECBD_D094753D077B41BA91CAE1BD228AB249_en_1_b8fbac87effe4fe0923ddcc61a0617fc_17\' class=\'scFieldValue\' name=\'fld_362C06513686429CBB706113EDD6ECBD_D094753D077B41BA91CAE1BD228AB249_en_1_b8fbac87effe4fe0923ddcc61a0617fc_17\' type=\'hidden\' value="Your Favorite Source of Free Bootstrap Themes!" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit:open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit:personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit:editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{362C0651-3686-429C-BB70-6113EDD6ECBD}?lang=en&ver=1","custom":{},"displayName":"TitleText","expandedDisplayName":null}</span><span id="fld_362C06513686429CBB706113EDD6ECBD_D094753D077B41BA91CAE1BD228AB249_en_1_b8fbac87effe4fe0923ddcc61a0617fc_17_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">Your Favorite Source of Free Bootstrap Themes!</span>',
                    },
                    body: {
                      value:
                        '<p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>',
                      editable:
                        '<input id=\'fld_362C06513686429CBB706113EDD6ECBD_F5431BB1D50245B0A007FD141266DA0D_en_1_b8fbac87effe4fe0923ddcc61a0617fc_19\' class=\'scFieldValue\' name=\'fld_362C06513686429CBB706113EDD6ECBD_F5431BB1D50245B0A007FD141266DA0D_en_1_b8fbac87effe4fe0923ddcc61a0617fc_19\' type=\'hidden\' value="&lt;p&gt;Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!&lt;/p&gt;" /><span class="scChromeData">{"commands":[{"click":"chrome:field:editcontrol({command:\\"webedit:edithtml\\"})","header":"Edit Text","icon":"/temp/iconcache/office/16x16/pencil.png","disabledIcon":"/temp/pencil_disabled16x16.png","isDivider":false,"tooltip":"Edit the text","type":null},{"click":"chrome:field:execute({command:\\"bold\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_bold.png","disabledIcon":"/temp/font_style_bold_disabled16x16.png","isDivider":false,"tooltip":"Bold","type":null},{"click":"chrome:field:execute({command:\\"Italic\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_italics.png","disabledIcon":"/temp/font_style_italics_disabled16x16.png","isDivider":false,"tooltip":"Italic","type":null},{"click":"chrome:field:execute({command:\\"Underline\\", userInterface:true, value:true})","header":"","icon":"/temp/iconcache/office/16x16/font_style_underline.png","disabledIcon":"/temp/font_style_underline_disabled16x16.png","isDivider":false,"tooltip":"Underline","type":null},{"click":"chrome:field:insertlink","header":"","icon":"/temp/iconcache/office/16x16/link.png","disabledIcon":"/temp/link_disabled16x16.png","isDivider":false,"tooltip":"Insert a link into the text field.","type":null},{"click":"chrome:field:insertimage","header":"Insert image","icon":"/temp/iconcache/office/16x16/photo_landscape.png","disabledIcon":"/temp/photo_landscape_disabled16x16.png","isDivider":false,"tooltip":"Insert an image into the text field.","type":null},{"click":"chrome:common:edititem({command:\\"webedit:open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit:personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit:editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{362C0651-3686-429C-BB70-6113EDD6ECBD}?lang=en&ver=1","custom":{},"displayName":"Body","expandedDisplayName":null}</span><span scFieldType="rich text" scDefaultText="[No text in field]" contenteditable="true" class="scWebEditInput" id="fld_362C06513686429CBB706113EDD6ECBD_F5431BB1D50245B0A007FD141266DA0D_en_1_b8fbac87effe4fe0923ddcc61a0617fc_19_edit"><p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p></span>',
                    },
                  },
                  params: {
                    shade: 'dark',
                    titleSize: '1',
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
                    hintkey: 'JumbotronRendering',
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
                }
              ],
              'page-content': [
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:placeholder:addControl","header":"Add to here","icon":"/temp/iconcache/office/16x16/add.png","disabledIcon":"/temp/add_disabled16x16.png","isDivider":false,"tooltip":"Add a new rendering to the \'{0}\' placeholder.","type":""},{"click":"chrome:placeholder:editSettings","header":"","icon":"/temp/iconcache/office/16x16/window_gear.png","disabledIcon":"/temp/window_gear_disabled16x16.png","isDivider":false,"tooltip":"Edit the placeholder settings.","type":""}],"contextItemUri":"sitecore://master/{9BCF4A17-2EC7-4160-9504-5ABD096B46AE}?lang=en&ver=1","custom":{"allowedRenderings":[],"editable":"true"},"displayName":"page-content","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'placeholder',
                    kind: 'open',
                    id: 'page_content',
                    key: 'page-content',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  name: 'code',
                  type: 'text/sitecore',
                  contents:
                    '{"commands":[{"click":"chrome:rendering:sort","header":"Change position","icon":"/temp/iconcache/office/16x16/document_size.png","disabledIcon":"/temp/document_size_disabled16x16.png","isDivider":false,"tooltip":"Move component.","type":""},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:componentoptions(referenceId={6701AC71-845D-4DE4-BF8E-1F4FEDDF8908},renderingId={6C254609-5347-4768-9FFB-1FF620320CE9},id={199C8794-311F-4B50-9BDC-88AEFB3EE172})\',null,false)","header":"Edit Experience Editor Options","icon":"/temp/iconcache/office/16x16/clipboard_check_edit.png","disabledIcon":"/temp/clipboard_check_edit_disabled16x16.png","isDivider":false,"tooltip":"Edit the Experience Editor options for the component.","type":"common"},{"click":"chrome:rendering:properties","header":"Edit component properties","icon":"/temp/iconcache/office/16x16/elements_branch.png","disabledIcon":"/temp/elements_branch_disabled16x16.png","isDivider":false,"tooltip":"Edit the properties for the component.","type":"common"},{"click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:setdatasource(referenceId={6701AC71-845D-4DE4-BF8E-1F4FEDDF8908},renderingId={6C254609-5347-4768-9FFB-1FF620320CE9},id={199C8794-311F-4B50-9BDC-88AEFB3EE172})\',null,false)","header":"{dsHeader}","icon":"/temp/iconcache/office/16x16/data.png","disabledIcon":"/temp/data_disabled16x16.png","isDivider":false,"tooltip":"{dsTooltip}","type":"datasourcesmenu"},{"click":"chrome:rendering:personalize({command:\\"webedit:personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit:editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Test the component.","type":"sticky"},{"click":"chrome:common:edititem({command:\\"webedit:open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"datasourcesmenu"},{"click":"chrome:rendering:delete","header":"Delete","icon":"/temp/iconcache/office/16x16/delete.png","disabledIcon":"/temp/delete_disabled16x16.png","isDivider":false,"tooltip":"Remove component.","type":"sticky"}],"contextItemUri":"sitecore://master/{199C8794-311F-4B50-9BDC-88AEFB3EE172}?lang=en&ver=1","custom":{"renderingID":"6C254609534747689FFB1FF620320CE9","editable":"true"},"displayName":"DownloadCalloutRendering","expandedDisplayName":null}',
                  attributes: {
                    type: 'text/sitecore',
                    chrometype: 'rendering',
                    kind: 'open',
                    hintname: 'DownloadCalloutRendering',
                    id: 'r_6701AC71845D4DE4BF8E1F4FEDDF8908',
                    class: 'scpm',
                    'data-selectable': 'true',
                  },
                },
                {
                  uid: '6701ac71-845d-4de4-bf8e-1f4feddf8908',
                  componentName: 'DownloadCallout',
                  fields: {
                    linkText: {
                      value: 'Download',
                      editable:
                        '<input id=\'fld_199C8794311F4B509BDC88AEFB3EE172_B752EEA49E994A239012CD5DE3F9191E_en_1_600c022f8135451ebff5d4f98fa36a8e_20\' class=\'scFieldValue\' name=\'fld_199C8794311F4B509BDC88AEFB3EE172_B752EEA49E994A239012CD5DE3F9191E_en_1_600c022f8135451ebff5d4f98fa36a8e_20\' type=\'hidden\' value="Download" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit:open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit:personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit:editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{199C8794-311F-4B50-9BDC-88AEFB3EE172}?lang=en&ver=1","custom":{},"displayName":"LinkText","expandedDisplayName":null}</span><span id="fld_199C8794311F4B509BDC88AEFB3EE172_B752EEA49E994A239012CD5DE3F9191E_en_1_600c022f8135451ebff5d4f98fa36a8e_20_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">Download</span>',
                    },
                  },
                  params: {},
                },
                {
                  name: 'div',
                  type: '',
                  contents:
                    '<div style="height:50px;background: transparent url(\'/sitecore/shell/themes/standard/images/pageeditor/bg_hidden_rendering.png\') repeat;"></div>',
                  attributes: {
                    style: {
                      backgroundColor: 'white',
                      opacity: 0.35,
                      filter: 'alpha(opacity=35)',
                    },
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
                    hintkey: 'DownloadCalloutRendering',
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
                }
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
              hintkey: 'HomeRendering',
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
          }
        ],
      },
      fields: {
        key:
          '<input id=\'fld_9BCF4A172EC7416095045ABD096B46AE_30F5C2ACE7C842418AD031434E4E96CF_en_1_a95ded857429473e8ced62dee49d6747_15\' class=\'scFieldValue\' name=\'fld_9BCF4A172EC7416095045ABD096B46AE_30F5C2ACE7C842418AD031434E4E96CF_en_1_a95ded857429473e8ced62dee49d6747_15\' type=\'hidden\' value="This is a some sample &lt;p&gt;field data&lt;/p&gt; o&#39;boy! &quot;wow&quot;" /><span class="scChromeData">{"commands":[{"click":"chrome:common:edititem({command:\\"webedit:open\\"})","header":"Edit the related item","icon":"/temp/iconcache/office/16x16/cubes.png","disabledIcon":"/temp/cubes_disabled16x16.png","isDivider":false,"tooltip":"Edit the related item in the Content Editor.","type":"common"},{"click":"chrome:rendering:personalize({command:\\"webedit:personalize\\"})","header":"Personalize","icon":"/temp/iconcache/office/16x16/users_family.png","disabledIcon":"/temp/users_family_disabled16x16.png","isDivider":false,"tooltip":"Create or edit personalization for this component.","type":"sticky"},{"click":"chrome:rendering:editvariations({command:\\"webedit:editvariations\\"})","header":"Edit variations","icon":"/temp/iconcache/office/16x16/windows.png","disabledIcon":"/temp/windows_disabled16x16.png","isDivider":false,"tooltip":"Edit the variations.","type":"sticky"}],"contextItemUri":"sitecore://master/{9BCF4A17-2EC7-4160-9504-5ABD096B46AE}?lang=en&ver=1","custom":{},"displayName":"Key","expandedDisplayName":null}</span><span id="fld_9BCF4A172EC7416095045ABD096B46AE_30F5C2ACE7C842418AD031434E4E96CF_en_1_a95ded857429473e8ced62dee49d6747_15_edit" sc_parameters="prevent-line-break=true" contenteditable="true" class="scWebEditInput" scFieldType="single-line text" scDefaultText="[No text in field]">This is a some sample &lt;p&gt;field data&lt;/p&gt; o&#39;boy! &quot;wow&quot;</span>',
      },
    },
  },
};
