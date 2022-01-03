// import type { IncomingMessage, ServerResponse } from 'http'
// import proxy from 'http-proxy-middleware';

import bodyParser from 'body-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
import config from 'temp/config';

const app = express();

app.use(bodyParser.json());

// if (isDisconnected()) {
// when disconnected we proxy to the local faux layout service host,
// see scripts/disconnected-mode-proxy.js
const proxyUrl = `http://localhost:${process.env.PROXY_PORT || 3042}/`;

app.use(createProxyMiddleware('/sitecore', { target: proxyUrl }));
app.use(createProxyMiddleware('/data/media', { target: proxyUrl }));
//   } else {
//     // when in connected mode we want to proxy Sitecore paths
//     // off to Sitecore

//     app.use(createProxyMiddleware('/sitecore', { target: config.sitecoreApiHost, changeOrigin: true }));
//     // media items
//     app.use(createProxyMiddleware('/-', { target: config.sitecoreApiHost, changeOrigin: true }));
//     // visitor identification
//     app.use(createProxyMiddleware('/layouts', { target: config.sitecoreApiHost, changeOrigin: true }));
// }

// app.all('/getJSON', (req, res) => {
//   res.json({ data: 'data' })
// })

export default app;
