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

[packages/sitecore-jss/src/graphql-request-client.ts:24](https://github.com/Sitecore/jss/blob/ba5495930712b15bb99b05d41785a26aa9a7a604/packages/sitecore-jss/src/graphql-request-client.ts#L24)
