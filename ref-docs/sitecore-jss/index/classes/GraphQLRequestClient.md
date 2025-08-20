[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:163](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/graphql-request-client.ts#L163)

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- [`GraphQLClient`](../interfaces/GraphQLClient.md)

## Constructors

### Constructor

> **new GraphQLRequestClient**(`endpoint`, `clientConfig?`): `GraphQLRequestClient`

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:177](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/graphql-request-client.ts#L177)

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

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:224](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/graphql-request-client.ts#L224)

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

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:210](https://github.com/Sitecore/jss/blob/a50be18c1607adcb48bbe2673ecedc966bc85051/packages/sitecore-jss/src/graphql-request-client.ts#L210)

Factory method for creating a GraphQLRequestClientFactory.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`GraphQLRequestClientFactoryConfig`](../type-aliases/GraphQLRequestClientFactoryConfig.md) | client configuration options. |

#### Returns

[`GraphQLRequestClientFactory`](../type-aliases/GraphQLRequestClientFactory.md)
