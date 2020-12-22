// eslint-disable-next-line spaced-comment
/// <reference types="../global" />
import { parse } from 'url';
import { Request, Response } from 'express';
import Server from 'next/dist/next-server/server/next-server';
import { EditingData } from '@sitecore-jss/sitecore-jss-nextjs';
import { HtmlProcessor } from './html-processors';
export class EditingMiddleware {
  /**
   * Express middleware for handling requests from the Sitecore Experience Editor.
   * @class
   * @param {Server} nextApp The Next.js app.
   * @param {string} editRoute The Next.js route to use for rendering.
   * @param {HtmlProcessor[]} [htmlProcessors] Html processors to run on rendered html.
   */
  constructor(
    readonly nextApp: Server,
    readonly editRoute: string,
    readonly htmlProcessors?: HtmlProcessor[]
  ) {}

  /**
   * Returns the Express request handler for Experience Editor POST requests.
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>} request handler
   */
  public getRequestHandler(): (req: Request, res: Response) => Promise<void> {
    return this.handleRequest;
  }

  private handleRequest = async (req: Request, res: Response): Promise<void> => {
    try {
      // Extract Experience Editor data from the request
      const data = extractEditingData(req);

      // path contains the URL requested via Sitecore
      const parsedUrl = parse(data.path, true);

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
        this.htmlProcessors.forEach((processor) => {
          html = html && processor.processHtml(html);
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
  };
}

/**
 * @param {Request} req
 */
export function extractEditingData(req: Request): EditingData {
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

  // req.body _should_ have already been parsed as JSON at this point (via `body-parser` middleware)
  const payload = req.body;
  if (!payload || !payload.args || !Array.isArray(payload.args) || payload.args.length < 3) {
    throw new Error('Unable to extract editing data from request');
  }

  const result = {
    path: '',
    language: '',
    layoutData: null,
    dictionary: null,
  } as EditingData;

  result.path = payload.args[0];
  result.layoutData = JSON.parse(payload.args[1]);
  const viewBag = JSON.parse(payload.args[2]);
  result.dictionary = viewBag.dictionary;
  result.language = viewBag.language;

  return result;
}
