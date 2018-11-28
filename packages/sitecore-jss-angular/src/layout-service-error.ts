import { LayoutServiceContextData } from '@sitecore-jss/sitecore-jss';

export class LayoutServiceError {
  status: number;
  statusText: string;
  data?: { sitecore?: LayoutServiceContextData };
}
