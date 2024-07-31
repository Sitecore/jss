// these rules enforce "correct" JSON format instead of normal object format

export const convertedDevData = {
  sitecore: {
    context: {
      pageEditing: false,
    },
    route: {
      componentName: '',
      name: 'home',
      displayName: 'Home',
      placeholders: {
        main: [
          {
            componentName: 'Home',
            fields: {
              message: {
                value: 'JavaScript all the things!',
              },
            },
            uid: '2339622d-093b-4258-8334-95979e41efa6',
            renderingParams: [],
            placeholders: {
              'page-header': [
                {
                  componentName: 'Jumbotron',
                  params: {
                    shade: 'dark',
                    titleSize: '1',
                  },
                  fields: {
                    titleText: {
                      value: 'Your Favorite Source of Free Bootstrap Themes!',
                    },
                    body: {
                      value:
                        '<p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>',
                    },
                  },
                  uid: '53c31a2a-75d5-43c6-a0b8-66b7c7859c30',
                },
              ],
              'page-content': [
                {
                  componentName: 'DownloadCallout',
                  fields: {
                    linkText: {
                      value: 'Download',
                    },
                  },
                  uid: '6701ac71-845d-4de4-bf8e-1f4feddf8908',
                  params: [],
                },
                {
                  componentName: 'LazyComponent',
                  fields: {
                    linkText: {
                      value: 'Push',
                    },
                  },
                  uid: '6701ac71-845d-4de4-bf8e-1f4feddf8908',
                  params: [],
                },
              ],
            },
          },
        ],
      },
      fields: {
        key: 'This is a some sample &lt;p&gt;field data&lt;/p&gt; o&#39;boy! &quot;wow&quot;',
      },
    },
  },
};

export const convertedLayoutServiceData = {
  sitecore: {
    context: {
      pageEditing: false,
    },
    route: {
      componentName: '',
      name: 'home',
      displayName: 'Home',
      placeholders: {
        main: [
          {
            componentName: 'Home',
            fields: {
              message: {
                value: 'JavaScript all the things!',
                editable: 'JavaScript all the things!',
              },
            },
            uid: '2339622d-093b-4258-8334-95979e41efa6',
            renderingParams: [],
            placeholders: {
              'page-header': [
                {
                  componentName: 'Jumbotron',
                  fields: {
                    titleText: {
                      value: 'Your Favorite Source of Free Bootstrap Themes!',
                      editable: 'Your Favorite Source of Free Bootstrap Themes!',
                    },
                    body: {
                      value:
                        '<p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>',
                      editable:
                        '<p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>',
                    },
                  },
                  params: {
                    shade: {
                      value: 'dark',
                      editable: 'dark',
                    },
                    titleSize: {
                      value: '1',
                      editable: '1',
                    },
                  },
                  uid: '53c31a2a-75d5-43c6-a0b8-66b7c7859c30',
                },
              ],
              'page-content': [
                {
                  componentName: 'DownloadCallout',
                  fields: {
                    linkText: {
                      value: 'Download',
                      editable: 'Download',
                    },
                  },
                  uid: '6701ac71-845d-4de4-bf8e-1f4feddf8908',
                  params: [],
                },
                {
                  componentName: 'LazyComponent',
                  fields: {
                    linkText: {
                      value: 'Push',
                      editable: 'Push',
                    },
                  },
                  uid: '6701ac71-845d-4de4-bf8e-1f4feddf8908',
                  params: [],
                },
              ],
            },
          },
        ],
      },
      fields: {
        key: 'This is a some sample &lt;p&gt;field data&lt;/p&gt; o&#39;boy! &quot;wow&quot;',
      },
    },
  },
};

export const sxaRenderingData = {
  sitecore: {
    context: {
      pageEditing: false,
    },
    route: {
      name: 'Home',
      displayName: 'Home',
      fields: {
        key: {
          value: 'This is a some sample &lt;p&gt;field data&lt;/p&gt; o&#39;boy! &quot;wow&quot;',
        },
      },
      placeholders: {
        main: [
          {
            uid: 'c4d5d43b-5aa8-4e03-8f16-9428f3e02d5c',
            componentName: 'RichText',
            dataSource: '/sitecore/content/SxaSample/SxaSampleSite/Home/Data/RichText',
            params: {
              GridParameters: 'col-9|col-sm-10|col-md-12|col-lg-6|col-xl-7|col-xxl-8',
              FieldNames: 'WithTitle',
              Styles: 'test-css-class-x',
            },
            fields: {
              Text: {
                value: 'Test RichText',
              },
              Title: {
                value: 'Rich Text Rendering Variant',
              },
            },
          },
        ],
        'main-second': [
          {
            uid: 'c4d5d43b-5aa8-4e03-8f16-9428f3e02d5c',
            componentName: 'RichText',
            dataSource: '/sitecore/content/SxaSample/SxaSampleSite/Home/Data/RichText',
            params: {
              GridParameters: 'col-9|col-sm-10|col-md-12|col-lg-6|col-xl-7|col-xxl-8',
              FieldNames: 'Default',
              Styles: 'test-css-class-y',
            },
            fields: {
              Text: {
                value: 'Test RichText',
              },
              Title: {
                value: 'Rich Text Rendering Variant',
              },
            },
          },
        ],
      },
    },
  },
};

export const sxaRenderingDynamicPlaceholderData = {
  sitecore: {
    context: {
      pageEditing: false,
    },
    route: {
      name: 'Home',
      displayName: 'Home',
      fields: {
        key: {
          value: 'This is a some sample &lt;p&gt;field data&lt;/p&gt; o&#39;boy! &quot;wow&quot;',
        },
      },
      placeholders: {
        'container-{*}': [
          {
            uid: 'c4d5d43b-5aa8-4e03-8f16-9428f3e02d5c',
            componentName: 'RichText',
            dataSource: '/sitecore/content/SxaSample/SxaSampleSite/Home/Data/RichText',
            params: {
              GridParameters: 'col-9|col-sm-10|col-md-12|col-lg-6|col-xl-7|col-xxl-8',
              FieldNames: 'WithTitle',
              Styles: 'test-css-class-x',
            },
            fields: {
              Text: {
                value: 'Test RichText',
              },
              Title: {
                value: 'Rich Text Rendering Variant',
              },
            },
          },
        ],
      },
    },
  },
};

export const sxaRenderingDoubleDigitDynamicPlaceholderData = {
  sitecore: {
    context: {
      pageEditing: false,
    },
    route: {
      name: 'Home',
      displayName: 'Home',
      fields: {
        key: {
          value: 'This is a some sample &lt;p&gt;field data&lt;/p&gt; o&#39;boy! &quot;wow&quot;',
        },
      },
      placeholders: {
        'dynamic-1-{*}': [
          {
            uid: 'c4d5d43b-5aa8-4e03-8f16-9428f3e02d5c',
            componentName: 'RichText',
            dataSource: '/sitecore/content/SxaSample/SxaSampleSite/Home/Data/RichText',
            params: {
              GridParameters: 'col-9|col-sm-10|col-md-12|col-lg-6|col-xl-7|col-xxl-8',
              FieldNames: 'WithTitle',
              Styles: 'test-css-class-x',
            },
            fields: {
              Text: {
                value: 'Test RichText',
              },
              Title: {
                value: 'Rich Text Rendering Variant',
              },
            },
          },
        ],
      },
    },
  },
};

