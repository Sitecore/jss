import { parse } from 'url';
import { Request, Response } from 'express';
import Server from 'next/dist/next-server/server/next-server';
import absolutify from './absolutify';
import { EditingData } from './editing-data';

// Extend Express Request with our custom EditingData
// NOTE: The property name ("editingData") needs to match EditingRequest, which is used in the consuming app.
declare global {
  namespace Express {
      export interface Request {
        editingData: EditingData;
      }
  }
}

/**
 * Express middleware for handling requests from the Sitecore Experience Editor.
 * @constructor
 * @param {object} nextApp The Next.js app.
 * @param {string} publicUrl The public URL. This will be used when replacing relative links with absolute ones.
 */
export default class EditingMiddleware {
  constructor(readonly nextApp: Server, readonly editRoute: string, readonly publicUrl: string) {}

  getRequestHandler(): (req: Request, res: Response) => Promise<void> {
    return this.handleRequest.bind(this);
  }

  async handleRequest(req: Request, res: Response): Promise<void> {
    // Extract Experience Editor data from the request
    const data = extractData(req);

    // path contains the URL requested via Sitecore
    const parsedUrl = parse(data.path, true);

    try {
      // Use Next.js to render the html via renderToHTML()
      // First, some prep...

      // Switch to a GET request
      req.method = 'GET';

      // Set the url to our edit route
      // NOTE: renderToHTML() ONLY works with routes/pages using getInitialProps (not getStatic/ServerSideProps)
      req.url = this.editRoute;

      // Attach data to request for use in our edit route
      req.editingData = data;

      // Set our public URL as the asset prefix, which is used by Next.js for the JavaScript and CSS files it loads
      // See https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
      this.nextApp.setAssetPrefix(this.publicUrl);

      // Now render the page
      let html = await this.nextApp.renderToHTML(req, res, this.editRoute, parsedUrl.query);

      if (!html) {
        throw new Error(`Failed to render html for ${parsedUrl}`);
      }

      // Run any post-render processing of the html.
      // At the moment, this includes replacing any remaining relative links with absolute ones.
      html = processHtml(html, this.publicUrl);

      res.send({
        html,
        status: res.statusCode,
        redirect: '',
      });
    } catch (err) {
      console.error(err);

      res.send({
        html: `<html><body>${err}</body></html>`,
        status: 500,
        redirect: '',
      });
    }
  }
}

function processHtml(html: string, appUrl: string) {
  // URL path prefixes that should be ignored during link replacement
  // (both with a leading slash "/" and without will be checked)
  const ignoredPaths = ['-/media/', '~/media/', '-/jssmedia/', '~/jssmedia/', 'sitecore/shell/'];

  // Replace relative links with absolute
  return absolutify(html, (relativeUrl) => {
    const ignored = ignoredPaths.some(
      (value) => relativeUrl.startsWith(value) || relativeUrl.startsWith('/' + value)
    );
    if (ignored) {
      return relativeUrl;
    }
    return appUrl + relativeUrl;
  });
}

function extractData(req: Request): EditingData {
  // req.body should have already been parsed as JSON at this point (via `body-parser` middleware)
  const payload = req.body;

  // The Experience Editor will send the following body data structure,
  // though we're only concerned with the "args".
  // {
  //   id: 'JSS app name',
  //   args: ['route path', 'serialized layout data object', 'serialized viewbag object'],
  //   functionName: 'renderView',
  //   moduleName: 'server.bundle'
  // }

  const result = {
    path: '',
    language: '',
    layoutData: null,
    dictionary: null,
  } as EditingData;

  if (!payload || !payload.args || !Array.isArray(payload.args)) {
    return result;
  }

  result.path = payload.args[0];

  if (payload.args.length > 0 && payload.args[1]) {
    result.layoutData = tryParseJson(payload.args[1]);
  }

  if (payload.args.length > 1 && payload.args[2]) {
    const viewBag = tryParseJson(payload.args[2]);
    if (viewBag) {
      result.dictionary = viewBag.dictionary;
      result.language = viewBag.language;
    }
  }

  return result;
}

function tryParseJson(jsonString: string) {
  try {
    const json = JSON.parse(jsonString);
    // handle non-exception-throwing cases
    if (json && typeof json === 'object' && json !== null) {
      return json;
    }
  } catch (e) {
    console.error(`error parsing json string '${jsonString}'`, e);
  }

  return null;
}
