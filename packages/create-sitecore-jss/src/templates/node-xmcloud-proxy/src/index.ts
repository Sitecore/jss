import 'dotenv/config';
import express, { Response } from 'express';
import compression from 'compression';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { debug } from '@sitecore-jss/sitecore-jss';
import { editingRouter } from '@sitecore-jss/sitecore-jss-proxy';
import { config } from './config';

const server = express();

const {
  renderView,
  parseRouteUrl,
  dictionaryServiceFactory,
  layoutServiceFactory,
} = config.serverBundle;

/**
 * Required server bundle properties
 */
const requiredProperties = [
  'renderView',
  'parseRouteUrl',
  'clientFactory',
  'getClientFactoryConfig',
  'defaultLanguage',
  'layoutServiceFactory',
  'dictionaryServiceFactory',
  'components',
  'metadata',
];

const missingProperties = requiredProperties.filter((property) => !config.serverBundle[property]);

if (missingProperties.length > 0) {
  throw new Error(
    `ERROR: The serverBundle should export the following properties: ${missingProperties.join(
      ', '
    )}. Please check your server bundle.`
  );
}

const layoutService = layoutServiceFactory.create();

const dictionaryService = dictionaryServiceFactory.create();

const clientFactoryConfig = config.serverBundle.getClientFactoryConfig();

/**
 * GraphQL endpoint resolution to meet the requirements of the http-proxy-middleware
 */
const graphQLEndpoint = (() => {
  try {
    const graphQLEndpoint = new URL(clientFactoryConfig.endpoint);
    // Browser request path to the proxy. Includes only the pathname.
    const pathname = graphQLEndpoint.pathname;
    // Target URL for the proxy. Can't include the query string.
    const target = `${graphQLEndpoint.protocol}//${graphQLEndpoint.hostname}${pathname}`;

    return {
      target,
      path: pathname,
    };
  } catch (error) {
    throw new Error(
      `ERROR: The serverBundle should export a getClientFactoryConfig function with valid GraphQL endpoint URL returned, current value is ${clientFactoryConfig.endpoint}. ` +
        'Please check your server bundle.'
    );
  }
})();

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
  debug.proxy('response error %o', err);

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

/**
 * Proxy browser GraphQL requests to the Sitecore GraphQL endpoint
 */
server.use(
  graphQLEndpoint.path,
  createProxyMiddleware({
    target: graphQLEndpoint.target,
    changeOrigin: true,
  })
);

/**
 * Proxy editing requests through the editing router
 */
server.use(
  '/api/editing',
  editingRouter({
    config: {
      components: config.serverBundle.components,
      metadata: config.serverBundle.metadata,
    },
    render: {
      clientFactory: config.serverBundle.clientFactory,
      renderView,
    },
  })
);

server.use(async (req, res) => {
  debug.proxy(`performing SSR for ${req.originalUrl}`);

  try {
    const { route, lang } = getRouteParams(req.originalUrl);

    if (!route) {
      debug.proxy('no route detected, returning 404');

      res.sendStatus(404);

      return;
    }

    // Language is required. In case it's not specified in the requested URL, fallback to the default language from the app configuration.
    const layoutData = await layoutService.fetchLayoutData(
      route,
      lang || config.serverBundle.defaultLanguage
    );

    const viewBag = { dictionary: {} };

    viewBag.dictionary = await dictionaryService.fetchDictionaryData(
      layoutData.sitecore.context.language || config.serverBundle.defaultLanguage
    );

    renderView(
      (err, result) => {
        if (err) {
          handleError(res, err);
          return;
        }

        if (!result) {
          debug.proxy('no result returned from renderView, returning 204');

          res.status(204).send();
          return;
        }

        const statusCode = layoutData.sitecore.route ? 200 : 404;

        debug.proxy('sending response with status %s', statusCode);

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
