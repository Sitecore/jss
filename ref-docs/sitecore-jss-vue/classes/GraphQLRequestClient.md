[**@sitecore-jss/sitecore-jss-vue**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-vue](../README.md) / GraphQLRequestClient

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

• **endpoint**: `string`

The Graphql endpoint

• **clientConfig?**: `GraphQLRequestClientConfig`

GraphQL request client configuration.

#### Returns

[`GraphQLRequestClient`](GraphQLRequestClient.md)

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:140

## Methods

### request()

> **request**\<`T`\>(`query`, `variables`?, `options`?): `Promise`\<`T`\>

Execute graphql request

#### Type Parameters

• **T**

#### Parameters

• **query**: `string` \| `DocumentNode`

graphql query

• **variables?**

graphql variables

• **options?**: `RequestOptions`

Options for configuring a GraphQL request.

#### Returns

`Promise`\<`T`\>

#### Implementation of

`GraphQLClient.request`

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:154

***

### createClientFactory()

> `static` **createClientFactory**(`config`): `GraphQLRequestClientFactory`

Factory method for creating a GraphQLRequestClientFactory.

#### Parameters

• **config**: [`GraphQLRequestClientFactoryConfig`](../type-aliases/GraphQLRequestClientFactoryConfig.md)

client configuration options.

#### Returns

`GraphQLRequestClientFactory`

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:147
