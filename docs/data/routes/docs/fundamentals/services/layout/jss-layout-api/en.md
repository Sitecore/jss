---
name: jss-layout-api
routeTemplate: ./data/component-templates/article.yml
title: JSS Layout API
---
# JSS Layout API

The JSS Layout API is a suite of services, clients and data fetchers that facilitate retrieving Sitecore layout data from Sitecore REST and/or GraphQL endpoints.

## Invoking the Layout Service from JSS

The Sitecore JSS SDK provides a simple API to make utilizing the Layout Service easier. Enter your configuration into the `fetchOptions` object and pass it into `dataApi.fetchRouteData()`. The `fetcher` option enables you to implement whichever data access method you wish. JSS ships with Axios, which can be imported from `src\dataFetcher.js`.

The `dataApi` object is found in the `@sitecore-jss\sitecore-jss` package but is also exposed via the framework-specific SDKs.

```javascript
import { dataApi } from '@sitecore-jss/sitecore-jss-react';
import { dataFetcher } from './dataFetcher'; 

const fetchOptions = {
    fetcher: dataFetcher, 
    layoutServiceConfig: {
        host: 'http://mysitecore',
        configurationName: 'jss',
    },
    querystringParams: {
        sc_lang: 'en',
        tracking: false,
        sc_apikey: '{00000000-0000-0000-0000-000000000000}',
        sc_camp: 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
    },
    requestConfig: { 
        // AxiosRequestConfig -- https://github.com/axios/axios#request-config
        // Note: `withCredentials: true` is added automatically
        timeout: 3000,
        headers: {
            'X-JSS': 'Experience is asynchronous.'
        }
    },
}

dataApi.fetchRouteData('/', fetchOptions).then(route => {
    console.log(JSON.stringify(route, null, 2));
});
```