[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / GraphQLRequestClientConfig

# Type Alias: GraphQLRequestClientConfig

> **GraphQLRequestClientConfig**: `object`

Minimum configuration options for classes that implement

## Type declaration

### apiKey?

> `optional` **apiKey**: `string`

The API key to use for authentication. This will be added as an 'sc_apikey' header.

### debugger?

> `optional` **debugger**: [`Debugger`](Debugger.md)

Override debugger for logging. Uses 'sitecore-jss:http' by default.

### fetch?

> `optional` **fetch**: *typeof* `fetch`

Override fetch method. Uses 'graphql-request' library default otherwise ('cross-fetch').

### headers?

> `optional` **headers**: `Record`\<`string`, `string`\>

Custom headers to be sent with each request.

### retries?

> `optional` **retries**: `number`

Number of retries for client. Will use the specified `retryStrategy`.

### retryStrategy?

> `optional` **retryStrategy**: [`RetryStrategy`](../interfaces/RetryStrategy.md)

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

### timeout?

> `optional` **timeout**: `number`

GraphQLClient request timeout (in milliseconds).

## See

GraphQLClient

## Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:63](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss/src/graphql-request-client.ts#L63)
