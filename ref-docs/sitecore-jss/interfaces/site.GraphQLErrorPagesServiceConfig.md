[@sitecore-jss/sitecore-jss](../README.md) / [site](../modules/site.md) / GraphQLErrorPagesServiceConfig

# Interface: GraphQLErrorPagesServiceConfig

[site](../modules/site.md).GraphQLErrorPagesServiceConfig

## Hierarchy

- `Pick`<[`GraphQLRequestClientConfig`](../modules/index.md#graphqlrequestclientconfig), ``"retries"``\>

  ↳ **`GraphQLErrorPagesServiceConfig`**

## Table of contents

### Properties

- [apiKey](site.GraphQLErrorPagesServiceConfig.md#apikey)
- [endpoint](site.GraphQLErrorPagesServiceConfig.md#endpoint)
- [language](site.GraphQLErrorPagesServiceConfig.md#language)
- [retries](site.GraphQLErrorPagesServiceConfig.md#retries)
- [siteName](site.GraphQLErrorPagesServiceConfig.md#sitename)

## Properties

### apiKey

• **apiKey**: `string`

The API key to use for authentication

#### Defined in

[src/site/graphql-error-pages-service.ts:35](https://github.com/Sitecore/jss/blob/48b2a9da1/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L35)

___

### endpoint

• **endpoint**: `string`

Your Graphql endpoint

#### Defined in

[src/site/graphql-error-pages-service.ts:31](https://github.com/Sitecore/jss/blob/48b2a9da1/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L31)

___

### language

• **language**: `string`

The language

#### Defined in

[src/site/graphql-error-pages-service.ts:43](https://github.com/Sitecore/jss/blob/48b2a9da1/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L43)

___

### retries

• `Optional` **retries**: `number`

Number of retries for client. Will be used if endpoint responds with 429 (rate limit reached) error

#### Inherited from

Pick.retries

#### Defined in

[src/graphql-request-client.ts:42](https://github.com/Sitecore/jss/blob/48b2a9da1/packages/sitecore-jss/src/graphql-request-client.ts#L42)

___

### siteName

• **siteName**: `string`

The JSS application name

#### Defined in

[src/site/graphql-error-pages-service.ts:39](https://github.com/Sitecore/jss/blob/48b2a9da1/packages/sitecore-jss/src/site/graphql-error-pages-service.ts#L39)
