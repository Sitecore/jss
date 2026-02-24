[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [editing](../README.md) / GraphQLEditingService

# Class: GraphQLEditingService

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:58

Service for fetching editing data from Sitecore using the Sitecore's GraphQL API.
Expected to be used in XMCloud Pages preview (editing) Metadata Edit Mode.

## Constructors

### Constructor

> **new GraphQLEditingService**(`serviceConfig`): `GraphQLEditingService`

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:65

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

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:59

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`__namedParameters`, `initDictionary?`, `hasNext?`, `after?`): `Promise`\<[`DictionaryPhrases`](../../index/interfaces/DictionaryPhrases.md)\>

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:81

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

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:77

Fetches editing data. Provides the layout data and dictionary phrases

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `variables` | `EditingOptions` | The parameters for fetching editing data. |

#### Returns

`Promise`\<\{ `dictionary`: [`DictionaryPhrases`](../../index/interfaces/DictionaryPhrases.md); `layoutData`: [`LayoutServiceData`](../../index/interfaces/LayoutServiceData.md); \}\>

The layout data and dictionary phrases.

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): `GraphQLClient`

Defined in: sitecore-jss/types/editing/graphql-editing-service.d.ts:92

Gets a GraphQL client that can make requests to the API.

#### Returns

`GraphQLClient`

implementation
