[Sitecore JavaScript Rendering SDK](../README.md) / [i18n/dictionary-service](../modules/i18n_dictionary_service.md) / DictionaryService

# Interface: DictionaryService

[i18n/dictionary-service](../modules/i18n_dictionary_service.md).DictionaryService

Service that fetches dictionary data using Sitecore's GraphQL API.

## Implemented by

- [`DictionaryServiceBase`](../classes/i18n_dictionary_service.DictionaryServiceBase.md)

## Table of contents

### Methods

- [fetchDictionaryData](i18n_dictionary_service.DictionaryService.md#fetchdictionarydata)

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](i18n_dictionary_service.DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`DictionaryPhrases`](i18n_dictionary_service.DictionaryPhrases.md)\>

#### Defined in

[i18n/dictionary-service.ts:18](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/i18n/dictionary-service.ts#L18)
