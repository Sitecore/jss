[@sitecore-jss/sitecore-jss](../README.md) / RestDictionaryService

# Class: RestDictionaryService

Fetch dictionary data using the Sitecore Dictionary Service REST API.
Uses Axios as the default data fetcher (@see AxiosDataFetcher).

## Hierarchy

- *DictionaryServiceBase*

  ↳ **RestDictionaryService**

## Table of contents

### Constructors

- [constructor](restdictionaryservice.md#constructor)

### Properties

- [options](restdictionaryservice.md#options)

### Accessors

- [defaultFetcher](restdictionaryservice.md#defaultfetcher)

### Methods

- [fetchDictionaryData](restdictionaryservice.md#fetchdictionarydata)
- [getCacheValue](restdictionaryservice.md#getcachevalue)
- [getUrl](restdictionaryservice.md#geturl)
- [setCacheValue](restdictionaryservice.md#setcachevalue)

## Constructors

### constructor

\+ **new RestDictionaryService**(`options`: [*RestDictionaryServiceConfig*](../README.md#restdictionaryserviceconfig)): [*RestDictionaryService*](restdictionaryservice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [*RestDictionaryServiceConfig*](../README.md#restdictionaryserviceconfig) |

**Returns:** [*RestDictionaryService*](restdictionaryservice.md)

Overrides: DictionaryServiceBase.constructor

Defined in: [i18n/rest-dictionary-service.ts:44](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L44)

## Properties

### options

• **options**: [*RestDictionaryServiceConfig*](../README.md#restdictionaryserviceconfig)

Inherited from: DictionaryServiceBase.options

## Accessors

### defaultFetcher

• get **defaultFetcher**(): [*HttpDataFetcher*](../README.md#httpdatafetcher)<[*RestDictionaryServiceData*](../README.md#restdictionaryservicedata)\>

Provides default @see AxiosDataFetcher data fetcher

**Returns:** [*HttpDataFetcher*](../README.md#httpdatafetcher)<[*RestDictionaryServiceData*](../README.md#restdictionaryservicedata)\>

Defined in: [i18n/rest-dictionary-service.ts:41](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L41)

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`: *string*): *Promise*<[*DictionaryPhrases*](../interfaces/dictionaryphrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | *string* |

**Returns:** *Promise*<[*DictionaryPhrases*](../interfaces/dictionaryphrases.md)\>

Overrides: DictionaryServiceBase.fetchDictionaryData

Defined in: [i18n/rest-dictionary-service.ts:54](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L54)

___

### getCacheValue

▸ `Protected` **getCacheValue**(`key`: *string*): ``null`` \| [*DictionaryPhrases*](../interfaces/dictionaryphrases.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | *string* |

**Returns:** ``null`` \| [*DictionaryPhrases*](../interfaces/dictionaryphrases.md)

Inherited from: DictionaryServiceBase.getCacheValue

Defined in: [i18n/dictionary-service.ts:55](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/dictionary-service.ts#L55)

___

### getUrl

▸ `Private` **getUrl**(`language`: *string*): *string*

Generate dictionary service url

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | *string* |

**Returns:** *string*

Defined in: [i18n/rest-dictionary-service.ts:75](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/rest-dictionary-service.ts#L75)

___

### setCacheValue

▸ `Protected` **setCacheValue**(`key`: *string*, `value`: [*DictionaryPhrases*](../interfaces/dictionaryphrases.md)): [*DictionaryPhrases*](../interfaces/dictionaryphrases.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | *string* |
| `value` | [*DictionaryPhrases*](../interfaces/dictionaryphrases.md) |

**Returns:** [*DictionaryPhrases*](../interfaces/dictionaryphrases.md)

Inherited from: DictionaryServiceBase.setCacheValue

Defined in: [i18n/dictionary-service.ts:59](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/i18n/dictionary-service.ts#L59)
