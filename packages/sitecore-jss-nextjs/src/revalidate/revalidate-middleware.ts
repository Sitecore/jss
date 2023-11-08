import { NextApiResponse, NextApiRequest } from 'next';

type Entity = {
  identifier: string;
  entity_definition: string;
  operation: string;
};

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

  private isEmpty(paths: string[]) {
    return paths.length === 0;
  }

  private getPathsToRevalidate(req: NextApiRequest): string[] {
    return req.body.updates
      .map((x: Entity) => x.entity_definition === 'LayoutData' && x.identifier)
      .filter(Boolean);
  }

  private handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const paths = this.getPathsToRevalidate(req);

    if (this.isEmpty(paths)) {
      return res.status(204).send({}); // nothing to revalidate
    }

    try {
      if (req.body.multisite) {
        await Promise.all(paths.map((path: string) => res.revalidate(`/_site_${path}`)));
      } else {
        await Promise.all(paths.map((path: string) => res.revalidate(`/${path}`)));
      }
      console.log(`[api/revalidate] revalidated: ${paths.join(', ')}`);
      return res.status(200).json({ revalidated: true });
    } catch (error) {
      console.error(`[api/revalidate] error: ${error}`);
      return res.status(500).json({ message: 'Error revalidating' });
    }
  };
}
