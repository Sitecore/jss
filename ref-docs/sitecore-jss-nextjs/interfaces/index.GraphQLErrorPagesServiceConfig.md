[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / GraphQLErrorPagesServiceConfig

# Interface: GraphQLErrorPagesServiceConfig

[index](../modules/index.md).GraphQLErrorPagesServiceConfig

## Hierarchy

- `Pick`<`GraphQLRequestClientConfig`, ``"retries"``\>

  ↳ **`GraphQLErrorPagesServiceConfig`**

## Table of contents

### Properties

- [apiKey](index.GraphQLErrorPagesServiceConfig.md#apikey)
- [endpoint](index.GraphQLErrorPagesServiceConfig.md#endpoint)
- [language](index.GraphQLErrorPagesServiceConfig.md#language)
- [retries](index.GraphQLErrorPagesServiceConfig.md#retries)
- [siteName](index.GraphQLErrorPagesServiceConfig.md#sitename)

## Properties

### apiKey

• **apiKey**: `string`

The API key to use for authentication

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:11

___

### endpoint

• **endpoint**: `string`

Your Graphql endpoint

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:7

___

### language

• **language**: `string`

The language

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:19

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will be used if endpoint responds with 429 (rate limit reached) error

#### Inherited from

Pick.retries

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:39

___

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

sitecore-jss/types/site/graphql-error-pages-service.d.ts:15
