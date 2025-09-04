[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / GraphQLRequestClient

# Class: GraphQLRequestClient

Defined in: packages/sitecore-jss/types/graphql-request-client.d.ts:126

A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
https://github.com/prisma-labs/graphql-request

## Implements

- `GraphQLClient`

## Constructors

### Constructor

> **new GraphQLRequestClient**(`endpoint`, `clientConfig?`): `GraphQLRequestClient`

Defined in: packages/sitecore-jss/types/graphql-request-client.d.ts:140

Provides ability to execute graphql query using given `endpoint`

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `endpoint` | `string` | The Graphql endpoint |
| `clientConfig?` | `GraphQLRequestClientConfig` | GraphQL request client configuration. |

#### Returns

`GraphQLRequestClient`

## Methods

### request()

> **request**\<`T`\>(`query`, `variables?`, `options?`): `Promise`\<`T`\>

Defined in: packages/sitecore-jss/types/graphql-request-client.d.ts:154

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

`GraphQLClient.request`

***

### createClientFactory()

> `static` **createClientFactory**(`config`): `GraphQLRequestClientFactory`

Defined in: packages/sitecore-jss/types/graphql-request-client.d.ts:147

Factory method for creating a GraphQLRequestClientFactory.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`GraphQLRequestClientFactoryConfig`](../type-aliases/GraphQLRequestClientFactoryConfig.md) | client configuration options. |

#### Returns

`GraphQLRequestClientFactory`
