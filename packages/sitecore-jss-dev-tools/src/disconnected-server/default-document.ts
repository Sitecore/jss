/*
  Implements middleware that returns the app index.html for route requests
*/

export interface DefaultDocumentMiddlewareOptions {
  indexFilePath: string;
}

export function createDefaultDocumentMiddleware({ indexFilePath }: DefaultDocumentMiddlewareOptions) {
  return function defaultDocumentMiddleware(req: any, res: any, next: any) {
    if (req.path === '/favicon.ico' || req.path.endsWith('.map')) {
      next();
      return;
    }

    console.log(`> [ROUTE] '${req.path}' - sent index.html (no static file match)`);
    res.sendFile(indexFilePath);
  };
}
