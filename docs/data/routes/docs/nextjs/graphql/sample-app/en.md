---
name: sample-app
routeTemplate: ./data/component-templates/article.yml
title: Sitecore GraphQL in the sample app
---
# Sitecore GraphQL in the sample app

## Disconnected mode

If you created the app using `jss create my-app nextjs --fetchWith GraphQL`, your services will use the Sitecore GraphQL endpoint. 

Sitecore GraphQL does not come with a disconnected mock service, so it can only operate with a Next.js app in Connected mode. The disconnected server emulates the REST services only.

Therefore, your service factories must return a REST service if you need to work in disconnected mode.

To return a REST service for disconnected development from your service factories, leverage the `JSS_MODE` environment variable, as follows:

1. Edit `src/lib/layout-service-factory.ts`:

```js
import {
  LayoutService,
  GraphQLLayoutService,
  RestLayoutService,
  JSS_MODE_DISCONNECTED,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class LayoutServiceFactory {
  create(): LayoutService {
    // Switch to REST endpoint if we are in disconnected mode
    if (process.env.JSS_MODE === JSS_MODE_DISCONNECTED) {
      return new RestLayoutService({
        apiHost: `http://localhost:${process.env.PROXY_PORT || 3042}`,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
      });
    }

    return new GraphQLLayoutService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
```

2. Edit `src/lib/dictionary-service-factory.ts`:
```js
import {
  DictionaryService,
  RestDictionaryService,
  GraphQLDictionaryService,
  JSS_MODE_DISCONNECTED,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class DictionaryServiceFactory {
  create(): DictionaryService {
    // Switch to REST endpoint if we are in disconnected mode
    if (process.env.JSS_MODE === JSS_MODE_DISCONNECTED) {
      return new RestDictionaryService({
        apiHost: `http://localhost:${process.env.PROXY_PORT || 3042}`,
        apiKey: config.sitecoreApiKey,
        siteName: config.jssAppName,
      });
    }

    return new GraphQLDictionaryService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
```


export const dictionaryServiceFactory = new DictionaryServiceFactory();
```
