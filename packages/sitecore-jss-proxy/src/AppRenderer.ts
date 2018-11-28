import { RenderResponse } from './RenderResponse';

export type AppRenderer = (
  callback: (error: Error | null, result: RenderResponse | null) => void,
  path: string,
  /**
   * Data returned by Layout Service. If the route does not exist, null.
   */
  data: any,
  viewBag: any
) => void;
