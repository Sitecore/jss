[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [graphql](../README.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- `GraphQLClient`

## Constructors

### new GraphQLRequestClient()

> **new GraphQLRequestClient**(`endpoint`, `clientConfig`?): [`GraphQLRequestClient`](GraphQLRequestClient.md)

Provides ability to execute graphql query using given `endpoint`

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `endpoint` | `string` | The Graphql endpoint |
| `clientConfig`? | `GraphQLRequestClientConfig` | GraphQL request client configuration. |

#### Returns

[`GraphQLRequestClient`](GraphQLRequestClient.md)

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:140

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

`GraphQLClient.request`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:154

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

sitecore-jss/types/graphql-request-client.d.ts:147
