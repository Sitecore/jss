import React from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';

// Component that renders the HTML shell around the application
// when rendering on a Node server (SSR) or using webpack-dev-server or a static build

const ServerHtml = ({ component, initialState, distPath }) => {
  const content = component ? ReactDOM.renderToString(component) : '';

  const helmet = Helmet.renderStatic();

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={`${distPath}server.css`} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
        />
        <link rel="stylesheet" href={`${distPath}client.css`} />
        <link rel="icon" type="image/png" href="/assets/img/favicon-32x32.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Sitecore JavaScript Services Documentation" />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        {initialState && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__data=${JSON.stringify(initialState)};`,
            }}
          />
        )}
        <script src={`${distPath}vendor-client.bundle.js`} />
        <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js" />
        <script src={`${distPath}client.bundle.js`} />
      </body>
    </html>
  );
};

export default ServerHtml;
