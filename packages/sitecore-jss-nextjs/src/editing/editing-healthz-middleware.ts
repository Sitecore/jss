import { NextApiResponse, NextApiRequest } from 'next';

/**
 * Middleware / handler for use in the healthz Next.js API route (e.g. '/api/healthz')
 * which is used by XMCloud container editing host.
 */
export class EditingHealthzMiddleware {
  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return this.handler;
  }

  private handler = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    res.status(200).send('OK');
  };
}
