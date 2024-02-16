[@sitecore-jss/sitecore-jss](../README.md) / [site](../modules/site.md) / GraphQLErrorPagesServiceConfig

# Interface: GraphQLErrorPagesServiceConfig

[site](../modules/site.md).GraphQLErrorPagesServiceConfig

## Hierarchy

- `Pick`\<[`GraphQLRequestClientConfig`](../modules/index.md#graphqlrequestclientconfig), ``"retries"``\>

  ↳ **`GraphQLErrorPagesServiceConfig`**

## Table of contents

### Properties

- [apiKey](site.GraphQLErrorPagesServiceConfig.md#apikey)
- [clientFactory](site.GraphQLErrorPagesServiceConfig.md#clientfactory)
- [endpoint](site.GraphQLErrorPagesServiceConfig.md#endpoint)
- [language](site.GraphQLErrorPagesServiceConfig.md#language)
- [retries](site.GraphQLErrorPagesServiceConfig.md#retries)
- [siteName](site.GraphQLErrorPagesServiceConfig.md#sitename)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

The API key to use for authentication

**`Deprecated`**

use

**`Param`**

property instead

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:38](https://github.com/Sitecore/jss/blob/7c905aeb3/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L38)

___

### clientFactory

• `Optional` **clientFactory**: [`GraphQLRequestClientFactory`](../modules/index.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:51](https://github.com/Sitecore/jss/blob/7c905aeb3/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L51)

___

### endpoint

• `Optional` **endpoint**: `string`

Your Graphql endpoint

**`Deprecated`**

use

**`Param`**

property instead

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:33](https://github.com/Sitecore/jss/blob/7c905aeb3/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L33)

___

### language

• **language**: `string`

The language

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:46](https://github.com/Sitecore/jss/blob/7c905aeb3/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L46)

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

Pick.retries

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:62](https://github.com/Sitecore/jss/blob/7c905aeb3/packages/sitecore-jss/src/graphql-request-client.ts#L62)

___

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

[packages/sitecore-jss/src/site/graphql-error-pages-service.ts:42](https://github.com/Sitecore/jss/blob/7c905aeb3/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L42)
