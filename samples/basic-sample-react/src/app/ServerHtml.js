import React from 'react';
import ReactDOM from 'react-dom/server';
import PropTypes from 'prop-types';

// Component that renders the HTML shell around the application
// when rendering on a Node server (SSR)
// See internals/build/templates/index.html for HTML when using webpack-dev-server

const ServerHtml = ({ component, initialState, distPath }) => {
  const content = component ? ReactDOM.renderToString(component) : '';

  return (
    <html>
      <head>
        <link rel="stylesheet" href={`${distPath}client.css`} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__data=${JSON.stringify(initialState)};` }} />
        <script src={`${distPath}vendor-client.bundle.js`} />
        <script src={`${distPath}client.bundle.js`} />
      </body>
    </html>
  );
};

ServerHtml.propTypes = {
  component: PropTypes.node,
  initialState: PropTypes.object,
}

export default ServerHtml;