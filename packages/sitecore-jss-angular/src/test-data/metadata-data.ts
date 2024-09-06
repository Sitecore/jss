import { EditMode } from '@sitecore-jss/sitecore-jss/layout';

export const layoutData = {
  serverRoute: '/',
  language: 'en',
  sitecore: {
    context: {
      pageEditing: true,
      editMode: EditMode.Metadata,
      serverRoute: '/',
      language: 'en',
    },
    route: {
      name: 'main',
      componentName: '',
      fields: {
        text: {
          metadata: {
            fieldId: '123',
            fieldType: 'text',
            rawValue: 'textField',
          },
        },
      },
      placeholders: {
        main: [
          {
            uid: 'nested123',
            componentName: 'Home',
            // fields: {
            //   text: {
            //     metadata: {
            //       fieldId: '123',
            //       fieldType: 'text',
            //       rawValue: 'textField',
            //     },
            //   },
            // },
            placeholders: {
              logo: [
                {
                  uid: 'deep123',
                  componentName: 'Logo',
                },
              ],
            },
          },
        ],
      },
    },
  },
};

export const layoutDataWithEmptyPlaceholder = {
  serverRoute: '/',
  language: 'en',
  sitecore: {
    context: {
      pageEditing: true,
      editMode: EditMode.Metadata,
      serverRoute: '/',
      language: 'en',
    },
    route: {
      name: 'main',
      placeholders: {
        main: [],
      },
    },
  },
};

export const layoutDataWithUnknownComponent = {
  serverRoute: '/',
  language: 'en',
  sitecore: {
    context: {
      pageEditing: true,
      editMode: EditMode.Metadata,
      serverRoute: '/',
      language: 'en',
    },
    route: {
      name: 'main',
      placeholders: {
        main: [
          {
            uid: 'nested123',
            componentName: 'Unknown',
          },
        ],
      },
    },
  },
};

export const layoutDataForNestedDynamicPlaceholder = (rootPhKey: string) => ({
  serverRoute: '/',
  language: 'en',
  sitecore: {
    context: {
      pageEditing: true,
      editMode: EditMode.Metadata,
      serverRoute: '/',
      language: 'en',
    },
    route: {
      name: 'main',
      placeholders: {
        [rootPhKey]: [
          {
            uid: 'nested123',
            componentName: 'Home',
            // fields: {
            //   text: {
            //     metadata: {
            //       fieldId: '123',
            //       fieldType: 'text',
            //       rawValue: 'textField',
            //     },
            //   },
            // },
            placeholders: {
              logo: [
                {
                  uid: 'deep123',
                  componentName: 'Logo',
                },
              ],
            },
          },
        ],
      },
    },
  },
});
