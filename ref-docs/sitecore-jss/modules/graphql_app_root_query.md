[Sitecore JavaScript Rendering SDK](../README.md) / [Exports](../modules.md) / graphql/app-root-query

# Module: graphql/app-root-query

## Table of contents

### Type aliases

- [AppRootQueryResult](graphql_app_root_query.md#approotqueryresult)

### Variables

- [languageError](graphql_app_root_query.md#languageerror)
- [siteNameError](graphql_app_root_query.md#sitenameerror)

### Functions

- [getAppRootId](graphql_app_root_query.md#getapprootid)

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

[graphql/app-root-query.ts:28](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/graphql/app-root-query.ts#L28)

## Variables

### languageError

• `Const` `Private` **languageError**: ``"The language must be a non-empty string"``

#### Defined in

[graphql/app-root-query.ts:8](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/graphql/app-root-query.ts#L8)

___

### siteNameError

• `Const` `Private` **siteNameError**: ``"The site name must be a non-empty string"``

#### Defined in

[graphql/app-root-query.ts:6](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/graphql/app-root-query.ts#L6)

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
| `client` | [`GraphQLClient`](../interfaces/graphql_request_client.GraphQLClient.md) | that fetches data from a GraphQL endpoint. |
| `siteName` | `string` | the name of the Sitecore site. |
| `language` | `string` | the item language version. |
| `jssAppTemplateId?` | `string` | optional template ID of the app root item. If not specified, the ID of the "/sitecore/templates/Foundation/JavaScript Services/App" item is used. |

#### Returns

`Promise`<`string` \| ``null``\>

the root item ID of the JSS App in Sitecore. Returns null if the app root item is not found.

#### Defined in

[graphql/app-root-query.ts:52](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss/src/graphql/app-root-query.ts#L52)
