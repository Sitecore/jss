import React from 'react';
import ReactDOM from 'react-dom/server';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// Component that renders the HTML shell around the application
// when rendering on a Node server (SSR)
// See internals/build/templates/index.html for HTML when using webpack-dev-server

const ServerHtml = ({ component, initialState, distPath }) => {
  const content = component ? ReactDOM.renderToString(component) : '';
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        <link rel="stylesheet" href={`${distPath}vendor-client.css`} />
        <link rel="stylesheet" href={`${distPath}client.css`} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic" />
      </head>
      <body style={{ height: '100%' }}>
        <div id="app" style={{ height: '100%' }} dangerouslySetInnerHTML={{ __html: content }} />
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
  distPath: PropTypes.string,
};

export default ServerHtml;
