---
name: dictionaryservice
routeTemplate: ./data/component-templates/article.yml
title: dictionaryservice
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / [i18n/dictionary-service](/docs/fundamentals/ref/jss/modules/i18n_dictionary_service) / DictionaryService

# Interface: DictionaryService

[i18n/dictionary-service](/docs/fundamentals/ref/jss/modules/i18n_dictionary_service).DictionaryService

Service that fetches dictionary data using Sitecore's GraphQL API.

## Implemented by

- [`DictionaryServiceBase`](/docs/fundamentals/ref/jss/classes/i18n_dictionary_service/dictionaryservicebase)

## Table of contents

### Methods

- [fetchDictionaryData](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryservice#fetchdictionarydata)

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`DictionaryPhrases`](/docs/fundamentals/ref/jss/interfaces/i18n_dictionary_service/dictionaryphrases)\>
