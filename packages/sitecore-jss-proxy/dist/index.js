"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_proxy_middleware_1 = __importDefault(require("http-proxy-middleware"));
var set_cookie_parser_1 = __importDefault(require("set-cookie-parser"));
var zlib_1 = __importDefault(require("zlib")); // node.js standard lib
var util_1 = require("./util");
// tslint:disable:max-line-length
// For some reason, every other response returned by Sitecore contains the 'set-cookie' header with the SC_ANALYTICS_GLOBAL_COOKIE value as an empty string.
// This effectively sets the cookie to empty on the client as well, so if a user were to close their browser
// after one of these 'empty value' responses, they would not be tracked as a returning visitor after re-opening their browser.
// To address this, we simply parse the response cookies and if the analytics cookie is present but has an empty value, then we
// remove it from the response header. This means the existing cookie in the browser remains intact.
exports.removeEmptyAnalyticsCookie = function (proxyResponse) {
    var cookies = set_cookie_parser_1.default.parse(proxyResponse.headers['set-cookie']);
    if (cookies) {
        var analyticsCookieIndex = cookies.findIndex(function (c) { return c.name === 'SC_ANALYTICS_GLOBAL_COOKIE'; });
        if (analyticsCookieIndex !== -1) {
            var analyticsCookie = cookies[analyticsCookieIndex];
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
function renderAppToResponse(proxyResponse, request, serverResponse, renderer, config) {
    return __awaiter(this, void 0, void 0, function () {
        function extractLayoutServiceDataFromProxyResponse() {
            return __awaiter(this, void 0, void 0, function () {
                var responseString;
                return __generator(this, function (_a) {
                    if (proxyResponse.statusCode === 200 || proxyResponse.statusCode === 404) {
                        responseString = void 0;
                        if (contentEncoding &&
                            (contentEncoding.indexOf('gzip') !== -1 || contentEncoding.indexOf('deflate') !== -1)) {
                            responseString = new Promise(function (resolve, reject) {
                                if (config.debug) {
                                    console.log('Layout service response is compressed; decompressing.');
                                }
                                zlib_1.default.unzip(buf, function (error, result) {
                                    if (error) {
                                        reject(error);
                                    }
                                    if (result) {
                                        resolve(result.toString('utf-8'));
                                    }
                                });
                            });
                        }
                        else {
                            responseString = Promise.resolve(buf.toString('utf-8'));
                        }
                        return [2 /*return*/, responseString.then(util_1.tryParseJson)];
                    }
                    return [2 /*return*/, Promise.resolve(null)];
                });
            });
        }
        // function replies with HTTP 500 when an error occurs
        function replyWithError(error) {
            return __awaiter(this, void 0, void 0, function () {
                var errorResponse, onError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.error(error);
                            errorResponse = {
                                statusCode: proxyResponse.statusCode || 500,
                                content: proxyResponse.statusMessage || 'Internal Server Error',
                            };
                            if (!config.onError) return [3 /*break*/, 2];
                            return [4 /*yield*/, config.onError(error, proxyResponse)];
                        case 1:
                            onError = _a.sent();
                            errorResponse = __assign({}, errorResponse, onError);
                            _a.label = 2;
                        case 2:
                            completeProxyResponse(Buffer.from(errorResponse.content), errorResponse.statusCode, {});
                            return [2 /*return*/];
                    }
                });
            });
        }
        // callback handles the result of server-side rendering
        function handleRenderingResult(error, result) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, content, finalStatusCode;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!error && !result) {
                                return [2 /*return*/, replyWithError(new Error('Render function did not return a result or an error!'))];
                            }
                            if (error) {
                                return [2 /*return*/, replyWithError(error)];
                            }
                            if (!result) {
                                // should not occur, but makes TS happy
                                return [2 /*return*/, replyWithError(new Error('Render function result did not return a result.'))];
                            }
                            if (!result.html) {
                                return [2 /*return*/, replyWithError(new Error('Render function result was returned but html property was falsy.'))];
                            }
                            if (!config.transformSSRContent) return [3 /*break*/, 2];
                            _a = result;
                            return [4 /*yield*/, config.transformSSRContent(result, request, serverResponse)];
                        case 1:
                            _a.html = _b.sent();
                            _b.label = 2;
                        case 2:
                            content = Buffer.from(result.html);
                            // setting the content-length header is not absolutely necessary, but is recommended
                            proxyResponse.headers['content-length'] = content.length.toString(10);
                            if (result.redirect) {
                                if (!result.status) {
                                    result.status = 302;
                                }
                                proxyResponse.headers['location'] = result.redirect;
                            }
                            finalStatusCode = result.status || proxyResponse.statusCode || 200;
                            if (config.debug) {
                                console.log('DEBUG: FINAL response headers for client', JSON.stringify(proxyResponse.headers, null, 2));
                                console.log('DEBUG: FINAL status code for client', finalStatusCode);
                            }
                            completeProxyResponse(content, finalStatusCode);
                            return [2 /*return*/];
                    }
                });
            });
        }
        function completeProxyResponse(content, statusCode, headers) {
            if (!headers) {
                headers = proxyResponse.headers;
            }
            originalWriteHead.apply(serverResponse, [statusCode, headers]);
            originalWrite.call(serverResponse, content);
            originalEnd.call(serverResponse);
        }
        function createViewBag(layoutServiceData) {
            return __awaiter(this, void 0, void 0, function () {
                var viewBag, customViewBag;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            viewBag = {
                                statusCode: proxyResponse.statusCode,
                                dictionary: {},
                            };
                            if (!config.createViewBag) return [3 /*break*/, 2];
                            return [4 /*yield*/, config.createViewBag(request, serverResponse, proxyResponse, layoutServiceData)];
                        case 1:
                            customViewBag = _a.sent();
                            viewBag = __assign({}, viewBag, customViewBag);
                            _a.label = 2;
                        case 2: return [2 /*return*/, viewBag];
                    }
                });
            });
        }
        var originalWriteHead, originalWrite, originalEnd, contentEncoding, buf;
        var _this = this;
        return __generator(this, function (_a) {
            originalWriteHead = serverResponse.writeHead;
            originalWrite = serverResponse.write;
            originalEnd = serverResponse.end;
            // these lines are necessary and must happen before we do any writing to the response
            // otherwise the headers will have already been sent
            delete proxyResponse.headers['content-length'];
            proxyResponse.headers['content-type'] = 'text/html; charset=utf-8';
            // remove IIS server header for security
            delete proxyResponse.headers['server'];
            if (config.setHeaders) {
                config.setHeaders(request, serverResponse, proxyResponse);
            }
            contentEncoding = proxyResponse.headers['content-encoding'];
            if (contentEncoding &&
                (contentEncoding.indexOf('gzip') !== -1 || contentEncoding.indexOf('deflate') !== -1)) {
                delete proxyResponse.headers['content-encoding'];
            }
            // we are going to set our own status code if rendering fails
            serverResponse.writeHead = function () { };
            buf = Buffer.from('');
            serverResponse.write = function (data, encoding) {
                if (Buffer.isBuffer(data)) {
                    buf = Buffer.concat([buf, data]); // append raw buffer
                }
                else {
                    buf = Buffer.concat([buf, Buffer.from(data, encoding)]); // append string with optional character encoding (default utf8)
                }
                // sanity check: if the response is huge, bail.
                // ...we don't want to let someone bring down the server by filling up all our RAM.
                if (buf.length > config.maxResponseSizeBytes) {
                    throw new Error('Document too large');
                }
                return true;
            };
            // as the response is ending, we parse the current response body which is JSON, then
            // render the app using that JSON, but return HTML to the final response.
            serverResponse.end = function () { return __awaiter(_this, void 0, void 0, function () {
                var layoutServiceData, viewBag, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, extractLayoutServiceDataFromProxyResponse()];
                        case 1:
                            layoutServiceData = _a.sent();
                            if (config.useProxyUrls) {
                                util_1.updateObject(layoutServiceData, config.apiHost, config.proxyHost);
                            }
                            return [4 /*yield*/, createViewBag(layoutServiceData)];
                        case 2:
                            viewBag = _a.sent();
                            if (!layoutServiceData) {
                                throw new Error("Received invalid response " + proxyResponse.statusCode + " " + proxyResponse.statusMessage);
                            }
                            return [2 /*return*/, renderer(handleRenderingResult, request.originalUrl, layoutServiceData, viewBag)];
                        case 3:
                            error_1 = _a.sent();
                            return [2 /*return*/, replyWithError(error_1)];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            return [2 /*return*/];
        });
    });
}
function handleProxyResponse(proxyResponse, request, serverResponse, renderer, config) {
    exports.removeEmptyAnalyticsCookie(proxyResponse);
    if (config.debug) {
        console.log('DEBUG: request url', request.url);
        console.log('DEBUG: request query', request.query);
        console.log('DEBUG: request original url', request.originalUrl);
        console.log('DEBUG: proxied request response code', proxyResponse.statusCode);
        console.log('DEBUG: RAW request headers', JSON.stringify(request.headers, null, 2));
        console.log('DEBUG: RAW headers from the proxied response', JSON.stringify(proxyResponse.headers, null, 2));
    }
    var originWrite = serverResponse.write;
    // if the request URL contains any of the excluded rewrite routes, we assume the response does not need to be server rendered.
    // instead, the response should just be relayed as usual.
    if (isUrlIgnored(request.originalUrl, config, true)) {
        // check property in config property to apply that only for configured settings, not always...
        // 
        // New config properties:
        //
        // isProxyUrls: boolean
        // proxyHost: string
        if (config.useProxyUrls) {
            serverResponse.write = function (data, encoding) {
                try {
                    // console.log(config);
                    var jsonData = JSON.parse(data);
                    util_1.updateObject(jsonData, config.apiHost, config.proxyHost);
                    var buf = Buffer.from(JSON.stringify(jsonData), encoding);
                    originWrite.call(serverResponse, buf);
                }
                catch (err) {
                    // console.log(err);
                }
                return true;
            };
        }
        return Promise.resolve(undefined);
    }
    // your first thought might be: why do we need to render the app here? why not just pass the JSON response to another piece of middleware that will render the app?
    // the answer: the proxy middleware ends the response and does not "chain"
    return renderAppToResponse(proxyResponse, request, serverResponse, renderer, config);
}
function rewriteRequestPath(reqPath, req, config, parseRouteUrl) {
    // the path comes in URL-encoded by default,
    // but we don't want that because...
    // 1. We need to URL-encode it before we send it out to the Layout Service, if it matches a route
    // 2. We don't want to force people to URL-encode ignored routes, etc (just use spaces instead of %20, etc)
    var decodedReqPath = decodeURIComponent(reqPath);
    // if the request URL contains a path/route that should not be re-written, then just pass it along as-is
    if (isUrlIgnored(decodedReqPath, config)) {
        // we do not return the decoded URL because we're using it verbatim - should be encoded.
        return reqPath;
    }
    // if the request URL doesn't contain the layout service controller path, assume we need to rewrite the request URL so that it does
    // if this seems redundant, it is. the config.pathRewriteExcludeRoutes should contain the layout service path, but can't always assume that it will...
    if (decodedReqPath.indexOf(config.layoutServiceRoute) !== -1) {
        return reqPath;
    }
    var finalReqPath = decodedReqPath;
    var qsIndex = finalReqPath.indexOf('?');
    var qs;
    if (qsIndex > -1) {
        qs = util_1.buildQueryString(req.query);
        finalReqPath = finalReqPath.slice(0, qsIndex);
    }
    if (config.qsParams) {
        qs += "&" + config.qsParams;
    }
    var lang;
    if (parseRouteUrl) {
        if (config.debug) {
            console.log("DEBUG: Parsing route URL using " + decodedReqPath + " URL...");
        }
        var routeParams = parseRouteUrl(decodedReqPath);
        if (routeParams) {
            if (routeParams.sitecoreRoute) {
                finalReqPath = routeParams.sitecoreRoute;
            }
            else {
                finalReqPath = '/';
            }
            if (!finalReqPath.startsWith('/')) {
                finalReqPath = "/" + finalReqPath;
            }
            lang = routeParams.lang;
            if (routeParams.qsParams) {
                qs += "&" + routeParams.qsParams;
            }
            if (config.debug) {
                console.log("DEBUG: parseRouteUrl() result", routeParams);
            }
        }
    }
    var path = config.layoutServiceRoute + "?item=" + encodeURIComponent(finalReqPath) + "&sc_apikey=" + config.apiKey;
    if (lang) {
        path = path + "&sc_lang=" + lang;
    }
    if (qs) {
        path = path + "&" + qs;
    }
    return path;
}
exports.rewriteRequestPath = rewriteRequestPath;
function isUrlIgnored(originalUrl, config, noDebug) {
    if (noDebug === void 0) { noDebug = false; }
    if (config.pathRewriteExcludePredicate && config.pathRewriteExcludeRoutes) {
        console.error('ERROR: pathRewriteExcludePredicate and pathRewriteExcludeRoutes were both provided in config. Provide only one.');
        process.exit(1);
    }
    var result = null;
    if (config.pathRewriteExcludeRoutes) {
        var matchRoute_1 = decodeURIComponent(originalUrl).toUpperCase();
        result = config.pathRewriteExcludeRoutes.find(function (excludedRoute) { return excludedRoute.length > 0 && matchRoute_1.startsWith(excludedRoute); });
        if (!noDebug && config.debug && result) {
            console.log("DEBUG: URL " + originalUrl + " did not match the proxy exclude list, and will be treated as a layout service route to render. Excludes:", config.pathRewriteExcludeRoutes);
        }
        else if (!noDebug) {
            console.log("DEBUG: URL " + originalUrl + " matched the proxy exclude list and will be served verbatim as received. Excludes: ", config.pathRewriteExcludeRoutes);
        }
        return result ? true : false;
    }
    if (config.pathRewriteExcludePredicate) {
        result = config.pathRewriteExcludePredicate(originalUrl);
        if (config.debug && result) {
            console.log("DEBUG: URL " + originalUrl + " did not match the proxy exclude function, and will be treated as a layout service route to render.");
        }
        else {
            console.log("DEBUG: URL " + originalUrl + " matched the proxy exclude function and will be served verbatim as received.");
        }
        return result;
    }
    return false;
}
function createOptions(renderer, config, parseRouteUrl) {
    if (!config.maxResponseSizeBytes) {
        config.maxResponseSizeBytes = 10 * 1024 * 1024;
    }
    // ensure all excludes are case insensitive
    if (config.pathRewriteExcludeRoutes && Array.isArray(config.pathRewriteExcludeRoutes)) {
        config.pathRewriteExcludeRoutes = config.pathRewriteExcludeRoutes.map(function (exclude) {
            return exclude.toUpperCase();
        });
    }
    if (config.debug) {
        console.log('DEBUG: Final proxy config', config);
    }
    return __assign({ target: config.apiHost, changeOrigin: true, ws: true, pathRewrite: function (reqPath, req) { return rewriteRequestPath(reqPath, req, config, parseRouteUrl); }, logLevel: config.debug ? 'debug' : 'info', onProxyRes: function (proxyRes, req, res) { return handleProxyResponse(proxyRes, req, res, renderer, config); } }, config.proxyOptions);
}
function scProxy(renderer, config, parseRouteUrl) {
    var options = createOptions(renderer, config, parseRouteUrl);
    return http_proxy_middleware_1.default(options);
}
exports.default = scProxy;
