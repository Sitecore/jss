import React from 'react';
import ReactDOM from 'react-dom/server';
import App from 'app/components/App';
import Html from 'app/components/Html';
import { convertRawLayoutData } from '@sitecore-jss/sitecore-jss-react';

const renderView = (callback, path, data, viewBag) => {
    const parsedData = data instanceof Object ? data : JSON.parse(data);
    const state = convertRawLayoutData(parsedData);
    const component = (
        <App sitecoreState={state} />
    );
    const result = {
        stauts: 200,
        html: ReactDOM.renderToString(<Html component={component} initialState={state} distPath={__BUNDLE_OUTPUT_PATH__} />)
    };
    callback(null, result);
}

export { renderView };