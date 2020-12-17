import { IncomingMessage, ServerResponse, ClientRequest } from 'http';
import proxy from 'http-proxy-middleware';
import HttpStatus from 'http-status-codes';
import setCookieParser from 'set-cookie-parser';
import zlib from 'zlib'; // node.js standard lib
import { AppRenderer } from './AppRenderer';
import { ProxyConfig } from './ProxyConfig';
import { RenderResponse } from './RenderResponse';
import { RouteUrlParser } from './RouteUrlParser';
import { buildQueryString, tryParseJson } from './util';

// tslint:disable:max-line-length

// For some reason, every other response returned by Sitecore contains the 'set-cookie' header with the SC_ANALYTICS_GLOBAL_COOKIE value as an empty string.
// This effectively sets the cookie to empty on the client as well, so if a user were to close their browser
// after one of these 'empty value' responses, they would not be tracked as a returning visitor after re-opening their browser.
// To address this, we simply parse the response cookies and if the analytics cookie is present but has an empty value, then we
// remove it from the response header. This means the existing cookie in the browser remains intact.
export const removeEmptyAnalyticsCookie = (proxyResponse: any) => {
  const cookies = setCookieParser.parse(proxyResponse.headers['set-cookie']);
  if (cookies) {
    const analyticsCookieIndex = cookies.findIndex(
      (c: any) => c.name === 'SC_ANALYTICS_GLOBAL_COOKIE'
    );
    if (analyticsCookieIndex !== -1) {
      const analyticsCookie = cookies[analyticsCookieIndex];
      if (analyticsCookie && analyticsCookie.value === '') {
        cookies.splice(analyticsCookieIndex, 1);
        /* eslint-disable no-param-reassign */
        proxyResponse.headers['set-cookie'] = cookies;
        /* eslint-enable no-param-reassign */
      }
    }
  }
};

// inspired by: http://stackoverflow.com/a/22487927/9324
async function renderAppToResponse(
  proxyResponse: IncomingMessage,
  request: IncomingMessage,
  serverResponse: ServerResponse,
  renderer: AppRenderer,
  config: ProxyConfig
) {
  // monkey-patch FTW?
  const originalWriteHead = serverResponse.writeHead;
  const originalWrite = serverResponse.write;
  const originalEnd = serverResponse.end;

  // these lines are necessary and must happen before we do any writing to the response
  // otherwise the headers will have already been sent
  delete proxyResponse.headers['content-length'];
  proxyResponse.headers['content-type'] = 'text/html; charset=utf-8';

  // remove IIS server header for security
  delete proxyResponse.headers.server;

  if (config.setHeaders) {
    config.setHeaders(request, serverResponse, proxyResponse);
  }

  const contentEncoding = proxyResponse.headers['content-encoding'];
  if (
    contentEncoding &&
    (contentEncoding.indexOf('gzip') !== -1 || contentEncoding.indexOf('deflate') !== -1)
  ) {
    delete proxyResponse.headers['content-encoding'];
  }

  // we are going to set our own status code if rendering fails
  serverResponse.writeHead = () => serverResponse;

  // buffer the response body as it is written for later processing
  let buf = Buffer.from('');
  serverResponse.write = (data: any, encoding: any) => {
    if (Buffer.isBuffer(data)) {
      buf = Buffer.concat([buf, data]); // append raw buffer
    } else {
      buf = Buffer.concat([buf, Buffer.from(data, encoding)]); // append string with optional character encoding (default utf8)
    }

    // sanity check: if the response is huge, bail.
    // ...we don't want to let someone bring down the server by filling up all our RAM.
    if (buf.length > (config.maxResponseSizeBytes as number)) {
      throw new Error('Document too large');
    }

    return true;
  };


  async function extractLayoutServiceDataFromProxyResponse(): Promise<any> {
    if (
      proxyResponse.statusCode === HttpStatus.OK ||
      proxyResponse.statusCode === HttpStatus.NOT_FOUND
    ) {
      let responseString: Promise<string>;

      if (
        contentEncoding &&
        (contentEncoding.indexOf('gzip') !== -1 || contentEncoding.indexOf('deflate') !== -1)
      ) {
        responseString = new Promise((resolve, reject) => {
          if (config.debug) {
            console.log('Layout service response is compressed; decompressing.');
          }

          zlib.unzip(buf, (error, result) => {
            if (error) {
              reject(error);
            }

            if (result) {
              resolve(result.toString('utf-8'));
            }
          });
        });
      } else {
        responseString = Promise.resolve(buf.toString('utf-8'));
      }

      return responseString.then(tryParseJson);
    }

    return Promise.resolve(null);
  }

  // function replies with HTTP 500 when an error occurs
  async function replyWithError(error: Error) {
    console.error(error);

    let errorResponse = {
      statusCode: proxyResponse.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      content: proxyResponse.statusMessage || 'Internal Server Error',
    };

    if (config.onError) {
      const onError = await config.onError(error, proxyResponse);
      errorResponse = { ...errorResponse, ...onError };
    }

    completeProxyResponse(Buffer.from(errorResponse.content), errorResponse.statusCode, {});
  }

  // callback handles the result of server-side rendering
  async function handleRenderingResult(error: Error | null, result: RenderResponse | null) {
    if (!error && !result) {
      return replyWithError(new Error('Render function did not return a result or an error!'));
    }

    if (error) {
      return replyWithError(error);
    }

    if (!result) {
      // should not occur, but makes TS happy
      return replyWithError(new Error('Render function result did not return a result.'));
    }

    if (!result.html) {
      return replyWithError(
        new Error('Render function result was returned but html property was falsy.')
      );
    }

    if (config.transformSSRContent) {
      result.html = await config.transformSSRContent(result, request, serverResponse);
    }

    // we have to convert back to a buffer so that we can get the *byte count* (rather than character count) of the body
    let content = Buffer.from(result.html);

    // setting the content-length header is not absolutely necessary, but is recommended
    proxyResponse.headers['content-length'] = content.length.toString(10);

    // if original request was a HEAD, we should not return a response body
    if (request.method === 'HEAD') {
      if (config.debug) {
        console.log('DEBUG: Original request method was HEAD, clearing response body');
      }
      content = Buffer.from([]);
    }

    if (result.redirect) {
      if (!result.status) {
        result.status = 302;
      }

      proxyResponse.headers.location = result.redirect;
    }

    const finalStatusCode = result.status || proxyResponse.statusCode || HttpStatus.OK;

    if (config.debug) {
      console.log(
        'DEBUG: FINAL response headers for client',
        JSON.stringify(proxyResponse.headers, null, 2)
      );

      console.log('DEBUG: FINAL status code for client', finalStatusCode);
    }

    completeProxyResponse(content, finalStatusCode);
  }

  function completeProxyResponse(content: Buffer | null, statusCode: number, headers?: any) {
    if (!headers) {
      headers = proxyResponse.headers;
    }

    originalWriteHead.apply(serverResponse, [statusCode, headers]);

    if (content) originalWrite.call(serverResponse, content);

    originalEnd.call(serverResponse);
  }

  async function createViewBag(layoutServiceData: any): Promise<any> {
    let viewBag = {
      statusCode: proxyResponse.statusCode,
      dictionary: {},
    };

    if (config.createViewBag) {
      const customViewBag = await config.createViewBag(
        request,
        serverResponse,
        proxyResponse,
        layoutServiceData
      );

      viewBag = { ...viewBag, ...customViewBag };
    }

    return viewBag;
  }

  // as the response is ending, we parse the current response body which is JSON, then
  // render the app using that JSON, but return HTML to the final response.
  serverResponse.end = async () => {
    try {
      const layoutServiceData = await extractLayoutServiceDataFromProxyResponse();
      const viewBag = await createViewBag(layoutServiceData);

      if (!layoutServiceData) {
        throw new Error(
          `Received invalid response ${proxyResponse.statusCode} ${proxyResponse.statusMessage}`
        );
      }

      return renderer(
        handleRenderingResult,
        (request as any).originalUrl,
        layoutServiceData,
        viewBag
      );
    } catch (error) {
      return replyWithError(error);
    }
  };
}

function handleProxyResponse(
  proxyResponse: IncomingMessage,
  request: any,
  serverResponse: ServerResponse,
  renderer: AppRenderer,
  config: ProxyConfig
) {
  removeEmptyAnalyticsCookie(proxyResponse);

  if (config.debug) {
    console.log('DEBUG: request url', request.url);
    console.log('DEBUG: request query', request.query);
    console.log('DEBUG: request original url', request.originalUrl);
    console.log('DEBUG: proxied request response code', proxyResponse.statusCode);
    console.log('DEBUG: RAW request headers', JSON.stringify(request.headers, null, 2));
    console.log(
      'DEBUG: RAW headers from the proxied response',
      JSON.stringify(proxyResponse.headers, null, 2)
    );
  }

  // if the request URL contains any of the excluded rewrite routes, we assume the response does not need to be server rendered.
  // instead, the response should just be relayed as usual.
  if (isUrlIgnored(request.originalUrl, config, true)) {
    return Promise.resolve(undefined);
  }

  // your first thought might be: why do we need to render the app here? why not just pass the JSON response to another piece of middleware that will render the app?
  // the answer: the proxy middleware ends the response and does not "chain"
  return renderAppToResponse(proxyResponse, request, serverResponse, renderer, config);
}

export function rewriteRequestPath(
  reqPath: string,
  req: any,
  config: ProxyConfig,
  parseRouteUrl?: RouteUrlParser
) {
  // the path comes in URL-encoded by default,
  // but we don't want that because...
  // 1. We need to URL-encode it before we send it out to the Layout Service, if it matches a route
  // 2. We don't want to force people to URL-encode ignored routes, etc (just use spaces instead of %20, etc)
  const decodedReqPath = decodeURIComponent(reqPath);

  // if the request URL contains a path/route that should not be re-written, then just pass it along as-is
  if (isUrlIgnored(reqPath, config)) {
    // we do not return the decoded URL because we're using it verbatim - should be encoded.
    return reqPath;
  }

  // if the request URL doesn't contain the layout service controller path, assume we need to rewrite the request URL so that it does
  // if this seems redundant, it is. the config.pathRewriteExcludeRoutes should contain the layout service path, but can't always assume that it will...
  if (decodedReqPath.indexOf(config.layoutServiceRoute) !== -1) {
    return reqPath;
  }

  let finalReqPath = decodedReqPath;
  const qsIndex = finalReqPath.indexOf('?');
  let qs = '';
  if (qsIndex > -1) {
    qs = buildQueryString(req.query);
    finalReqPath = finalReqPath.slice(0, qsIndex);
  }

  if (config.qsParams) {
    if (qs) {
      qs += '&';
    }
    qs += `${config.qsParams}`;
  }

  let lang;
  if (parseRouteUrl) {
    if (config.debug) {
      console.log(`DEBUG: Parsing route URL using ${decodedReqPath} URL...`);
    }
    const routeParams = parseRouteUrl(finalReqPath);

    if (routeParams) {
      if (routeParams.sitecoreRoute) {
        finalReqPath = routeParams.sitecoreRoute;
      } else {
        finalReqPath = '/';
      }
      if (!finalReqPath.startsWith('/')) {
        finalReqPath = `/${finalReqPath}`;
      }
      lang = routeParams.lang;

      if (routeParams.qsParams) {
        qs += `&${routeParams.qsParams}`;
      }

      if (config.debug) {
        console.log('DEBUG: parseRouteUrl() result', routeParams);
      }
    }
  }

  let path = `${config.layoutServiceRoute}?item=${encodeURIComponent(finalReqPath)}&sc_apikey=${
    config.apiKey
  }`;

  if (lang) {
    path = `${path}&sc_lang=${lang}`;
  }

  if (qs) {
    path = `${path}&${qs}`;
  }

  return path;
}

function isUrlIgnored(originalUrl: string, config: ProxyConfig, noDebug = false): boolean {
  if (config.pathRewriteExcludePredicate && config.pathRewriteExcludeRoutes) {
    console.error(
      'ERROR: pathRewriteExcludePredicate and pathRewriteExcludeRoutes were both provided in config. Provide only one.'
    );
    process.exit(1);
  }

  let result = null;

  if (config.pathRewriteExcludeRoutes) {
    const matchRoute = decodeURIComponent(originalUrl).toUpperCase();
    result = config.pathRewriteExcludeRoutes.find(
      (excludedRoute: string) => excludedRoute.length > 0 && matchRoute.startsWith(excludedRoute)
    );

    if (!noDebug && config.debug) {
      if (!result) {
        console.log(
          `DEBUG: URL ${originalUrl} did not match the proxy exclude list, and will be treated as a layout service route to render. Excludes:`,
          config.pathRewriteExcludeRoutes
        );
      } else {
        console.log(
          `DEBUG: URL ${originalUrl} matched the proxy exclude list and will be served verbatim as received. Excludes: `,
          config.pathRewriteExcludeRoutes
        );
      }
    }

    return result ? true : false;
  }

  if (config.pathRewriteExcludePredicate) {
    result = config.pathRewriteExcludePredicate(originalUrl);

    if (!noDebug && config.debug) {
      if (!result) {
        console.log(
          `DEBUG: URL ${originalUrl} did not match the proxy exclude function, and will be treated as a layout service route to render.`
        );
      } else {
        console.log(
          `DEBUG: URL ${originalUrl} matched the proxy exclude function and will be served verbatim as received.`
        );
      }
    }

    return result;
  }

  return false;
}

function handleProxyRequest(proxyReq: any, req: any, res: ServerResponse, config: ProxyConfig,
  customOnProxyReq: ((proxyReq: ClientRequest, req: IncomingMessage, res: ServerResponse) => void) | undefined) {

  // if a HEAD request, we still need to issue a GET so we can return accurate headers
  // proxyReq defined as 'any' to allow us to mutate this
  if (proxyReq.method === 'HEAD' && !isUrlIgnored(req.originalUrl, config, true)) {
    if (config.debug) {
      console.log('DEBUG: Rewriting HEAD request to GET to create accurate headers');
    }
    proxyReq.method = 'GET';
  }
  // invoke custom onProxyReq
  if (customOnProxyReq) {
    customOnProxyReq(proxyReq, req, res);
  }
}

function createOptions(
  renderer: AppRenderer,
  config: ProxyConfig,
  parseRouteUrl: RouteUrlParser
): proxy.Config {
  if (!config.maxResponseSizeBytes) {
    config.maxResponseSizeBytes = 10 * 1024 * 1024;
  }

  // ensure all excludes are case insensitive
  if (config.pathRewriteExcludeRoutes && Array.isArray(config.pathRewriteExcludeRoutes)) {
    config.pathRewriteExcludeRoutes = config.pathRewriteExcludeRoutes.map((exclude) =>
      exclude.toUpperCase()
    );
  }

  if (config.debug) {
    console.log('DEBUG: Final proxy config', config);
  }

  const customOnProxyReq = config.proxyOptions?.onProxyReq;
  return {
    ...config.proxyOptions,
    target: config.apiHost,
    changeOrigin: true, // required otherwise need to include CORS headers
    ws: true,
    pathRewrite: (reqPath, req) => rewriteRequestPath(reqPath, req, config, parseRouteUrl),
    logLevel: config.debug ? 'debug' : 'info',
    onProxyReq: (proxyReq, req, res) => handleProxyRequest(proxyReq, req, res, config, customOnProxyReq),
    onProxyRes: (proxyRes, req, res) => handleProxyResponse(proxyRes, req, res, renderer, config),
  };
}

export default function scProxy(
  renderer: AppRenderer,
  config: ProxyConfig,
  parseRouteUrl: RouteUrlParser
) {
  const options = createOptions(renderer, config, parseRouteUrl);
  return proxy(options);
}
