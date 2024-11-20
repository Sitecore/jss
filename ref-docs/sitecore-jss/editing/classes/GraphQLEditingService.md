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

• **serviceConfig**: `GraphQLEditingServiceConfig`

configuration

#### Returns

[`GraphQLEditingService`](GraphQLEditingService.md)

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:108](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L108)

## Properties

### serviceConfig

> **serviceConfig**: `GraphQLEditingServiceConfig`

configuration

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:108](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L108)

## Methods

### fetchEditingData()

> **fetchEditingData**(`variables`): `Promise`\<`object`\>

Fetches editing data. Provides the layout data and dictionary phrases

#### Parameters

• **variables**

The parameters for fetching editing data.

• **variables.itemId**: `string`

The item id (path) to fetch layout data for.

• **variables.language**: `string`

The language to fetch layout data for.

• **variables.layoutKind?**: [`LayoutKind`](../enumerations/LayoutKind.md) = `LayoutKind.Final`

The final or shared layout variant.

• **variables.siteName**: `string`

The site name.

• **variables.version?**: `string`

The version of the item (optional).

#### Returns

`Promise`\<`object`\>

The layout data and dictionary phrases.

##### dictionary

> **dictionary**: [`DictionaryPhrases`](../../i18n/interfaces/DictionaryPhrases.md)

##### layoutData

> **layoutData**: [`LayoutServiceData`](../../layout/interfaces/LayoutServiceData.md)

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:122](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L122)

***

### getGraphQLClient()

> `protected` **getGraphQLClient**(): [`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

Gets a GraphQL client that can make requests to the API.

#### Returns

[`GraphQLClient`](../../index/interfaces/GraphQLClient.md)

implementation

#### Defined in

[packages/sitecore-jss/src/editing/graphql-editing-service.ts:216](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/editing/graphql-editing-service.ts#L216)