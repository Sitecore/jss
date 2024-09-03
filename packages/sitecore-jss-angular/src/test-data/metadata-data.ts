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
          value: '123',
        },
      },
      placeholders: {
        main: [
          {
            uid: 'nested123',
            componentName: 'Home',
            fields: {
              text: {
                value: '123',
              },
            },
          },
        ],
      },
    },
  },
};

export const layoutDataWithEmptyPlaceholder = {
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
            uid: '123',
            componentName: 'Unknown',
          },
        ],
      },
    },
  },
};

export const layoutDataForNestedDynamicPlaceholder = (rootPhKey: string) => ({
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
            componentName: 'Header',
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
