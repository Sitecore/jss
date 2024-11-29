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

[packages/sitecore-jss/src/i18n/dictionary-service.ts:18](https://github.com/Sitecore/jss/blob/ae0d0d6db6f1c053f20f849b7fb170d97fae8446/packages/sitecore-jss/src/i18n/dictionary-service.ts#L18)
