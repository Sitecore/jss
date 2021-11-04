[Sitecore JavaScript Rendering SDK (JSS)](../README.md) / DictionaryService

# Interface: DictionaryService

Service that fetches dictionary data using Sitecore's GraphQL API.

## Implemented by

- [`DictionaryServiceBase`](../classes/DictionaryServiceBase.md)

## Table of contents

### Methods

- [fetchDictionaryData](DictionaryService.md#fetchdictionarydata)

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`DictionaryPhrases`](DictionaryPhrases.md)\>

#### Defined in

[i18n/dictionary-service.ts:18](https://github.com/Sitecore/jss/blob/release/19.0.0/packages/sitecore-jss/src/i18n/dictionary-service.ts#L18)
