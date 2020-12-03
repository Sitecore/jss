import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import EditingMiddleware from './editing-middleware';

export interface EditingServerOptions {
  /**
   * The port number the server should listen on. Defaults to `3000` if no value is provided.
   * @default 3000
   */
  port?: number;
  /**
   * The hostname the server should bind to. Defaults to `localhost` if no value is provided.
   * @default localhost
   */
  hostname?: string;
  /**
   * An alternative URL to use for absolute URLs, which are required when the Next.js app
   * is run within the Sitecore Experience Editor.
   * Defaults to the provided hostname and port if no value is provided.
   * @default `http://${hostname}:${port}`
   */
  publicUrl?: string;
  /**
   * Defines the path for which the Experience Editor middleware is invoked (on POST request).
   * Defaults to `'*'` if no value is provided.
   * More information can be found in the Express docs: https://expressjs.com/en/4x/api.html#path-examples
   * @default '*'
   */
  editMiddlewarePath?: string;
}

export function startEditingServer({
  port = 3000,
  hostname = 'localhost',
  publicUrl,
  editMiddlewarePath = '*',
}: EditingServerOptions = {}): void {
  const dev = process.env.NODE_ENV !== 'production';
  const serverUrl = `http://${hostname}:${port}`;

  const app = next({ dev });
  const handle = app.getRequestHandler();
  const handleEdit = new EditingMiddleware(app, publicUrl ?? serverUrl).getRequestHandler();

  try {
    app.prepare().then(() => {
      const server = express();

      // Wire up the middleware for Experience Editor (assume only POST requests should be handled)
      server.post(editMiddlewarePath, bodyParser.json({ limit: '2mb' }), handleEdit);

      // Send everything else to Next.js
      server.all('*', (req, res) => {
        return handle(req, res);
      });

      server.listen(port, (err?: any) => {
        if (err) {
          throw err;
        }
        console.log(`> Editing server listening at ${serverUrl}`);
      });
    });
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
