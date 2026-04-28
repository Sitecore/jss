[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / GraphQLRequestClientConfig

# Type Alias: GraphQLRequestClientConfig

> **GraphQLRequestClientConfig** = `object`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:63](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L63)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:63](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L63)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Minimum configuration options for classes that implement

## See

GraphQLClient

## Properties

### apiKey?

> `optional` **apiKey?**: `string`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:67](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L67)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:67](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L67)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The API key to use for authentication. This will be added as an 'sc_apikey' header.

***

### debugger?

> `optional` **debugger?**: [`Debugger`](Debugger.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:71](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L71)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:71](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L71)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Override debugger for logging. Uses 'sitecore-jss:http' by default.

***

### fetch?

> `optional` **fetch?**: *typeof* `fetch`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:75](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L75)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:75](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L75)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Override fetch method. Uses 'graphql-request' library default otherwise ('cross-fetch').

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:92](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L92)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:92](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L92)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Custom headers to be sent with each request.

***

### retries?

> `optional` **retries?**: `number`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:83](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L83)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:83](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L83)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Number of retries for client. Will use the specified `retryStrategy`.

***

### retryStrategy?

> `optional` **retryStrategy?**: [`RetryStrategy`](../interfaces/RetryStrategy.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:88](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L88)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:88](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L88)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.

***

### timeout?

> `optional` **timeout?**: `number`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:79](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L79)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:79](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L79)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

GraphQLClient request timeout (in milliseconds).
