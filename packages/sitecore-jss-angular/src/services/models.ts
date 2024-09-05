import { LayoutServiceContextData, RouteData } from '../public_api';

export class JssState {
  language: string;
  serverRoute: string;
  routeFetchError?: LayoutServiceError;
  sitecore?: LayoutServiceContextData & {
    route: RouteData | null;
  };
  viewBag?: { [key: string]: unknown };
}

export class LayoutServiceError {
  status: number;
  statusText: string;
  data?: { sitecore?: LayoutServiceContextData };
}
