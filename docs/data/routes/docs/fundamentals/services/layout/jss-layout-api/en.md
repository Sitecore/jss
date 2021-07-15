---
name: jss-layout-api
routeTemplate: ./data/component-templates/article.yml
title: JSS Layout API
---
# JSS Layout API

The JSS Layout API is a suite of services, clients and data fetchers that facilitate retrieving Sitecore layout data from Sitecore REST and/or GraphQL endpoints.

## Invoking the REST Layout Service from JSS apps

Sitecore JSS provides a simple API to make utilizing the Layout Service easier.Create instance of `RestLayoutService` and pass your configuration into the constructor and call `layoutService.fetchLayoutData()`. The optional `dataFetcherResolver` option enables you to implement whichever data access method you wish. JSS ships with Axios by default.

The `RestLayoutService` class is defined in the `@sitecore-jss\sitecore-jss` package.

```javascript
import { RestLayoutService } from '@sitecore-jss/sitecore-jss-react';
import { dataFetcher } from './dataFetcher';
export const layoutService = new RestLayoutService({
  apiHost: 'http://mysitecore',
  apiKey: '{00000000-0000-0000-0000-000000000000}',
  siteName: 'jssappname',
  tracking: false,
  dataFetcherResolver: () => dataFetcher,
});
```

```javascript
import { layoutService } from './layout-service';
const language = 'en';
const sitecoreRoutePath = '/styleguide';
layoutService.fetchLayoutData(sitecoreRoutePath, language).then((route) => {
  console.log(JSON.stringify(route, null, 2));
```

