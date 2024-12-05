[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / RetryStrategy

# Interface: RetryStrategy

Defines the strategy for retrying GraphQL requests based on errors and attempts.

## Methods

### getDelay()

> **getDelay**(`error`, `attempt`): `number`

Calculates the delay (in milliseconds) before the next retry based on the given error and attempt count.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `error` | [`GraphQLClientError`](../../graphql/type-aliases/GraphQLClientError.md) | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |

#### Returns

`number`

The delay in milliseconds before the next retry.

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:57](https://github.com/Sitecore/jss/blob/410baa3185964545d070498517cd670bf4efc6d5/packages/sitecore-jss/src/graphql-request-client.ts#L57)

***

### shouldRetry()

> **shouldRetry**(`error`, `attempt`, `retries`): `boolean`

Determines whether a request should be retried based on the given error and attempt count.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `error` | [`GraphQLClientError`](../../graphql/type-aliases/GraphQLClientError.md) | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |
| `retries` | `number` | The number of retries configured. |

#### Returns

`boolean`

A boolean indicating whether to retry the request.

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:50](https://github.com/Sitecore/jss/blob/410baa3185964545d070498517cd670bf4efc6d5/packages/sitecore-jss/src/graphql-request-client.ts#L50)
