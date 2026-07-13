[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / GraphQLClient

# Interface: GraphQLClient

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:17](https://github.com/Sitecore/jss/blob/8267fa90cd426dbf7203bea846c67ee8e2d147ee/packages/sitecore-jss/src/graphql-request-client.ts#L17)

An interface for GraphQL clients for Sitecore APIs

## Methods

### request()

> **request**\<`T`\>(`query`, `variables?`, `options?`): `Promise`\<`T`\>

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:24](https://github.com/Sitecore/jss/blob/8267fa90cd426dbf7203bea846c67ee8e2d147ee/packages/sitecore-jss/src/graphql-request-client.ts#L24)

Execute graphql request

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` \| `DocumentNode` | graphql query |
| `variables?` | \{\[`key`: `string`\]: `unknown`; \} | graphql variables |
| `options?` | `RequestOptions` | options for configuring a GraphQL request. |

#### Returns

`Promise`\<`T`\>
