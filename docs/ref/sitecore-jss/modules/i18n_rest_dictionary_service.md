[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / i18n/rest-dictionary-service

# Module: i18n/rest-dictionary-service

## Table of contents

### Classes

- [RestDictionaryService](../classes/i18n_rest_dictionary_service.RestDictionaryService.md)

### Type aliases

- [RestDictionaryServiceConfig](i18n_rest_dictionary_service.md#restdictionaryserviceconfig)
- [RestDictionaryServiceData](i18n_rest_dictionary_service.md#restdictionaryservicedata)

## Type aliases

### RestDictionaryServiceConfig

Ƭ **RestDictionaryServiceConfig**: [`CacheOptions`](../interfaces/cache_client.CacheOptions.md) & { `apiHost`: `string` ; `apiKey`: `string` ; `dataFetcher?`: [`HttpDataFetcher`](data_fetcher.md#httpdatafetcher)<[`RestDictionaryServiceData`](i18n_rest_dictionary_service.md#restdictionaryservicedata)\> ; `siteName`: `string`  }

#### Defined in

[i18n/rest-dictionary-service.ts:14](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L14)

___

### RestDictionaryServiceData

Ƭ **RestDictionaryServiceData**: `Object`

A reply from the REST Sitecore Dictionary Service

#### Type declaration

| Name | Type |
| :------ | :------ |
| `phrases` | [`DictionaryPhrases`](../interfaces/i18n_dictionary_service.DictionaryPhrases.md) |

#### Defined in

[i18n/rest-dictionary-service.ts:10](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L10)
