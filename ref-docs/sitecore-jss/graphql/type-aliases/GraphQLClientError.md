[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / GraphQLClientError

# Type Alias: GraphQLClientError

> **GraphQLClientError**: `Partial`\<[`ClientError`](../../index/classes/ClientError.md)\> & `object`

This type represents errors that can occur in a GraphQL client.
In cases where an error status was sent back from the server (`!response.ok`), the `response` will be populated with details. In cases where a response was never received, the `code` can be populated with the error code (e.g. Node's 'ECONNRESET', 'ETIMEDOUT', etc).

## Type declaration

### code?

> `optional` **code**: `string`

## Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:35](https://github.com/Sitecore/jss/blob/128550df8a6d97c68d280bb21ab377d096352bb5/packages/sitecore-jss/src/graphql-request-client.ts#L35)
