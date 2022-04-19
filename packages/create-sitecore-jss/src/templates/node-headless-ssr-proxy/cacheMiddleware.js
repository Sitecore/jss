//cacheMiddleware for Node-level output caching

const mcache = require('memory-cache');

// List of urls that will be skipped during caching
const EXCLUDED_PATHS = ['layouts/system', 'sitecore/api/jss/dictionary', '/sitecore/api/layout'];

/**
 * @param {string} method request method
 * @param {string} url request url
 * @returns {boolean} is path excluded
 */
const isExcludedPath = (method, url) => {
  const containsExcludedPath = !!EXCLUDED_PATHS.find((path) => url.includes(path));

  return method !== 'GET' || containsExcludedPath;
};

/**
 * Cache requests during {@link duration} that aren't excluded in {@link EXCLUDED_PATHS}
 * @param {number} duration The number of milliseconds to cache request
 */
const cacheMiddleware = (duration = 10000) => (req, res, next) => {
  if (isExcludedPath(req.method, req.originalUrl)) return next();

  const key = '__proxy_cache__' + req.originalUrl || req.url;
  const cachedBody = mcache.get(key);

  if (cachedBody) {
    res.send(cachedBody);
    return;
  }

  const { end: _end, write: _write } = res;
  let buffer = Buffer.alloc(0);

  // Rewrite response method and get the content.
  res.write = (data) => {
    buffer = Buffer.concat([buffer, data]);
  };

  res.end = () => {
    const body = buffer.toString();
    mcache.put(key, body, duration);
    _write.call(res, body);
    _end.call(res);
  };

  next();
};

module.exports = cacheMiddleware;
