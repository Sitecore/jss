import { Request, Response, NextFunction } from 'express';

/*
  Implements middleware that returns the app index.html for route requests
*/

export interface DefaultDocumentMiddlewareOptions {
  indexFilePath: string;
}

/**
 * @param {DefaultDocumentMiddlewareOptions} config
 */
export function createDefaultDocumentMiddleware({
  indexFilePath,
}: DefaultDocumentMiddlewareOptions) {
  return function defaultDocumentMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/favicon.ico' || req.path.endsWith('.map')) {
      next();
      return;
    }

    console.log(`> [ROUTE] '${req.path}' - sent index.html (no static file match)`);
    res.sendFile(indexFilePath);
  };
}
