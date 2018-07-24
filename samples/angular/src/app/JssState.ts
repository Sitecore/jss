import {
  RouteData,
  LayoutServiceContextData,
  LayoutServiceError,
} from '@sitecore-jss/sitecore-jss-angular';

export class JssState {
  language: string;
  serverRoute: string;
  routeFetchError?: LayoutServiceError;
  sitecore?: LayoutServiceContextData & {
    route: RouteData;
  };
  viewBag: any;
}
