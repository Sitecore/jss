import React from 'react';

// Component that renders the HTML shell around the application
// when rendering on a Node server (SSR) or using disconnected mode

const ServerHtml = ({ content, initialState, initialGraphQLState, distPath }) => (
  <html>
    <head>
      <title>JSS GraphQL App</title>
      {/* enable if you require CSS from npm packages <link rel="stylesheet" href={`${distPath}vendor-client.css`} /> */}
      <link rel="stylesheet" href={`${distPath}client.css`} />
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
      {initialGraphQLState && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(initialGraphQLState)};`,
          }}
        />
      )}
      <script src={`${distPath}vendor-client.bundle.js`} />
      <script src={`${distPath}client.bundle.js`} />
    </body>
  </html>
);

export default ServerHtml;
