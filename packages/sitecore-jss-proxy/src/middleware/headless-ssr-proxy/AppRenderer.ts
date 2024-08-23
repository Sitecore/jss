import { RenderResponse } from './RenderResponse';
import { LayoutServiceData } from '@sitecore-jss/sitecore-jss/layout';

export type AppRenderer = (
  callback: (error: Error | null, result: RenderResponse | null) => void,
  path: string,
  /**
   * Data returned by Layout Service. If the route does not exist, null.
   */
  data: { [key: string]: unknown } | LayoutServiceData,
  viewBag: { [key: string]: unknown }
) => void;
