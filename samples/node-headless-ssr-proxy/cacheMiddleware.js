//cacheMiddleware for Node-level output caching
//duration: duration of the cache in seconds
var mcache = require('memory-cache');
var cacheMiddleware = (duration) => {
    return (req, res, next) => {
        if(req.method !== "GET" || req.originalUrl.includes("layouts/system") || req.originalUrl.includes("sitecore/api/jss/dictionary") || req.originalUrl.includes("/sitecore/api/layout")) return next();
        let key = '__proxy_cache__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.send(cachedBody)
        } else {
            var _end = res.end;
            var _write = res.write;
            var buffer = new Buffer.alloc(0);
           
            // Rewrite response method and get the content.
            res.write = function (data) {
                buffer = Buffer.concat([buffer, data]);
            };
            
            res.end = function() {
                var body = buffer.toString();
                mcache.put(key, body, duration * 1000);
                _write.call(res, body);
                _end.call(res);
            };
            next()
        }
    }
}
module.exports = cacheMiddleware;