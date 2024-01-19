[@sitecore-jss/sitecore-jss-react](../README.md) / DictionaryService

# Interface: DictionaryService

Service that fetches dictionary data using Sitecore's GraphQL API.

## Table of contents

### Methods

- [fetchDictionaryData](DictionaryService.md#fetchdictionarydata)

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`Promise`\<[`DictionaryPhrases`](DictionaryPhrases.md)\>

#### Defined in

sitecore-jss/types/i18n/dictionary-service.d.ts:16
