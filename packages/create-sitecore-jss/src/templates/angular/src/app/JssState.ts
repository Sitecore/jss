import {
  RouteData,
  LayoutServiceContextData,
} from '@sitecore-jss/sitecore-jss-angular';
import { LayoutServiceError } from './layout/jss-layout.service';

export class JssState {
  language: string;
  serverRoute: string;
  routeFetchError?: LayoutServiceError;
  sitecore?: LayoutServiceContextData & {
    route: RouteData;
  };
  viewBag: { [key: string]: unknown };
}
