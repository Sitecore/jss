[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- [`GraphQLClient`](../interfaces/GraphQLClient.md)

## Constructors

### new GraphQLRequestClient()

> **new GraphQLRequestClient**(`endpoint`, `clientConfig`?): [`GraphQLRequestClient`](GraphQLRequestClient.md)

Provides ability to execute graphql query using given `endpoint`

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `endpoint` | `string` | The Graphql endpoint |
| `clientConfig`? | [`GraphQLRequestClientConfig`](../type-aliases/GraphQLRequestClientConfig.md) | GraphQL request client configuration. |

#### Returns

[`GraphQLRequestClient`](GraphQLRequestClient.md)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:177](https://github.com/Sitecore/jss/blob/d00fef6718046b8c406769a72405039bc95ed947/packages/sitecore-jss/src/graphql-request-client.ts#L177)

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
| `options`? | `RequestOptions` | Options for configuring a GraphQL request. |

#### Returns

`Promise`\<`T`\>

#### Implementation of

[`GraphQLClient`](../interfaces/GraphQLClient.md).[`request`](../interfaces/GraphQLClient.md#request)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:224](https://github.com/Sitecore/jss/blob/d00fef6718046b8c406769a72405039bc95ed947/packages/sitecore-jss/src/graphql-request-client.ts#L224)

***

### createClientFactory()

> `static` **createClientFactory**(`config`): [`GraphQLRequestClientFactory`](../type-aliases/GraphQLRequestClientFactory.md)

Factory method for creating a GraphQLRequestClientFactory.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`GraphQLRequestClientFactoryConfig`](../type-aliases/GraphQLRequestClientFactoryConfig.md) | client configuration options. |

#### Returns

[`GraphQLRequestClientFactory`](../type-aliases/GraphQLRequestClientFactory.md)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:210](https://github.com/Sitecore/jss/blob/d00fef6718046b8c406769a72405039bc95ed947/packages/sitecore-jss/src/graphql-request-client.ts#L210)
