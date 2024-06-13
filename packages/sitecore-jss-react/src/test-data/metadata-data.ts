import { EditMode } from '@sitecore-jss/sitecore-jss/layout';

export const layoutData = {
  sitecore: {
    context: {
      pageEditing: true,
      editMode: EditMode.Metadata,
    },
    route: {
      name: 'main',
      uid: 'root123',
      placeholders: {
        main: [
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
};

export const layoutDataWithEmptyPlaceholder = {
  sitecore: {
    context: {
      pageEditing: true,
      editMode: EditMode.Metadata,
    },
    route: {
      name: 'main',
      uid: 'root123',
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
    },
    route: {
      name: 'main',
      uid: 'root123',
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
    },
    route: {
      name: 'main',
      uid: 'root123',
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
