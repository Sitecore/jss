import express, { Response } from 'express';
import compression from 'compression';
import 'dotenv/config';
import { GraphQLLayoutService } from '@sitecore-jss/sitecore-jss/layout';
import { GraphQLDictionaryService } from '@sitecore-jss/sitecore-jss/i18n';
import { config } from './config';

const server = express();

const layoutService = new GraphQLLayoutService({
  endpoint: config.endpoint,
  apiKey: config.apiKey,
  siteName: config.appName,
});

const dictionaryService = new GraphQLDictionaryService({
  endpoint: config.endpoint,
  apiKey: config.apiKey,
  siteName: config.appName,
  /*
    The Dictionary Service needs a root item ID in order to fetch dictionary phrases for the current
    app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
    otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
    rootItemId: '{GUID}'
  */
});

const { renderView, parseRouteUrl } = config.serverBundle;

if (!renderView || !parseRouteUrl) {
  throw new Error(
    'ERROR: The serverBundle should export `renderView` and `parseRouteUrl`, please check your server bundle.'
  );
}

/**
 * Parse requested url in order to detect current route and language
 * @param {string} reqRoute requested route
 */
const getRouteParams = (reqRoute: string) => {
  const routeParams = parseRouteUrl(reqRoute);
  let lang;
  let route;

  if (routeParams) {
    route = routeParams.sitecoreRoute || '/';

    if (!route.startsWith('/')) {
      route = `/${route}`;
    }

    lang = routeParams.lang || '';
  }

  return { route, lang };
};

/**
 * Handle unexpected error
 * @param {Response} res server response
 * @param {Error} err error
 */
const handleError = (res: Response, err: unknown) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
};

// enable gzip compression for appropriate file types
server.use(compression());

// turn off x-powered-by http header
server.settings['x-powered-by'] = false;

// Serve static app assets from local /dist folder
server.use(
  '/dist',
  express.static('dist', {
    fallthrough: false, // force 404 for unknown assets under /dist
  })
);

server.use(async (req, res) => {
  try {
    const { route, lang } = getRouteParams(req.originalUrl);

    if (!route) {
      res.sendStatus(404);

      return;
    }

    // Language is required. In case it's not specified in the requested URL, fallback to the default language from the app configuration.
    const layoutData = await layoutService.fetchLayoutData(route, lang || config.defaultLanguage);

    const viewBag = { dictionary: {} };

    viewBag.dictionary = await dictionaryService.fetchDictionaryData(
      layoutData.sitecore.context.language || config.defaultLanguage
    );

    renderView(
      (err, result) => {
        if (err) {
          handleError(res, err);
          return;
        }

        if (!result) {
          res.status(204).send();
          return;
        }

        const statusCode = layoutData.sitecore.route ? 200 : 404;

        res.status(statusCode).send(result.html);
      },
      route,
      layoutData,
      viewBag
    );
  } catch (err) {
    handleError(res, err);
  }
});

server.listen(config.port, () => {
  console.log(`server listening on port ${config.port}!`);
});
