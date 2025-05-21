[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / GraphQLClient

# Interface: GraphQLClient

An interface for GraphQL clients for Sitecore APIs

## Methods

### request()

> **request**\<`T`\>(`query`, `variables`?, `options`?): `Promise`\<`T`\>

Execute graphql request

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` \| `DocumentNode` | graphql query |
| `variables`? | `object` | graphql variables |
| `options`? | `RequestOptions` | options for configuring a GraphQL request. |

#### Returns

`Promise`\<`T`\>

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:24](https://github.com/Sitecore/jss/blob/c1641f6d8e72715570af3e3fb117c8266f13b037/packages/sitecore-jss/src/graphql-request-client.ts#L24)
