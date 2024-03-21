[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLErrorPagesServiceConfig

# Interface: GraphQLErrorPagesServiceConfig

[index](../modules/index.md).GraphQLErrorPagesServiceConfig

## Hierarchy

- `Pick`\<`GraphQLRequestClientConfig`, `"retries"` \| `"retryStrategy"`\>

  ↳ **`GraphQLErrorPagesServiceConfig`**

## Table of contents

### Properties

- [apiKey](index.GraphQLErrorPagesServiceConfig.md#apikey)
- [clientFactory](index.GraphQLErrorPagesServiceConfig.md#clientfactory)
- [endpoint](index.GraphQLErrorPagesServiceConfig.md#endpoint)
- [language](index.GraphQLErrorPagesServiceConfig.md#language)
- [retries](index.GraphQLErrorPagesServiceConfig.md#retries)
- [retryStrategy](index.GraphQLErrorPagesServiceConfig.md#retrystrategy)
- [siteName](index.GraphQLErrorPagesServiceConfig.md#sitename)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

The API key to use for authentication

**`Deprecated`**

use

**`Param`**

property instead

#### Defined in

packages/sitecore-jss/types/site/graphql-error-pages-service.d.ts:14

---

### clientFactory

• `Optional` **clientFactory**: [`GraphQLRequestClientFactory`](../modules/graphql.md#graphqlrequestclientfactory)

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

packages/sitecore-jss/types/site/graphql-error-pages-service.d.ts:27

---

### endpoint

• `Optional` **endpoint**: `string`

Your Graphql endpoint

**`Deprecated`**

use

**`Param`**

property instead

#### Defined in

packages/sitecore-jss/types/site/graphql-error-pages-service.d.ts:9

---

### language

• **language**: `string`

The language

#### Defined in

packages/sitecore-jss/types/site/graphql-error-pages-service.d.ts:22

---

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

#### Inherited from

Pick.retries

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:67

---

### retryStrategy

• `Optional` **retryStrategy**: [`RetryStrategy`](graphql.RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

#### Inherited from

Pick.retryStrategy

#### Defined in

packages/sitecore-jss/types/graphql-request-client.d.ts:72

---

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

packages/sitecore-jss/types/site/graphql-error-pages-service.d.ts:18
