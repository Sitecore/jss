import React from "react";
import ReactDOM from "react-dom/server";

// Component that renders the HTML shell around the application
// when rendering on a Node server (SSR)
// See internals/build/templates/index.html for HTML when using webpack-dev-server

const ServerHtml = ({
  content,
  initialState,
  initialGraphQLState,
  distPath
}) => {
  return (
    <html>
      <head>
        <title>JSS GraphQL App</title>
        <link rel="stylesheet" href={`${distPath}client.css`} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        {initialState && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__data=${JSON.stringify(initialState)};`
            }}
          />
        )}
        {initialGraphQLState && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(
                initialGraphQLState
              )};`
            }}
          />
        )}
        <script src={`${distPath}vendor-client.bundle.js`} />
        <script src={`${distPath}client.bundle.js`} />
      </body>
    </html>
  );
};

export default ServerHtml;
