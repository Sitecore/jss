[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / DictionaryService

# Interface: DictionaryService

Service that fetches dictionary data using Sitecore's GraphQL API.

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](DictionaryPhrases.md)\>

Fetch dictionary data for a language.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`Promise`\<[`DictionaryPhrases`](DictionaryPhrases.md)\>

#### Defined in

[packages/sitecore-jss/src/i18n/dictionary-service.ts:18](https://github.com/Sitecore/jss/blob/531ca5258d6dfbf961581d71604d062cf234a220/packages/sitecore-jss/src/i18n/dictionary-service.ts#L18)
