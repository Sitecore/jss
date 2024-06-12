[@sitecore-jss/sitecore-jss](../README.md) / [editing](../modules/editing.md) / GraphQLEditingService

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

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:97](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L97)

## Properties

### graphQLClient

• `Private` **graphQLClient**: [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:91](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L91)

___

### serviceConfig

• **serviceConfig**: `GraphQLEditingServiceConfig`

configuration

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:97](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L97)

## Methods

### fetchEditingData

▸ **fetchEditingData**(`variables`): `Promise`\<\{ `dictionary`: [`DictionaryPhrases`](../interfaces/i18n.DictionaryPhrases.md) ; `layoutData`: [`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md) = editingData.item.rendered }\>

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

`Promise`\<\{ `dictionary`: [`DictionaryPhrases`](../interfaces/i18n.DictionaryPhrases.md) ; `layoutData`: [`LayoutServiceData`](../interfaces/layout.LayoutServiceData.md) = editingData.item.rendered }\>

The layout data and dictionary phrases.

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:110](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L110)

___

### getGraphQLClient

▸ `Protected` **getGraphQLClient**(): [`GraphQLClient`](../interfaces/index.GraphQLClient.md)

Gets a GraphQL client that can make requests to the API.

#### Returns

[`GraphQLClient`](../interfaces/index.GraphQLClient.md)

implementation

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:163](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L163)
