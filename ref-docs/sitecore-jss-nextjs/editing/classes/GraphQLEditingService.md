[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / GraphQLEditingService

# Class: GraphQLEditingService

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:50

Service for fetching editing data from Sitecore using the Sitecore's GraphQL API.
Expected to be used in XMCloud Pages preview (editing) Metadata Edit Mode.

## Constructors

### Constructor

> **new GraphQLEditingService**(`serviceConfig`): `GraphQLEditingService`

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:57

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

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:51

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`__namedParameters`, `initDictionary?`, `hasNext?`, `after?`): `Promise`\<[`DictionaryPhrases`](../../index/interfaces/DictionaryPhrases.md)\>

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:78

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | \{ `language`: `string`; `siteName`: `string`; \} |
| `__namedParameters.language` | `string` |
| `__namedParameters.siteName?` | `string` |
| `initDictionary?` | `object`[] |
| `hasNext?` | `boolean` |
| `after?` | `string` |

#### Returns

`Promise`\<[`DictionaryPhrases`](../../index/interfaces/DictionaryPhrases.md)\>

***

### fetchEditingData()

> **fetchEditingData**(`variables`): `Promise`\<\{ `dictionary`: [`DictionaryPhrases`](../../index/interfaces/DictionaryPhrases.md); `layoutData`: [`LayoutServiceData`](../../index/interfaces/LayoutServiceData.md); \}\>

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:68

Fetches editing data. Provides the layout data and dictionary phrases

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `variables` | \{ `itemId`: `string`; `language`: `string`; `layoutKind?`: `LayoutKind`; `siteName`: `string`; `version?`: `string`; \} | The parameters for fetching editing data. |
| `variables.itemId` | `string` | The item id (path) to fetch layout data for. |
| `variables.language` | `string` | The language to fetch layout data for. |
| `variables.layoutKind?` | `LayoutKind` | The final or shared layout variant. |
| `variables.siteName` | `string` | The site name. |
| `variables.version?` | `string` | The version of the item (optional). |

#### Returns

`Promise`\<\{ `dictionary`: [`DictionaryPhrases`](../../index/interfaces/DictionaryPhrases.md); `layoutData`: [`LayoutServiceData`](../../index/interfaces/LayoutServiceData.md); \}\>

The layout data and dictionary phrases.

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:89

Gets a GraphQL client that can make requests to the API.

#### Returns

`GraphQLClient`

implementation
