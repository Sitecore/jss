[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / getAppRootId

# Function: getAppRootId()

> **getAppRootId**(`client`, `siteName`, `language`, `jssAppTemplateId?`): `Promise`\<`null` \| `string`\>

Defined in: [packages/sitecore-jss/src/graphql/app-root-query.ts:51](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/graphql/app-root-query.ts#L51)

Gets the ID of the JSS App root item for the specified site and language.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `client` | [`GraphQLClient`](../../index/interfaces/GraphQLClient.md) | that fetches data from a GraphQL endpoint. |
| `siteName` | `string` | the name of the Sitecore site. |
| `language` | `string` | the item language version. |
| `jssAppTemplateId?` | `string` | optional template ID of the app root item. If not specified, the ID of the "/sitecore/templates/Foundation/JavaScript Services/App" item is used. |

## Returns

`Promise`\<`null` \| `string`\>

the root item ID of the JSS App in Sitecore. Returns null if the app root item is not found.

## Throws

if a valid site name value is not provided.

## Throws

if a valid language value is not provided.
