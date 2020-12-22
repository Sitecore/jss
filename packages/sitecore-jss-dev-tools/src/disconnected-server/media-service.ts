import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

/*
  Implements middleware that serves static assets and manifest media assets
*/

export interface DisconnectedAssetMiddlewareOptions {
  manifestPath: string;
  staticRootPath: string;
}

/**
 * @param {Object} config
 * @param {string} config.manifestPath
 * @param {string} config.staticRootPath
 */
export function createDisconnectedAssetMiddleware({
  manifestPath,
  staticRootPath,
}: DisconnectedAssetMiddlewareOptions) {
  return function disconnectedAssetMiddleware(request: Request, response: Response) {
    let localUrl = request.originalUrl;

    // strip query
    if (localUrl.indexOf('?') > -1) {
      localUrl = localUrl.substring(0, localUrl.indexOf('?'));
    }

    // match on in-manifest assets
    let localPath = path.join(manifestPath, localUrl);
    if (!fs.existsSync(localPath)) {
      // match on static app assets
      localPath = path.join(staticRootPath, localUrl);
      console.log(`> [STATIC] '${request.originalUrl}' - sent ${localPath} from static assets`);
    } else {
      console.log(`> [MEDIA] '${request.originalUrl}' - sent ${localPath} from manifest`);
    }

    response.sendFile(localPath);
  };
}
