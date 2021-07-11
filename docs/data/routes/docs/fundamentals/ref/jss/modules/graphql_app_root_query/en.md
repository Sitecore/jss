---
name: graphql_app_root_query
routeTemplate: ./data/component-templates/article.yml
title: graphql_app_root_query
---

[Sitecore JavaScript Rendering SDK](/docs/fundamentals/ref/jss/) / graphql/app-root-query

# Module: graphql/app-root-query

## Table of contents

### Type aliases

- [AppRootQueryResult](/docs/fundamentals/ref/jss/modules/graphql_app_root_query#approotqueryresult)

### Variables

- [languageError](/docs/fundamentals/ref/jss/modules/graphql_app_root_query#languageerror)
- [siteNameError](/docs/fundamentals/ref/jss/modules/graphql_app_root_query#sitenameerror)

### Functions

- [getAppRootId](/docs/fundamentals/ref/jss/modules/graphql_app_root_query#getapprootid)

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

## Variables

### languageError

• `Const` `Private` **languageError**: ``"The language must be a non-empty string"``

___

### siteNameError

• `Const` `Private` **siteNameError**: ``"The site name must be a non-empty string"``

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
| `client` | [`GraphQLClient`](/docs/fundamentals/ref/jss/interfaces/graphql_request_client/graphqlclient) | that fetches data from a GraphQL endpoint. |
| `siteName` | `string` | the name of the Sitecore site. |
| `language` | `string` | the item language version. |
| `jssAppTemplateId?` | `string` | optional template ID of the app root item. If not specified, the ID of the "/sitecore/templates/Foundation/JavaScript Services/App" item is used. |

#### Returns

`Promise`<`string` \| ``null``\>

the root item ID of the JSS App in Sitecore. Returns null if the app root item is not found.
