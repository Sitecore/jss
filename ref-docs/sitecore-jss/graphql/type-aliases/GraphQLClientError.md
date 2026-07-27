[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [graphql](../README.md) / GraphQLClientError

# Type Alias: GraphQLClientError

> **GraphQLClientError** = `Partial`\<[`ClientError`](../../index/classes/ClientError.md)\> & `object`

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:35](https://github.com/Sitecore/jss/blob/f5b4cfdae161b056d3504045ac7b664575e13d27/packages/sitecore-jss/src/graphql-request-client.ts#L35)

This type represents errors that can occur in a GraphQL client.
In cases where an error status was sent back from the server (`!response.ok`), the `response` will be populated with details. In cases where a response was never received, the `code` can be populated with the error code (e.g. Node's 'ECONNRESET', 'ETIMEDOUT', etc).

## Type Declaration

### code?

> `optional` **code?**: `string`
