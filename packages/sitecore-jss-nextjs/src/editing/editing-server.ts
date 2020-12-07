import compression from 'compression';
import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import EditingMiddleware from './editing-middleware';
import chalk from 'chalk';

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
   * The Next.js route which is used to render a page in the Experience Editor. 
   * Defaults to `'/_edit'` if no value is provided.
   * @default '/_edit'
   */
  editRoute?: string;
  /**
   * Defines the path for which the Experience Editor middleware is invoked (on POST request).
   * Defaults to `'*'` if no value is provided.
   * More information can be found in the Express docs: https://expressjs.com/en/4x/api.html#path-examples
   * @default '*'
   */
  editMiddlewarePath?: string;
  /**
   * Enable compression on the Experience Editor POST request.
   * Defaults to `true`.
   */
  enableCompression?: boolean;
}

/**
 * Starts the editing server
 * @param {EditingServerOptions} options Editing server options
 */
export function startEditingServer({
  port = 3000,
  hostname = 'localhost',
  editRoute = '/_edit',
  editMiddlewarePath = '*',
  enableCompression = true,
}: EditingServerOptions = {}): void {
  const dev = process.env.NODE_ENV !== 'production';
  const serverUrl = `http://${hostname}:${port}`;

  const app = next({ dev });

  try {
    app.prepare().then(() => {
      let publicUrl = process.env.PUBLIC_URL;

      if (!publicUrl || publicUrl.length === 0) {
        console.warn(chalk.yellow.bold('Warning: ') + `A PUBLIC_URL environment variable is not defined. Falling back to ${serverUrl}.`)
        publicUrl = serverUrl;
      }

      const server = express();
      const handle = app.getRequestHandler();
      const handleEdit = new EditingMiddleware(app, editRoute, publicUrl).getRequestHandler();

      // Disable X-Powered-By header
      server.disable('x-powered-by');

      // Wire up the middleware for Experience Editor (assume only POST requests should be handled)
      // Note Next.js already includes compression with its handler, so we're only concerned with ours
      const editHandlers = [ compression(), bodyParser.json({ limit: '2mb' }), handleEdit ];
      if (!enableCompression) {
        editHandlers.shift();
      }
      server.post(editMiddlewarePath, editHandlers);

      // Send everything else to Next.js
      server.all('*', (req, res) => {
        return handle(req, res);
      });

      server.listen(port, hostname, (err?: any) => {
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
