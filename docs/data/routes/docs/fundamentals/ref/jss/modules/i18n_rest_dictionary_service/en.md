---
name: i18n_rest_dictionary_service
routeTemplate: ./data/component-templates/article.yml
title: i18n_rest_dictionary_service
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / i18n/rest-dictionary-service

# Module: i18n/rest-dictionary-service

## Table of contents

### Classes

- [RestDictionaryService](/docs/fundamentals/ref/jss/classes/i18n_rest_dictionary_service/restdictionaryservice)

### Type aliases

- [RestDictionaryServiceConfig](/docs/fundamentals/ref/jss/modules/i18n_rest_dictionary_service#restdictionaryserviceconfig)
- [RestDictionaryServiceData](/docs/fundamentals/ref/jss/modules/i18n_rest_dictionary_service#restdictionaryservicedata)

## Type aliases

### RestDictionaryServiceConfig

Ƭ **RestDictionaryServiceConfig**: [`CacheOptions`](/docs/fundamentals/ref/jss/interfaces/cache_client/cacheoptions) & { `apiHost`: `string` ; `apiKey`: `string` ; `dataFetcher?`: [`HttpDataFetcher`](/docs/fundamentals/ref/jss/modules/data_fetcher#httpdatafetcher)<[`RestDictionaryServiceData`](/docs/fundamentals/ref/jss/modules/i18n_rest_dictionary_service#restdictionaryservicedata)\> ; `siteName`: `string`  }

___

### RestDictionaryServiceData

Ƭ **RestDictionaryServiceData**: `Object`

A reply from the REST Sitecore Dictionary Service

#### Type declaration

| Name | Type |
| :------ | :------ |
| `phrases` | [`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases) |
