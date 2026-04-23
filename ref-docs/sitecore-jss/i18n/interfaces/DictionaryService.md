[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [i18n](../README.md) / DictionaryService

# Interface: DictionaryService

Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:13](https://github.com/Sitecore/jss/blob/d119e142e3e94c58bf97a5a3f62d6b085e7e6962/packages/sitecore-jss/src/i18n/dictionary-service.ts#L13)

Service that fetches dictionary data using Sitecore's GraphQL API.

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`language`): `Promise`\<[`DictionaryPhrases`](DictionaryPhrases.md)\>

Defined in: [packages/sitecore-jss/src/i18n/dictionary-service.ts:18](https://github.com/Sitecore/jss/blob/d119e142e3e94c58bf97a5a3f62d6b085e7e6962/packages/sitecore-jss/src/i18n/dictionary-service.ts#L18)

Fetch dictionary data for a language.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `language` | `string` | the language to be used to fetch the dictionary |

#### Returns

`Promise`\<[`DictionaryPhrases`](DictionaryPhrases.md)\>
