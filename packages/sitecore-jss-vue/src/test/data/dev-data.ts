export const devData = {
  sitecore: {
    context: { pageEditing: false },
    route: {
      name: 'home',
      displayName: 'Home',
      placeholders: {
        main: [
          {
            componentName: 'Home',
            fields: { message: { value: 'JavaScript all the things!' } },
            uid: '2339622d-093b-4258-8334-95979e41efa6',
            params: {},
            placeholders: {
              'page-header': [
                {
                  componentName: 'Jumbotron',
                  params: { shade: 'dark', titleSize: '1' },
                  fields: {
                    titleText: { value: 'Your Favorite Source of Free Bootstrap Themes!' },
                    body: {
                      value:
                        '<p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>',
                    },
                  },
                  uid: '53c31a2a-75d5-43c6-a0b8-66b7c7859c30',
                }
              ],
              'page-content': [
                {
                  componentName: 'DownloadCallout',
                  fields: { linkText: { value: 'Download' } },
                  uid: '6701ac71-845d-4de4-bf8e-1f4feddf8908',
                  params: {},
                },
                {
                  componentName: 'SfcDownloadCallout',
                  fields: { linkText: { value: 'Download' } },
                  uid: '6701ac71-845d-4de4-bf8e-1f4feddf8908',
                  params: {},
                }
              ],
            },
          },
          {
            componentName: 'SfcHome',
            fields: { message: { value: 'JavaScript all the things!' } },
            uid: '2339622d-093b-4258-8334-95979e41efa6',
            params: {},
            placeholders: {
              'page-header': [
                {
                  componentName: 'Jumbotron',
                  params: { shade: 'dark', titleSize: '1' },
                  fields: {
                    titleText: { value: 'Your Favorite Source of Free Bootstrap Themes!' },
                    body: {
                      value:
                        '<p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>',
                    },
                  },
                  uid: '53c31a2a-75d5-43c6-a0b8-66b7c7859c30',
                }
              ],
              'page-content': [
                {
                  componentName: 'DownloadCallout',
                  fields: { linkText: { value: 'Download' } },
                  uid: '6701ac71-845d-4de4-bf8e-1f4feddf8908',
                  params: {},
                },
                {
                  componentName: 'SfcDownloadCallout',
                  fields: { linkText: { value: 'Download' } },
                  uid: '6701ac71-845d-4de4-bf8e-1f4feddf8908',
                  params: {},
                }
              ],
            },
          }
        ],
      },
      fields: {
        key: 'This is a some sample &lt;p&gt;field data&lt;/p&gt; o&#39;boy! &quot;wow&quot;',
      },
    },
  },
};
