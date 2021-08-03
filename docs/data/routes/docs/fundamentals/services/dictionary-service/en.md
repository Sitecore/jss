---
name: dictionary-service
routeTemplate: ./data/component-templates/article.yml
title: Dictionary Service
---

# Dictionary Service

Often multilingual apps will need a dictionary of static phrases that require translation. Commonly this would be items such as form labels, global navigation items, footers, etc. Sitecore JSS provides an additional REST endpoint for retrieving an app-specific translation dictionary, backed by a Sitecore feature called *Dictionary Domains*. The URL format for this API is:

`/sitecore/api/jss/dictionary/<app>/<language>/`

For example:
http://JssReactWeb/sitecore/api/jss/dictionary/JssReactWeb/es-MX/

```json
{
    "lang": "es-MX",
    "app": "JssReactWeb",
    "phrases": {
        "Copyright": "{{year}} Inicio Bootstrap",
        "Home": "Inicio",
        "Start Bootstrap": "Inicio Bootstrap"
    }
}
```

It's up to you how you invoke and utilize this data. For example, the React App utilizes the `i18next` module with [custom plugin](https://www.i18next.com/misc/creating-own-plugins).

> Note for Sitecore devs and admins: By default all JSS apps have a dictionary domain configured for the app. You can alter the app's dictionary domain in the [App configuration](/docs/techniques/content-translation).

## Invoking the Dictionary Service from JSS

The Sitecore JSS SDK provides a simple API to make utilizing the Dictionary Service easier. Create instance of `DictionaryService` class and enter configuration:
```javascript
import { DictionaryService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from './config';

const dictionaryService = new DictionaryService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
});
```
The `DictionaryServiceConfig` type is found in the `@sitecore-jss\sitecore-jss` package. `DictionaryService` contains caching enabled by default.

The `dataFetcher` option enables you to implement whichever data access method you wish. JSS ships with axios, which can be imported from `src\data-fetcher.js`.
```javascript
import { AxiosResponse } from 'axios';
import { 
  AxiosDataFetcher,
  DictionaryService,
  DictionaryServiceData
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

function dataFetcher(url: string, data?: unknown): Promise<AxiosResponse<DictionaryServiceData>> {
  return new AxiosDataFetcher().fetch(url, data);
}

const dictionaryService = new DictionaryService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
  dataFetcher,
});

const language = 'en';

dictionaryService.fetchDictionaryData(language).then(data => {
    console.log(JSON.stringify(data, null, 2));
});
```

If you'd like to learn more about other translation techniques with JSS, see [Content Translation](/docs/techniques/content-translation)