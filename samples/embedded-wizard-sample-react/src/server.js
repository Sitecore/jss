import React from 'react';
import ReactDOM from 'react-dom/server';
import App from 'app/components/App';
import ServerHtml from 'app/components/ServerHtml';
import { convertRawLayoutData } from '@sitecore-jss/sitecore-jss-react';

/*
  Main entry point to the application when run on a Node server.
  The renderView() function will be invoked by Sitecore's view engine
  to provide the data to render with.
*/

const renderView = (callback, path, data, viewBag) => {
    const parsedData = data instanceof Object ? data : JSON.parse(data);
    const state = convertRawLayoutData(parsedData);
    const component = (
        <App sitecoreState={state} />
    );
    const result = {
        stauts: 200,
        html: ReactDOM.renderToString(<ServerHtml component={component} initialState={state} distPath={__BUNDLE_OUTPUT_PATH__} />)
    };
    callback(null, result);
}

export { renderView };