[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / DictionaryService

# Interface: DictionaryService

[index](../modules/index.md).DictionaryService

Service that fetches dictionary data using Sitecore's GraphQL API.

## Table of contents

### Methods

- [fetchDictionaryData](index.DictionaryService.md#fetchdictionarydata)

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](index.DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`Promise`<[`DictionaryPhrases`](index.DictionaryPhrases.md)\>

#### Defined in

sitecore-jss/types/i18n/dictionary-service.d.ts:16
