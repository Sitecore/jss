[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / GraphQLEditingService

# Class: GraphQLEditingService

Service for fetching editing data from Sitecore using the Sitecore's GraphQL API.
Expected to be used in XMCloud Pages preview (editing) Metadata Edit Mode.

## Constructors

### new GraphQLEditingService()

> **new GraphQLEditingService**(`serviceConfig`): [`GraphQLEditingService`](GraphQLEditingService.md)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `serviceConfig` | `GraphQLEditingServiceConfig` | configuration |

#### Returns

[`GraphQLEditingService`](GraphQLEditingService.md)

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:108](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L108)

## Properties

### serviceConfig

> **serviceConfig**: `GraphQLEditingServiceConfig`

configuration

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:108](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L108)

## Methods

### fetchDictionaryData()

> **fetchDictionaryData**(`__namedParameters`, `initDictionary`, `hasNext`, `after`?): `Promise`\<[`DictionaryPhrases`](../../i18n/interfaces/DictionaryPhrases.md)\>

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `__namedParameters` | `object` | `undefined` |
| `__namedParameters.language` | `string` | `undefined` |
| `__namedParameters.siteName` | `string` | `undefined` |
| `initDictionary` | `object`[] | `[]` |
| `hasNext`? | `boolean` | `true` |
| `after`? | `string` | `undefined` |

#### Returns

`Promise`\<[`DictionaryPhrases`](../../i18n/interfaces/DictionaryPhrases.md)\>

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:197](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L197)

***

### fetchEditingData()

> **fetchEditingData**(`variables`): `Promise`\<`object`\>

Fetches editing data. Provides the layout data and dictionary phrases

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `variables` | `object` | The parameters for fetching editing data. |
| `variables.itemId` | `string` | The item id (path) to fetch layout data for. |
| `variables.language` | `string` | The language to fetch layout data for. |
| `variables.layoutKind`? | [`LayoutKind`](../enumerations/LayoutKind.md) | The final or shared layout variant. |
| `variables.siteName` | `string` | The site name. |
| `variables.version`? | `string` | The version of the item (optional). |

#### Returns

`Promise`\<`object`\>

The layout data and dictionary phrases.

##### dictionary

> **dictionary**: [`DictionaryPhrases`](../../i18n/interfaces/DictionaryPhrases.md)

##### layoutData

> **layoutData**: [`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:122](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L122)

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Gets a GraphQL client that can make requests to the API.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:240](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L240)
