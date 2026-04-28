[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:163](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L163)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:163](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L163)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- [`GraphQLClient`](../interfaces/GraphQLClient.md)

## Constructors

### Constructor

> **new GraphQLRequestClient**(`endpoint`, `clientConfig?`): `GraphQLRequestClient`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:177](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L177)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:177](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L177)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Provides ability to execute graphql query using given `endpoint`

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `endpoint` | `string` | The Graphql endpoint |
| `clientConfig?` | [`GraphQLRequestClientConfig`](../type-aliases/GraphQLRequestClientConfig.md) | GraphQL request client configuration. |

#### Returns

`GraphQLRequestClient`

## Methods

### request()

> **request**\<`T`\>(`query`, `variables?`, `options?`): `Promise`\<`T`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:224](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L224)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:224](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L224)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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
| `options?` | `RequestOptions` | Options for configuring a GraphQL request. |

#### Returns

`Promise`\<`T`\>

#### Implementation of

[`GraphQLClient`](../interfaces/GraphQLClient.md).[`request`](../interfaces/GraphQLClient.md#request)

***

### createClientFactory()

> `static` **createClientFactory**(`config`): [`GraphQLRequestClientFactory`](../type-aliases/GraphQLRequestClientFactory.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:210](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L210)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:210](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L210)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Factory method for creating a GraphQLRequestClientFactory.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`GraphQLRequestClientFactoryConfig`](../type-aliases/GraphQLRequestClientFactoryConfig.md) | client configuration options. |

#### Returns

[`GraphQLRequestClientFactory`](../type-aliases/GraphQLRequestClientFactory.md)
