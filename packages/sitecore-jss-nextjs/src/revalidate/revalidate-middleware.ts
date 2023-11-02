import { NextApiResponse, NextApiRequest } from 'next';

/**
 * Middleware / handler for use in healthcheck Next.js API route (e.g. '/api/healthz').
 */
export class RevalidateMiddleware {
  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return this.handler;
  }

  private handler = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      // await Promise.all(pathsToRevalidate.map((path) => res.revalidate(path)))
      res.revalidate('/_site_my-basic-site/');
      // console.log(`[api/revalidate] revalidated: ${paths.join(', ')}`);
      return res.status(200).json({ revalidated: true });
    } catch (error) {
      console.error(`[api/revalidate] error: ${error}`);
      return res.status(500).json({ message: 'Error revalidating' });
    }
  };
}
