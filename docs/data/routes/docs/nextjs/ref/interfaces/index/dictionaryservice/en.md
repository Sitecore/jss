---
name: dictionaryservice
routeTemplate: ./data/component-templates/article.yml
title: dictionaryservice
---

[Sitecore Next.js SDK](/docs/nextjs/ref/) / [index](/docs/nextjs/ref/modules/index) / DictionaryService

# Interface: DictionaryService

[index](/docs/nextjs/ref/modules/index).DictionaryService

Service that fetches dictionary data using Sitecore's GraphQL API.

## Table of contents

### Methods

- [fetchDictionaryData](/docs/nextjs/ref/interfaces/index/dictionaryservice#fetchdictionarydata)

## Methods

### fetchDictionaryData

▸ **fetchDictionaryData**(`language`): `Promise`<[`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)\>

Fetch dictionary data for a language.

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`DictionaryPhrases`](/docs/nextjs/ref/interfaces/index/dictionaryphrases)\>
