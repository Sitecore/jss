import { BaseJssState } from '@sitecore-jss/sitecore-jss-angular';
import { LayoutServiceError } from './layout/jss-layout.service';

export class JssState extends BaseJssState {
  language: string;
  serverRoute: string;
  routeFetchError?: LayoutServiceError;
}
