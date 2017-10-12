import React from 'react';
import ReactDOM from 'react-dom/server';
import PropTypes from 'prop-types';

const Html = ({ component, initialState, distPath }) => {
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

Html.propTypes = {
  component: PropTypes.node,
  initialState: PropTypes.object,
}

export default Html;