[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [graphql](../README.md) / GraphQLClientError

# Type Alias: GraphQLClientError

> **GraphQLClientError**: `Partial`\<`ClientError`\> & `object`

This type represents errors that can occur in a GraphQL client.
In cases where an error status was sent back from the server (`!response.ok`), the `response` will be populated with details. In cases where a response was never received, the `code` can be populated with the error code (e.g. Node's 'ECONNRESET', 'ETIMEDOUT', etc).

## Type declaration

### code?

> `optional` **code**: `string`

## Defined in

sitecore-jss/types/graphql-request-client.d.ts:28