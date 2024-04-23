import { EditMode } from '@sitecore-jss/sitecore-jss/layout';

export const convertedDevData = {
  sitecore: {
    context: {
      pageEditing: false,
    },
    route: {
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
            renderingParams: [] as { [key: string]: unknown }[],
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
                  params: [] as { [key: string]: unknown }[],
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

export const convertedDevDataWithoutParams = {
  sitecore: {
    context: {
      pageEditing: false,
    },
    route: {
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
            renderingParams: [] as { [key: string]: unknown }[],
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
            renderingParams: [] as { [key: string]: unknown }[],
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
                  params: [] as { [key: string]: unknown }[],
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

export const sxaRenderingVariantData = {
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

export const sxaRenderingVariantDataWithCommonContainerName = {
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

export const sxaRenderingVariantDoubleDigitDynamicPlaceholder = {
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

export const sxaRenderingVariantDataWithoutCommonContainerName = {
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
        'no-container': [
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

export const sxaRenderingColumnSplitterVariant = {
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
        'column-1-{*}': [
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

export const byocWrapperData = {
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
            uid: '278b99a7-8d73-4362-ac05-53e7c35154d5',
            componentName: 'BYOCWrapper',
            dataSource: '',
            params: {
              ComponentName: 'Foo',
              ComponentProps: '{ "columns": 7 }',
              GridParameters: 'col-12',
              DynamicPlaceholderId: '1',
              FieldNames: 'Default',
            },
          },
          {
            uid: '278b99a7-8d73-4362-ac05-53e7c35154d5',
            componentName: 'BYOCComponent',
            dataSource: '',
            params: {
              ComponentName: 'Bar',
              ComponentProps: '{ "columns": 5 }',
              GridParameters: 'col-12',
              DynamicPlaceholderId: '1',
              FieldNames: 'Default',
            },
          },
        ],
      },
    },
  },
};

export const feaasWrapperData = {
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
            uid: 'd07d1832-f2a1-4f56-a949-5d1ab263a1d5',
            componentName: 'FEaaSWrapper',
            dataSource: '',
            params: {
              ComponentName: 'Two product teaser',
              LibraryId: '4lcTPh6h5L4soeuM0WkXtf',
              ComponentId: 'bkpRNHFB2v',
              ComponentVersion: 'responsive',
              ComponentRevision: 'staged',
              ComponentHostName: 'https://feaas.windows.net',
              ComponentInstanceId: 'bSE5grxVRMCVB0K',
              GridParameters: 'col-12',
              CacheClearingBehavior: 'Clear on publish',
              DynamicPlaceholderId: '2',
              FieldNames: 'Default',
            },
          },
          {
            uid: 'd07d1832-f2a1-4f56-a949-5d1ab263a1d5',
            componentName: 'FEaaSComponent',
            dataSource: '',
            params: {
              ComponentName: 'One product teaser',
              LibraryId: '4lcTPh6h5L4soeuM0WkXtf',
              ComponentId: 'bkpRNHFB2v',
              ComponentVersion: 'responsive',
              ComponentRevision: 'staged',
              ComponentHostName: 'https://feaas.windows.net',
              ComponentInstanceId: 'bSE5grxVRMCVB0K',
              GridParameters: 'col-9',
              CacheClearingBehavior: 'Clear on publish',
              DynamicPlaceholderId: '2',
              FieldNames: 'Default',
            },
          },
        ],
      },
    },
  },
};

export const layoutDataWithMetadata = {
  sitecore: {
    context: {
      pageEditing: false,
      editMode: EditMode.Metadata,
    },
    route: {
      name: 'home',
      displayName: 'Home',
      placeholders: {
        'sxa-header': [
          {
            componentName: 'RichText',
            dataSource:
              '/sitecore/content/site1/site1/Presentation/Partial Designs/Header/Data/Title',
            fields: {
              Text: {
                value: '<h1>Skate Park</h1>',
              },
            },
            params: {
              FieldNames: 'Default',
              GridParameters: 'col-12 col-lg-6',
              Styles: 'bs-title',
            },
            uid: '386455f2-83a5-4aff-b7a0-38d6a6abb46f',
          },
          {
            componentName: 'Navigation',
            dataSource: '',
            params: {
              AddRoot: '1',
              FieldNames: 'Default',
              GridParameters: 'col-12',
              LevelFrom: '{1BB88840-5FB3-4353-AD8D-81136F6FF75A}',
              LevelTo: '{1BB88840-5FB3-4353-AD8D-81136F6FF75A}',
              NavigationRoot: '{9ED8A0DF-0463-42FD-89CB-2B3A559E11AC}',
              Styles: 'position-right navigation-horizontal',
            },
            uid: '434f3f2c-e58f-4d86-ae10-7707601c5a72',
          },
        ],
      },
    },
  },
};
