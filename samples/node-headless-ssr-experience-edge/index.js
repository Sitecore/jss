const express = require('express');
const compression = require('compression');
const { GraphQLLayoutService, GraphQLDictionaryService } = require('@sitecore-jss/sitecore-jss');
const config = require('./config');

const server = express();

const layoutService = new GraphQLLayoutService({
  endpoint: config.endpoint,
  siteName: config.appName,
});

const dictionaryService = new GraphQLDictionaryService({
  endpoint: config.endpoint,
  siteName: config.appName,
});

const { renderView, parseRouteUrl } = config.serverBundle;

if (!renderView || !parseRouteUrl) {
  throw Error(
    'The serverBundle should contain `renderView` and `parseRouteUrl`, please check your server bundle.'
  );
}

/**
 * If the request URL contains any of the excluded rewrite routes, we assume the response does not need to be server rendered.
 * @param {string} originalUrl requested url
 * @returns {boolean} is url ignored
 */
const isUrlIgnored = (originalUrl) => {
  let result;

  result = config.pathRewriteExcludeRoutes.find((excludedRoute) => {
    return excludedRoute.length > 0 && originalUrl.startsWith(excludedRoute);
  });

  return !!result;
};

/**
 * Parse requested url in order to detect current route and language
 * @param {string} reqRoute requested route
 */
const getRouteParams = (reqRoute) => {
  const routeParams = parseRouteUrl(reqRoute);
  let lang;
  let route;

  if (routeParams) {
    route = routeParams.sitecoreRoute || '/';

    if (!route.startsWith('/')) {
      route = `/${route}`;
    }

    lang = routeParams.lang;
  }

  return { route, lang };
};

/**
 * Handle unexpected error
 * @param {Response} res server response
 * @param {*} err error
 */
const handleError = (res, err) => {
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

    if (!route || isUrlIgnored(route)) {
      res.sendStatus(404);

      return;
    }

    const layoutData = await layoutService.fetchLayoutData(route, lang);

    const language = layoutData.sitecore.context.language;
    const site =
      layoutData && layoutData.sitecore.context.site && layoutData.sitecore.context.site.name;

    const viewBag = { dictionary: {} };

    if (language && site) {
      viewBag.dictionary = await dictionaryService.fetchDictionaryData(language);
    }

    renderView(
      (err, result) => {
        if (err) {
          handleError(res, err);

          return;
        }

        res.status(200).send(result.html);
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
