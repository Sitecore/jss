@sitecore-jss/sitecore-jss

# @sitecore-jss/sitecore-jss

## Table of contents

### Classes

- [GraphQLRequestClient](classes/GraphQLRequestClient.md)
- [SearchQueryService](classes/SearchQueryService.md)

### Interfaces

- [GraphQLClient](interfaces/GraphQLClient.md)
- [SearchServiceConfig](interfaces/SearchServiceConfig.md)

### Type aliases

- [AppRootQueryResult](README.md#approotqueryresult)
- [GraphQLRequestClientConfig](README.md#graphqlrequestclientconfig)
- [SearchQueryResult](README.md#searchqueryresult)
- [SearchQueryVariables](README.md#searchqueryvariables)

### Functions

- [getAppRootId](README.md#getapprootid)

## Type aliases

### AppRootQueryResult

Ƭ **AppRootQueryResult**: `Object`

The schema of data returned in response to an app root query request

#### Type declaration

| Name | Type |
| :------ | :------ |
| `layout` | `Object` |
| `layout.homePage` | `Object` |
| `layout.homePage.rootItem` | { `id`: `string`  }[] |

#### Defined in

[graphql/app-root-query.ts:28](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/graphql/app-root-query.ts#L28)

___

### GraphQLRequestClientConfig

Ƭ **GraphQLRequestClientConfig**: `Object`

Minimum configuration options for classes that implement @see GraphQLClient

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey?` | `string` | The API key to use for authentication. This will be added as an 'sc_apikey' header. |
| `debugger?` | `Debugger` | Override debugger for logging. Uses 'sitecore-jss:http' by default. |

#### Defined in

[graphql-request-client.ts:21](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/graphql-request-client.ts#L21)

___

### SearchQueryResult

Ƭ **SearchQueryResult**<`T`\>: `Object`

Schema of data returned in response to a "search" query request

**`template`** The type of objects being requested.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `search` | `Object` |
| `search.pageInfo` | `Object` |
| `search.pageInfo.endCursor` | `string` |
| `search.pageInfo.hasNext` | `boolean` |
| `search.results` | `T`[] |

#### Defined in

[graphql/search-service.ts:8](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/graphql/search-service.ts#L8)

___

### SearchQueryVariables

Ƭ **SearchQueryVariables**: `Object`

Describes the variables used by the 'search' query. Language should always be specified.
The other predicates are optional.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | `string` | Required. The language versions to search for. Fetch pages that have versions in this language. |
| `pageSize?` | `number` | Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.  **`default`** 10 |
| `rootItemId?` | `string` | Optional. The ID of the search root item. Fetch items that have this item as an ancestor. |
| `templates?` | `string` | Optional. Sitecore template ID(s). Fetch items that inherit from this template(s). |

#### Defined in

[graphql/search-service.ts:34](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/graphql/search-service.ts#L34)

## Functions

### getAppRootId

▸ **getAppRootId**(`client`, `siteName`, `language`, `jssAppTemplateId?`): `Promise`<`string` \| ``null``\>

Gets the ID of the JSS App root item for the specified site and language.

**`throws`** {RangeError} if a valid site name value is not provided.

**`throws`** {RangeError} if a valid language value is not provided.
This function intentionally avoids throwing an error if a root item is not found,
leaving that decision up to implementations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`GraphQLClient`](interfaces/GraphQLClient.md) | that fetches data from a GraphQL endpoint. |
| `siteName` | `string` | the name of the Sitecore site. |
| `language` | `string` | the item language version. |
| `jssAppTemplateId?` | `string` | optional template ID of the app root item. If not specified, the ID of the "/sitecore/templates/Foundation/JavaScript Services/App" item is used. |

#### Returns

`Promise`<`string` \| ``null``\>

the root item ID of the JSS App in Sitecore. Returns null if the app root item is not found.

#### Defined in

[graphql/app-root-query.ts:52](https://github.com/Sitecore/jss/blob/f5c66a8c/packages/sitecore-jss/src/graphql/app-root-query.ts#L52)
