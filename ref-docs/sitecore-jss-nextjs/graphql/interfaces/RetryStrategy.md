[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [graphql](../README.md) / RetryStrategy

# Interface: RetryStrategy

Defines the strategy for retrying GraphQL requests based on errors and attempts.

## Methods

### getDelay()

> **getDelay**(`error`, `attempt`): `number`

Calculates the delay (in milliseconds) before the next retry based on the given error and attempt count.

#### Parameters

• **error**: [`GraphQLClientError`](../type-aliases/GraphQLClientError.md)

The error received from the GraphQL request.

• **attempt**: `number`

The current attempt number.

#### Returns

`number`

The delay in milliseconds before the next retry.

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:49

***

### shouldRetry()

> **shouldRetry**(`error`, `attempt`, `retries`): `boolean`

Determines whether a request should be retried based on the given error and attempt count.

#### Parameters

• **error**: [`GraphQLClientError`](../type-aliases/GraphQLClientError.md)

The error received from the GraphQL request.

• **attempt**: `number`

The current attempt number.

• **retries**: `number`

The number of retries configured.

#### Returns

`boolean`

A boolean indicating whether to retry the request.

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:42