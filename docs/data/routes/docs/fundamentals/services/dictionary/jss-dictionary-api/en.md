---
name: jss-dictionary-api
routeTemplate: ./data/component-templates/article.yml
title: JSS Dictionary API
---

# Invoking the Dictionary Service from JSS

The Sitecore JSS SDK provides a simple API to make utilizing the Dictionary Service easier. Create instance of `DictionaryService` class and enter configuration:

```javascript
import { DictionaryService } from '@sitecore-jss/sitecore-jss';
import config from './config';

const dictionaryService = new DictionaryService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
});
```
The `DictionaryServiceConfig` type is found in the `@sitecore-jss\sitecore-jss` package. `DictionaryService` contains caching enabled by default.

The `dataFetcher` option enables you to implement whichever data access method you wish. JSS ships with `axios`, which can be imported from `src\data-fetcher.js`.
```javascript
import { AxiosResponse } from 'axios';
import { 
  AxiosDataFetcher,
  DictionaryService,
  DictionaryServiceData
} from '@sitecore-jss/sitecore-jss';
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

If you'd like to learn more about other translation techniques with JSS, see [Content Translation](/docs/techniques/content-translation).