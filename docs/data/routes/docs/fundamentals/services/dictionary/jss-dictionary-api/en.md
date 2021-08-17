---
name: jss-dictionary-api
routeTemplate: ./data/component-templates/article.yml
title: JSS Dictionary API
---

# JSS Dictionary API 

Sitecore JSS, through the core JSS NPM package `sitecore-jss`, provides a simple API to help you fetch app-specific translation dictionaries using the [Sitecore Dictionary Service](/docs/fundamentals/services/dictionary/sitecore-dictionary-service). Once you have the dictionary data, it is up to you to choose how to utilize it and what internationalization libraries you prefer. 

## Examples

The following sections provide some simplified examples to demonstrate how to use the JSS Dictionary API. If your project is based on a JSS sample application (you set it up with `jss create` or copied a sample from the [JSS repository](https://github.com/Sitecore/jss/blob/release/18.0.0/samples)), your application already handles fetching of dictionary data.

The following examples show you how to retrieve dictionary data from your Sitecore instance using the REST and GraphQL. 

> For all the examples below, we assume you will create the files in the root directory of the application and that you have a `config.js` file in that same directory. Adjust the `import` statements as necessary to reflect your project's setup.

### Fetching dictionary data with GraphQL

You can fetch dictionary data from Sitecore using GraphQL and the JSS [`GraphQLDictionaryService`](https://github.com/Sitecore/jss/blob/release/18.0.0/ref-docs/sitecore-jss/modules/i18n_graphql_dictionary_service.md). 

1. In a file `dictionary-service.ts`, create and configure an instance of the [`GraphQLDictionaryService`](https://github.com/Sitecore/jss/blob/release/18.0.0/ref-docs/sitecore-jss/classes/i18n_graphql_dictionary_service.GraphQLDictionaryService.md): 

```javascript
import {GraphQLDictionaryService} from '@sitecore-jss/sitecore-jss';
import config from './config';

export const dictionaryService = new GraphQLDictionaryService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      /*
      The Dictionary Service needs a root item ID in order to fetch dictionary phrases for the current
      app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
      otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
      rootItemId: '{GUID}'
      */
```

2. In the file where you want to fetch the data, import and use your new dictionary service instance: 

```javascript
import { dictionaryService } from './dictionary-service';
const language = 'en';
dictionaryService.fetchDictionaryData(language).then(data => {
    // do something with the data
});
```

### Fetching dictionary data with REST

To invoke the REST Dictionary Service from a JSS application, use the JSS [`RestDictionaryService`](https://github.com/Sitecore/jss/blob/release/18.0.0/ref-docs/sitecore-jss/modules/i18n_rest_dictionary_service.md): 

1. In a file `dictionary-service.ts`, create an instance of the [`RestDictionaryService` class](https://github.com/Sitecore/jss/blob/release/18.0.0/ref-docs/sitecore-jss/classes/i18n_rest_dictionary_service.RestDictionaryService.md) and provide the configuration object:

```javascript
import { RestDictionaryService } from '@sitecore-jss/sitecore-jss';
import config from './config';

export const dictionaryService = new RestDictionaryService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
});
```
2. In the file where you want to fetch the data, import and use your new dictionary service instance: 

```javascript
import { dictionaryService } from './dictionary-service';
const language = 'en';
dictionaryService.fetchDictionaryData(language).then(data => {
    // do something with the data
});
```

### Using a custom data fetcher

The [`RestDictionaryServiceConfig`](https://github.com/Sitecore/jss/blob/release/18.0.0/ref-docs/sitecore-jss/modules/i18n_rest_dictionary_service.md#restdictionaryserviceconfig) type accepts a `dataFetcher` property. You can use this property to pass a custom data fetcher to your instance of the Dictionary Service. By default, the JSS REST Dictionary service uses [`axios`](https://www.npmjs.com/package/axios).

To use a REST dictionary service with a custom data fetcher: 

1. In a file `dictionary-service.ts`, create an instance of the `RestDictionaryService` class and provide the configuration object:

```typescript
import { AxiosResponse } from 'axios';
import { 
  AxiosDataFetcher,
  RestDictionaryService,
  DictionaryServiceData
} from '@sitecore-jss/sitecore-jss';
import config from './config';

// define your custom data fetcher
function dataFetcher(url: string, data?: unknown): Promise<AxiosResponse<DictionaryServiceData>> {
  return new AxiosDataFetcher().fetch(url, data);
}

export const dictionaryService = new RestDictionaryService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
  // provide your custom data fetcher to the service instance
  dataFetcher
});
```

2. Import and use the new dictionary service:  
```javascript
import { dictionaryService } from './dictionary-service';

const language = 'en';

dictionaryService.fetchDictionaryData(language).then(data => {
     // do something with the data
});
```

### Dictionary data

The method [`fetchDictionaryData`](https://github.com/Sitecore/jss/blob/release/18.0.0/ref-docs/sitecore-jss/classes/i18n_dictionary_service.DictionaryServiceBase.md#fetchdictionarydata) returns a key-value pair map of [`dictionary phrases`](https://github.com/Sitecore/jss/blob/release/18.0.0/ref-docs/sitecore-jss/interfaces/i18n_dictionary_service.DictionaryPhrases.md).

If you'd like to learn more about other translation techniques with JSS, see [Content Translation](/docs/techniques/content-translation).
