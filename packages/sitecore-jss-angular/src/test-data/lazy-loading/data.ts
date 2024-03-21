import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';

export const testDataSuccess: { label: string; data: ComponentRendering }[] = [
  {
    label: 'jumbotron',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'Jumbotron',
            fields: {},
            params: {},
            uid: 'jumbotron-default',
          },
        ],
      },
    },
  },
  {
    label: 'jumbotron with resolve',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'JumbotronResolve',
            fields: {},
            params: {},
            uid: 'jumbotron-resolve',
          },
        ],
      },
    },
  },
  {
    label: 'jumbotron with canActivate',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'JumbotronCanActivate',
            fields: {},
            params: {},
            uid: 'jumbotron-can-activate',
          },
        ],
      },
    },
  },
];

export const testDataNavigation: { label: string; data: ComponentRendering }[] = [
  {
    label: 'jumbotron with canActivate with returning UrlTree',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'JumbotronCanActivateUrlTree',
            fields: {},
            params: {},
            uid: 'jumbotron-can-activate-url-tree',
          },
        ],
      },
    },
  },
  {
    label: 'jumbotron with canActivate with returning url string',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'JumbotronCanActivateUrlString',
            fields: {},
            params: {},
            uid: 'jumbotron-can-activate-url-string',
          },
        ],
      },
    },
  },
];

export const testDataError: { label: string; data: ComponentRendering }[] = [
  {
    label: 'jumbotron with canActivate with return unexpected error',
    data: {
      componentName: 'dummy',
      uid: 'dummy',
      placeholders: {
        main: [
          {
            componentName: 'JumbotronCanActivateUnknown',
            fields: {},
            params: {},
            uid: 'jumbotron-can-activate-unexpected',
          },
        ],
      },
    },
  },
];
