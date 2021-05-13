[@sitecore-jss/sitecore-jss](../README.md) / GraphQLLayoutService

# Class: GraphQLLayoutService

## Hierarchy

- *LayoutServiceBase*

  ↳ **GraphQLLayoutService**

## Table of contents

### Constructors

- [constructor](graphqllayoutservice.md#constructor)

### Methods

- [createClient](graphqllayoutservice.md#createclient)
- [fetchLayoutData](graphqllayoutservice.md#fetchlayoutdata)
- [getLayoutQuery](graphqllayoutservice.md#getlayoutquery)

## Constructors

### constructor

\+ **new GraphQLLayoutService**(`serviceConfig`: [*GraphQLLayoutServiceConfig*](../README.md#graphqllayoutserviceconfig)): [*GraphQLLayoutService*](graphqllayoutservice.md)

Fetch layout data using the Sitecore GraphQL endpoint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceConfig` | [*GraphQLLayoutServiceConfig*](../README.md#graphqllayoutserviceconfig) |

**Returns:** [*GraphQLLayoutService*](graphqllayoutservice.md)

Overrides: LayoutServiceBase.constructor

Defined in: [layout/graphql-layout-service.ts:33](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L33)

## Methods

### createClient

▸ `Private` **createClient**(): [*GraphQLRequestClient*](graphqlrequestclient.md)

Returns new graphql client instance

**Returns:** [*GraphQLRequestClient*](graphqlrequestclient.md)

Defined in: [layout/graphql-layout-service.ts:72](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L72)

___

### fetchLayoutData

▸ **fetchLayoutData**(`itemPath`: *string*, `language?`: *string*): *Promise*<[*LayoutServiceData*](../interfaces/layoutservicedata.md)\>

Fetch layout data for an item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemPath` | *string* |
| `language?` | *string* |

**Returns:** *Promise*<[*LayoutServiceData*](../interfaces/layoutservicedata.md)\>

layout service data

Overrides: LayoutServiceBase.fetchLayoutData

Defined in: [layout/graphql-layout-service.ts:48](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L48)

___

### getLayoutQuery

▸ `Private` **getLayoutQuery**(`itemPath`: *string*, `language?`: *string*): *string*

Returns GraphQL Layout query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemPath` | *string* | page route |
| `language?` | *string* | - |

**Returns:** *string*

Defined in: [layout/graphql-layout-service.ts:83](https://github.com/Sitecore/jss/blob/cea3ba4f/packages/sitecore-jss/src/layout/graphql-layout-service.ts#L83)
