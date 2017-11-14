import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/components/App';
import DataProvider from 'data-provider';

const render = (sitecoreState) => {
    const rootElement = document.getElementById('wizard-app');
    ReactDOM.render(<App sitecoreState={sitecoreState} />, rootElement);
}

if (window.__data) {
    render(window.__data);
} else {
    DataProvider.getRouteData(__INITIAL_ROUTE__, 'en').then((sitecoreState) => {
        render(sitecoreState);
    });
}

