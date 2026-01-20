[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / GraphQLEditingService

# Class: GraphQLEditingService

Defined in: [packages/sitecore-jss/src/editing/graphql-editing-service.ts:110](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L110)

Service for fetching editing data from Sitecore using the Sitecore's GraphQL API.
Expected to be used in XMCloud Pages preview (editing) Metadata Edit Mode.

## Constructors

### Constructor

> **new GraphQLEditingService**(`serviceConfig`): `GraphQLEditingService`

Defined in: [packages/sitecore-jss/src/editing/graphql-editing-service.ts:117](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L117)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `serviceConfig` | `GraphQLEditingServiceConfig` | configuration |

#### Returns

`GraphQLEditingService`

## Properties

### serviceConfig

> **serviceConfig**: `GraphQLEditingServiceConfig`

Defined in: [packages/sitecore-jss/src/editing/graphql-editing-service.ts:117](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L117)

configuration

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`__namedParameters`, `initDictionary`, `hasNext`, `after?`): `Promise`\<[`DictionaryPhrases`](../../i18n/interfaces/DictionaryPhrases.md)\>

Defined in: [packages/sitecore-jss/src/editing/graphql-editing-service.ts:205](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L205)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `__namedParameters` | \{ `language`: `string`; `siteName`: `string`; \} | `undefined` |
| `__namedParameters.language` | `string` | `undefined` |
| `__namedParameters.siteName` | `string` | `undefined` |
| `initDictionary` | `object`[] | `[]` |
| `hasNext?` | `boolean` | `true` |
| `after?` | `string` | `undefined` |

#### Returns

`Promise`\<[`DictionaryPhrases`](../../i18n/interfaces/DictionaryPhrases.md)\>

***

### fetchEditingData()

> **fetchEditingData**(`variables`): `Promise`\<\{ `dictionary`: [`DictionaryPhrases`](../../i18n/interfaces/DictionaryPhrases.md); `layoutData`: [`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md); \}\>

Defined in: [packages/sitecore-jss/src/editing/graphql-editing-service.ts:132](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L132)

Fetches editing data. Provides the layout data and dictionary phrases

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `variables` | `EditingOptions` | The parameters for fetching editing data. |

#### Returns

`Promise`\<\{ `dictionary`: [`DictionaryPhrases`](../../i18n/interfaces/DictionaryPhrases.md); `layoutData`: [`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md); \}\>

The layout data and dictionary phrases.

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Defined in: [packages/sitecore-jss/src/editing/graphql-editing-service.ts:248](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L248)

Gets a GraphQL client that can make requests to the API.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation
