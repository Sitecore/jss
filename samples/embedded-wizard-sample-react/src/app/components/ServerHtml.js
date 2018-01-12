import React from 'react';
import ReactDOM from 'react-dom/server';

// Component that renders the HTML shell around the application
// when rendering on a Node server (SSR)
// See internals/build/templates/index.html for HTML when using webpack-dev-server

const ServerHtml = ({ component, initialState, distPath }) => {
    const content = component ? ReactDOM.renderToString(component) : '';

    return (
        <html>
        <head>
            <title>Embedded Wizard</title>
            <link rel="stylesheet" href={`${distPath}/client.css`} type="text/css" />
        </head>

        <body id="page-top">
            <div id="wizard-app" dangerouslySetInnerHTML={{ __html: content }} />
            <script dangerouslySetInnerHTML={{ __html: `window.__data=${JSON.stringify(initialState)};` }} />
            <script src={`${distPath}vendor-client.bundle.js`}></script>
            <script src={`${distPath}client.bundle.js`}></script>
        </body>
        </html>
    );
}

export default ServerHtml;