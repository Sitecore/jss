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

• **endpoint**: `string`

The Graphql endpoint

• **clientConfig?**: [`GraphQLRequestClientConfig`](../type-aliases/GraphQLRequestClientConfig.md) = `{}`

GraphQL request client configuration.

#### Returns

[`GraphQLRequestClient`](GraphQLRequestClient.md)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:177](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/graphql-request-client.ts#L177)

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

[`GraphQLClient`](../interfaces/GraphQLClient.md).[`request`](../interfaces/GraphQLClient.md#request)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:224](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/graphql-request-client.ts#L224)

***

### createClientFactory()

> `static` **createClientFactory**(`config`): [`GraphQLRequestClientFactory`](../type-aliases/GraphQLRequestClientFactory.md)

Factory method for creating a GraphQLRequestClientFactory.

#### Parameters

• **config**: [`GraphQLRequestClientFactoryConfig`](../type-aliases/GraphQLRequestClientFactoryConfig.md)

client configuration options.

#### Returns

[`GraphQLRequestClientFactory`](../type-aliases/GraphQLRequestClientFactory.md)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:210](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/graphql-request-client.ts#L210)
