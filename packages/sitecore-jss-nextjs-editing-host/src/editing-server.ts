import compression from 'compression';
import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import { getPublicUrl } from './util';
import { EditingMiddleware } from './editing-middleware';
import { AbsolutifyHtmlProcessor } from './html-processors';

export interface EditingServerOptions {
  /**
   * The port number the server should listen on.
   * @default 3000
   */
  port?: number;
  /**
   * The hostname the server should bind to.
   * @default 'localhost'
   */
  hostname?: string;
  /**
   * The Next.js route which is used to render a page in the Experience Editor.
   * Note this route must use getInitialProps (not getStatic/ServerSideProps)
   * in order for the Experience Editor data to be passed along on the request.
   * @default '/_edit'
   */
  editRoute?: string;
  /**
   * Defines the path for which the Experience Editor middleware is invoked (on POST request).
   * More information can be found in the Express docs: https://expressjs.com/en/4x/api.html#path-examples
   * @default '*'
   */
  editPath?: string;
  /**
   * Enable compression on the Experience Editor POST request.
   * @default true
   */
  enableCompression?: boolean;
  /**
   * URL path prefixes that should be ignored during relative to absolute link replacement.
   * @default ['-/media/', '~/media/', '-/jssmedia/', '~/jssmedia/', 'sitecore/shell/']
   */  
  ignoredReplacementPaths?: string[];
}

/**
 * Starts the editing server
 * @param {EditingServerOptions} [options] Editing server options
 */
export function startEditingServer({
  port = 3000,
  hostname = 'localhost',
  editRoute = '/_edit',
  editPath = '*',
  enableCompression = true,
  ignoredReplacementPaths =  ['-/media/', '~/media/', '-/jssmedia/', '~/jssmedia/', 'sitecore/shell/'],
}: EditingServerOptions = {}): void {
  const dev = process.env.NODE_ENV !== 'production';
  const serverUrl = `http://${hostname}:${port}`;

  const app = next({ dev });

  try {
    app.prepare().then(() => {
      const server = express();
      const handle = app.getRequestHandler();
      const handleEdit = new EditingMiddleware(app, editRoute, [ 
        new AbsolutifyHtmlProcessor(getPublicUrl(), ignoredReplacementPaths) 
      ]).getRequestHandler();

      // Disable X-Powered-By header
      server.disable('x-powered-by');

      // Wire up the middleware for Experience Editor (assume only POST requests should be handled)
      // Note Next.js already includes compression with its handler, so we're only concerned with ours
      const editHandlers: any[] = [ bodyParser.json({ limit: '2mb' }), handleEdit ];
      if (enableCompression) {
        editHandlers.unshift(compression());
      }
      server.post(editPath, editHandlers);

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
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
