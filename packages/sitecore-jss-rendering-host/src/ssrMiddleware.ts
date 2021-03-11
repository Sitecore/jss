import { IncomingMessage, ServerResponse } from 'http';
import zlib from 'zlib'; // node.js standard lib

export type RenderCallback = (errorValue: Error, successValue?: any) => void;

export type RenderFunction = (callback: RenderCallback, ...args: any[]) => void;

export interface AppInvocationInfo {
  renderFunction: RenderFunction;
  renderFunctionArgs: any[];
  renderFunctionCallback?: RenderCallback;
}

export type AppInvocationInfoResolver = (
  bodyJson: string,
  req: IncomingMessage,
  res: ServerResponse
) => AppInvocationInfo;

export interface SSRMiddlewareOptions {
  appInvocationInfoResolver: AppInvocationInfoResolver;
}

export type WebServerMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next?: (err?: any) => void
) => void;

export type SSRMiddleware = (options: SSRMiddlewareOptions) => WebServerMiddleware;

// don't assume this middleware will always be used by WebpackDevServer
// it may also be used by a "standalone" JSS rendering host / express server.
export const ssrMiddleware: SSRMiddleware = ({
  appInvocationInfoResolver,
}: SSRMiddlewareOptions) => {
  if (!appInvocationInfoResolver) {
    throw new Error('No AppInvocationInfo resolver was provided for SSR middleware');
  }
  return (req: IncomingMessage, res: ServerResponse) => {
    let callback: RenderCallback;
    readRequestBodyAsJson(req)
      .then((bodyJson: any) => {
        if (!bodyJson) {
          throw new Error(`Request body was not JSON: ${req.url}`);
        }
        const invocationInfo = appInvocationInfoResolver(bodyJson, req, res);
        callback = invocationInfo.renderFunctionCallback || getDefaultAppRendererCallback(res);
        invocationInfo.renderFunction(callback, ...invocationInfo.renderFunctionArgs);
      })
      .catch((err) => {
        console.error(err);
        callback(err, null);
      });
  };
};

// todo: add hook for modifying html / response before end
/**
 * @param {ServerResponse} res
 */
export function getDefaultAppRendererCallback(res: ServerResponse) {
  const callback: RenderCallback = (errorValue: Error, successValue?: any) => {
    if (errorValue) {
      respondWithError(res, errorValue);
    } else if (typeof successValue !== 'string') {
      // Arbitrary object/number/etc - JSON-serialize it
      let successValueJson = {};
      try {
        successValueJson = JSON.stringify(successValue);
      } catch (ex) {
        // JSON serialization error - pass it back to http caller.
        respondWithError(res, ex);
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(successValueJson);
    } else {
      // String - can bypass JSON-serialization altogether
      res.setHeader('Content-Type', 'text/plain');
      res.end(successValue);
    }
  };
  return callback;
}

/**
 * @param {IncomingMessage} request
 */
export function readRequestBodyAsJson(request: IncomingMessage) {
  const dataWriter = { output: Buffer.from('') };
  request.on('data', onReadableStreamDataHandler(dataWriter));

  return new Promise((resolve, reject) => {
    request.on('end', () => {
      const contentEncoding = request.headers['content-encoding'];
      extractJsonFromStreamData(dataWriter.output, contentEncoding)
        .then((json) => resolve(json))
        .catch((err) => reject(err));
    });
  });
}

/**
 * @param {ServerResponse} res
 * @param {Error} errorValue
 */
export function respondWithError(res: ServerResponse, errorValue: Error) {
  console.error(errorValue);
  res.statusCode = 500;
  res.end(
    JSON.stringify({
      errorMessage: errorValue.message || errorValue,
      errorDetails: errorValue.stack || null,
    })
  );
}

/**
 * @param {Object} dataWriter
 * @param {Buffer} dataWriter.output
 */
export function onReadableStreamDataHandler(dataWriter: { output: Buffer }) {
  return (data: any) => {
    if (Buffer.isBuffer(data)) {
      dataWriter.output = Buffer.concat([dataWriter.output, data]); // append raw buffer
    } else {
      dataWriter.output = Buffer.concat([dataWriter.output, Buffer.from(data)]);
    }
  };
}

/**
 * @param {Buffer} data
 * @param {string} [contentEncoding]
 */
export function extractJsonFromStreamData(data: Buffer, contentEncoding?: string): Promise<any> {
  let responseString: Promise<string>;

  if (
    contentEncoding &&
    (contentEncoding.indexOf('gzip') !== -1 || contentEncoding.indexOf('deflate') !== -1)
  ) {
    responseString = new Promise((resolve, reject) => {
      zlib.unzip(data, (error, result) => {
        if (error) {
          reject(error);
        }

        if (result) {
          resolve(result.toString('utf-8'));
        }
      });
    });
  } else {
    responseString = Promise.resolve(data.toString('utf-8'));
  }

  return responseString.then(tryParseJson);
}

/**
 * @param {string} jsonString
 */
export function tryParseJson(jsonString: string) {
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
