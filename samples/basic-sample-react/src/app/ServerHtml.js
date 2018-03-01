import React from "react";
import ReactDOM from "react-dom/server";

// Component that renders the HTML shell around the application
// when rendering on a Node server (SSR) or using webpack-dev-server or a static build

const ServerHtml = ({ component, initialState, distPath }) => {
  const content = component ? ReactDOM.renderToString(component) : "";

  return (
    <html>
      <head>
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
        <script src={`${distPath}vendor-client.bundle.js`} />
        <script src={`${distPath}client.bundle.js`} />
      </body>
    </html>
  );
};

export default ServerHtml;
