import 'dotenv/config';
import express, { Response } from 'express';
import compression from 'compression';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { debug } from '@sitecore-jss/sitecore-jss';
import { editingRouter } from '@sitecore-jss/sitecore-jss-proxy';
import { healthCheck } from '@sitecore-jss/sitecore-jss-proxy';
import { config } from './config';

const server = express();

const {
  renderView,
  parseRouteUrl,
  dictionaryServiceFactory,
  layoutServiceFactory,
  personalizeHelper,
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
export const personalizePlugin: Plugin = (proxyServer) => {
  let variantIds: string[] = [];
  proxyServer.on('proxyReq', async (_, req, res) => {
    variantIds = await personalizeHelper.getVariantIds(req, res);
    console.log(`REQ variantIds ${JSON.stringify(variantIds)}`);
  });
  proxyServer.on(
    'proxyRes',
    responseInterceptor(async (responseBuffer) => {
      // console.log(`RES variantIds ${JSON.stringify(variantIds)}`);
      let response = responseBuffer.toString('utf8');
      let layoutDataRaw = JSON.parse(response);
      console.log(JSON.stringify(layoutDataRaw));
      if (layoutDataRaw?.data?.layout?.item?.rendered?.sitecore) {
        let layoutData = {
          sitecore: {
            ...layoutDataRaw?.data?.layout?.item?.rendered?.sitecore,
          },
        };
        // console.log(`BEFORE! ${JSON.stringify(layoutDataRaw)}`);
        layoutData = personalizeHelper.personalizeLayout(layoutData, variantIds);
        // console.log(`AFTER! ${JSON.stringify(layoutData)}`);
        layoutDataRaw.data.layout.item.rendered = layoutData;
        response = JSON.stringify(layoutDataRaw);
      }
      return response;
    })
  );
};
/**
 * Proxy browser GraphQL requests to the Sitecore GraphQL endpoint
 */
server.use(
  graphQLEndpoint.path,
  createProxyMiddleware({
    target: graphQLEndpoint.target,
    changeOrigin: true,
    selfHandleResponse: true,
    on: {
      proxyRes: responseInterceptor(async (responseBuffer) => {
        const layoutMatcher = /^{"data":{"layout":{"item":{/;
        const response = responseBuffer.toString('utf8');
        if (response.match(layoutMatcher)) {
          // const variantIds = await personalizeHelper.getVariantIds(req, res);
          const layoutData = JSON.parse(response);
          // layoutData = personalizeHelper.personalizeLayout(layoutData, variantIds);
          console.log(JSON.stringify(layoutData));
        }
        // console.log(res);
        return responseBuffer;
      }),
    },
  })
);

/**
 * The health check endpoint
 */
server.use(healthCheck());

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
    let layoutData = await layoutService.fetchLayoutData(
      route,
      lang || config.serverBundle.defaultLanguage
    );
    const variantIds = await personalizeHelper.getVariantIds(req, res);
    // console.log(layoutData);
    layoutData = personalizeHelper.personalizeLayout(layoutData, variantIds);
    // console.log(layoutData);
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
