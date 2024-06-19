[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [editing](../modules/editing.md) / GraphQLEditingService

# Class: GraphQLEditingService

[editing](../modules/editing.md).GraphQLEditingService

Service for fetching editing data from Sitecore using the Sitecore's GraphQL API.
Expected to be used in XMCloud Pages preview (editing) Metadata Edit Mode.

## Table of contents

### Constructors

- [constructor](editing.GraphQLEditingService.md#constructor)

### Properties

- [graphQLClient](editing.GraphQLEditingService.md#graphqlclient)
- [serviceConfig](editing.GraphQLEditingService.md#serviceconfig)

### Methods

- [fetchEditingData](editing.GraphQLEditingService.md#fetcheditingdata)
- [getGraphQLClient](editing.GraphQLEditingService.md#getgraphqlclient)

## Constructors

### constructor

• **new GraphQLEditingService**(`serviceConfig`)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serviceConfig` | `GraphQLEditingServiceConfig` | configuration |

#### Defined in

sitecore-jss/types/editing/graphql-editing-service.d.ts:56

## Properties

### graphQLClient

• `Private` **graphQLClient**: `any`

#### Defined in

sitecore-jss/types/editing/graphql-editing-service.d.ts:51

___

### serviceConfig

• **serviceConfig**: `GraphQLEditingServiceConfig`

#### Defined in

sitecore-jss/types/editing/graphql-editing-service.d.ts:50

## Methods

### fetchEditingData

▸ **fetchEditingData**(`variables`): `Promise`\<\{ `dictionary`: [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md) ; `layoutData`: [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md)  }\>

Fetches editing data. Provides the layout data and dictionary phrases

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `variables` | `Object` | The parameters for fetching editing data. |
| `variables.itemId` | `string` | The item id (path) to fetch layout data for. |
| `variables.language` | `string` | The language to fetch layout data for. |
| `variables.siteName` | `string` | The site name. |
| `variables.version` | `string` | The version of the item . |

#### Returns

`Promise`\<\{ `dictionary`: [`DictionaryPhrases`](../interfaces/index.DictionaryPhrases.md) ; `layoutData`: [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md)  }\>

The layout data and dictionary phrases.

#### Defined in

sitecore-jss/types/editing/graphql-editing-service.d.ts:66

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): `GraphQLClient`

Gets a GraphQL client that can make requests to the API.

#### Returns

`GraphQLClient`

implementation

#### Defined in

sitecore-jss/types/editing/graphql-editing-service.d.ts:79
