[@sitecore-jss/sitecore-jss](../README.md) / graphql

# Module: graphql

## Table of contents

### References

- [DefaultRetryStrategy](graphql.md#defaultretrystrategy)
- [GraphQLClient](graphql.md#graphqlclient)
- [GraphQLRequestClient](graphql.md#graphqlrequestclient)
- [GraphQLRequestClientConfig](graphql.md#graphqlrequestclientconfig)
- [GraphQLRequestClientFactory](graphql.md#graphqlrequestclientfactory)
- [GraphQLRequestClientFactoryConfig](graphql.md#graphqlrequestclientfactoryconfig)
- [RetryStrategy](graphql.md#retrystrategy)

### Classes

- [SearchQueryService](../classes/graphql.SearchQueryService.md)

### Interfaces

- [PageInfo](../interfaces/graphql.PageInfo.md)
- [SearchQueryVariables](../interfaces/graphql.SearchQueryVariables.md)
- [SearchServiceConfig](../interfaces/graphql.SearchServiceConfig.md)

### Type Aliases

- [AppRootQueryResult](graphql.md#approotqueryresult)
- [SearchQueryResult](graphql.md#searchqueryresult)

### Functions

- [getAppRootId](graphql.md#getapprootid)
- [getEdgeProxyContentUrl](graphql.md#getedgeproxycontenturl)

## References

### DefaultRetryStrategy

Re-exports [DefaultRetryStrategy](../classes/index.DefaultRetryStrategy.md)

___

### GraphQLClient

Re-exports [GraphQLClient](../interfaces/index.GraphQLClient.md)

___

### GraphQLRequestClient

Re-exports [GraphQLRequestClient](../classes/index.GraphQLRequestClient.md)

___

### GraphQLRequestClientConfig

Re-exports [GraphQLRequestClientConfig](index.md#graphqlrequestclientconfig)

___

### GraphQLRequestClientFactory

Re-exports [GraphQLRequestClientFactory](index.md#graphqlrequestclientfactory)

___

### GraphQLRequestClientFactoryConfig

Re-exports [GraphQLRequestClientFactoryConfig](index.md#graphqlrequestclientfactoryconfig)

___

### RetryStrategy

Re-exports [RetryStrategy](../interfaces/index.RetryStrategy.md)

## Type Aliases

### AppRootQueryResult

Ƭ **AppRootQueryResult**: `Object`

The schema of data returned in response to an app root query request

#### Type declaration

| Name | Type |
| :------ | :------ |
| `layout` | \{ `homePage`: \{ `rootItem`: \{ `id`: `string`  }[]  }  } |
| `layout.homePage` | \{ `rootItem`: \{ `id`: `string`  }[]  } |
| `layout.homePage.rootItem` | \{ `id`: `string`  }[] |

#### Defined in

[src/graphql/app-root-query.ts:27](https://github.com/Sitecore/jss/blob/08401372f/packages/sitecore-jss/src/graphql/app-root-query.ts#L27)

___

### SearchQueryResult

Ƭ **SearchQueryResult**\<`T`\>: `Object`

Schema of data returned in response to a "search" query request

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of objects being requested. |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `search` | \{ `pageInfo`: [`PageInfo`](../interfaces/graphql.PageInfo.md) ; `results`: `T`[]  } |
| `search.pageInfo` | [`PageInfo`](../interfaces/graphql.PageInfo.md) |
| `search.results` | `T`[] |

#### Defined in

[src/graphql/search-service.ts:22](https://github.com/Sitecore/jss/blob/08401372f/packages/sitecore-jss/src/graphql/search-service.ts#L22)

## Functions

### getAppRootId

▸ **getAppRootId**(`client`, `siteName`, `language`, `jssAppTemplateId?`): `Promise`\<`string` \| ``null``\>

Gets the ID of the JSS App root item for the specified site and language.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`GraphQLClient`](../interfaces/index.GraphQLClient.md) | that fetches data from a GraphQL endpoint. |
| `siteName` | `string` | the name of the Sitecore site. |
| `language` | `string` | the item language version. |
| `jssAppTemplateId?` | `string` | optional template ID of the app root item. If not specified, the ID of the "/sitecore/templates/Foundation/JavaScript Services/App" item is used. |

#### Returns

`Promise`\<`string` \| ``null``\>

the root item ID of the JSS App in Sitecore. Returns null if the app root item is not found.

**`Throws`**

if a valid site name value is not provided.

**`Throws`**

if a valid language value is not provided.

**`Summary`**

This function intentionally avoids throwing an error if a root item is not found,
leaving that decision up to implementations.

#### Defined in

[src/graphql/app-root-query.ts:51](https://github.com/Sitecore/jss/blob/08401372f/packages/sitecore-jss/src/graphql/app-root-query.ts#L51)

___

### getEdgeProxyContentUrl

▸ **getEdgeProxyContentUrl**(`sitecoreEdgeContextId`, `sitecoreEdgeUrl?`): `string`

Generates a URL for accessing Sitecore Edge Platform Content using the provided endpoint and context ID.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `sitecoreEdgeContextId` | `string` | `undefined` | The unique context id. |
| `sitecoreEdgeUrl?` | `string` | `SITECORE_EDGE_URL_DEFAULT` | The base endpoint URL for the Edge Platform. Default is https://edge-platform.sitecorecloud.io |

#### Returns

`string`

The complete URL for accessing content through the Edge Platform.

#### Defined in

[src/graphql/graphql-edge-proxy.ts:9](https://github.com/Sitecore/jss/blob/08401372f/packages/sitecore-jss/src/graphql/graphql-edge-proxy.ts#L9)
