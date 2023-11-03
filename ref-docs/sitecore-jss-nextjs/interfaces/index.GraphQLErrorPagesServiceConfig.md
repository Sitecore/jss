[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLErrorPagesServiceConfig

# Interface: GraphQLErrorPagesServiceConfig

[index](../modules/index.md).GraphQLErrorPagesServiceConfig

## Hierarchy

- `Pick`<`GraphQLRequestClientConfig`, `"retries"`\>

  ↳ **`GraphQLErrorPagesServiceConfig`**

## Table of contents

### Properties

- [apiKey](index.GraphQLErrorPagesServiceConfig.md#apikey)
- [clientFactory](index.GraphQLErrorPagesServiceConfig.md#clientfactory)
- [endpoint](index.GraphQLErrorPagesServiceConfig.md#endpoint)
- [language](index.GraphQLErrorPagesServiceConfig.md#language)
- [retries](index.GraphQLErrorPagesServiceConfig.md#retries)
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

sitecore-jss/types/site/graphql-error-pages-service.d.ts:14

---

### clientFactory

• `Optional` **clientFactory**: `GraphQLRequestClientFactory`

A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
This factory function is used to create and configure GraphQL clients for making GraphQL API requests.

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:27

---

### endpoint

• `Optional` **endpoint**: `string`

Your Graphql endpoint

**`Deprecated`**

use

**`Param`**

property instead

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:9

---

### language

• **language**: `string`

The language

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:22

---

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will be used if endpoint responds with 429 (rate limit reached) error

#### Inherited from

Pick.retries

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:39

---

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:18
