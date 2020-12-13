import { parse } from 'url';
import { Request, Response } from 'express';
import Server from 'next/dist/next-server/server/next-server';
import { EditingData } from '@sitecore-jss/sitecore-jss-nextjs';
import { HtmlProcessor } from './html-processors';

/**
 * Express middleware for handling requests from the Sitecore Experience Editor.
 * @constructor
 * @param {object} nextApp The Next.js app.
 * @param {string} editRoute The Next.js route to use for rendering.
 * @param {HtmlProcessor[]} [htmlProcessors] Html processors to run on rendered html.
 */
export class EditingMiddleware {
  constructor(readonly nextApp: Server, readonly editRoute: string, readonly htmlProcessors?: HtmlProcessor[]) {}

  /**
   * Get Express request handler
   */
  public getRequestHandler(): (req: Request, res: Response) => Promise<void> {
    return this.handleRequest.bind(this);
  }

  private async handleRequest(req: Request, res: Response): Promise<void> {
    // Extract Experience Editor data from the request
    const data = extractEditingData(req);

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

      // Now render the page
      let html = await this.nextApp.renderToHTML(req, res, this.editRoute, parsedUrl.query);

      if (html === null || html.length === 0) {
        throw new Error(`Failed to render html for ${data.path}`);
      }

      // Run any post-render processing of the html
      if (this.htmlProcessors) {
        this.htmlProcessors.forEach(processor => {
          html = processor.processHtml(html!);
        });
      }

      res.status(200).json({
        html,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        html: `<html><body>${err}</body></html>`,
      });
    }
  }
}

export function extractEditingData(req: Request): EditingData {
  // req.body should have already been parsed as JSON at this point (via `body-parser` middleware)
  const payload = req.body;

  // The Experience Editor will send the following body data structure,
  // though we're only concerned with the "args".
  // {
  //   id: 'JSS app name',
  //   args: ['path', 'serialized layout data object', 'serialized viewbag object'],
  //   functionName: 'renderView',
  //   moduleName: 'server.bundle'
  // }
  // The 'serialized viewbag object' structure:
  // {
  //   language: 'language',
  //   dictionary: 'key-value representation of tokens and their corresponding translations',
  //   httpContext: 'serialized request data'
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
