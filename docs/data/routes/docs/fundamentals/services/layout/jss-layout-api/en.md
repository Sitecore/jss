---
name: jss-layout-api
routeTemplate: ./data/component-templates/article.yml
title: JSS Layout API
---
# JSS Layout API

The JSS Layout API is a suite of services, clients and data fetchers that facilitate retrieving Sitecore layout data from Sitecore REST and/or GraphQL endpoints.

## Invoking the REST Layout Service from JSS apps

Sitecore JSS provides a simple API to make utilizing the [Sitecore Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service) easier. 

The following examples show you how to retrieve layout data from your Sitecore instance using the REST and GraphQL. 

> For all the examples below, we assume you will create the files in the root directory of the application and that you have a `config.js` file in that same directory. Adjust the `import` statements as necessary to reflect your project's setup.

## Fetching layout data with GraphQL

You can fetch layout data from Sitecore using GraphQL and the JSS `GraphQLLayoutService`. 

1. In a file `layout-service.ts`, create and configure an instance of the `GraphQLLayoutService`: 

```javascript
import {GraphQLLayoutService} from '@sitecore-jss/sitecore-jss';
import config from './config';

export const layoutService = new GraphQLLayoutService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName
})
```

2. In the file where you want to fetch the data, import and use your new layout service instance: 

```javascript
import { layoutService } from './layout-service';
const language = 'en';
layoutService.fetchLayoutData(language).then(data => {
    // do something with the data
});
```

> TIP: You can pass a `formatLayoutQuery` option to your GraphQLLayoutService instance to override the default query. See the [`GraphQLLayoutServiceConfig`](https://github.com/Sitecore/jss/blob/release/18.0.0/packages/sitecore-jss/src/layout/graphql-layout-service.ts) type for details. 

## Fetching layout data with REST

To invoke the REST Layout Service from a JSS application: 

1. In a file `layout-service.ts`, create an instance of the `RestLayoutService` class and provide the configuration object:

```javascript
import { RestLayoutService } from '@sitecore-jss/sitecore-jss';
import config from './config';

export const layoutService = new RestLayoutService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
  // tracking: false // if you wish to disable tracking
});
```
2. In the file where you want to fetch the data, import and use your new layout service instance: 

```javascript
import { layoutService } from './layout-service';

const language = 'en';
const sitecoreRoutePath = '/styleguide';

layoutService.fetchLayoutData(sitecoreRoutePath, language).then(data => {
     // do something with the data
});
```

### Using a custom data fetcher

The `RestLayoutServiceConfig` type accepts a `dataFetcherResolver` property. You can use this property to pass a custom data fetcher to your instance of the Layout Service. By default, the JSS REST Layout service uses `axios`.

To use a REST layout service with a custom data fetcher: 

1. In a file `layout-service.ts`, create an instance of the `RestLayoutService` class and provide the configuration object:

```typescript
import { AxiosResponse } from 'axios';
import { 
  AxiosDataFetcher,
  RestLayoutService,
  LayoutServiceData
} from '@sitecore-jss/sitecore-jss';
import config from './config';

// define your custom data fetcher
function dataFetcher(url: string, data?: unknown): Promise<AxiosResponse<LayoutServiceData>> {
  return new AxiosDataFetcher().fetch(url, data);
}

export const layoutService = new RestLayoutService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
  tracking: false, // if you wish to disable tracking
  // provide your custom data fetcher to the service instance
  dataFetcherResolver: () => dataFetcher
});
```

2. Import and use the new layout service:  

```javascript
import { layoutService } from './layout-service';

const language = 'en';
const sitecoreRoutePath = '/styleguide';

layoutService.fetchLayoutData(sitecoreRoutePath, language).then(data => {
     // do something with the data
});
```