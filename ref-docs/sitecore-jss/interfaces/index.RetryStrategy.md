[@sitecore-jss/sitecore-jss](../README.md) / [index](../modules/index.md) / RetryStrategy

# Interface: RetryStrategy

[index](../modules/index.md).RetryStrategy

Defines the strategy for retrying GraphQL requests based on errors and attempts.

## Implemented by

- [`DefaultRetryStrategy`](../classes/index.DefaultRetryStrategy.md)

## Table of contents

### Methods

- [getDelay](index.RetryStrategy.md#getdelay)
- [shouldRetry](index.RetryStrategy.md#shouldretry)

## Methods

### getDelay

▸ **getDelay**(`error`, `attempt`): `number`

Calculates the delay (in milliseconds) before the next retry based on the given error and attempt count.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | [`ClientError`](../classes/index.ClientError.md) | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |

#### Returns

`number`

The delay in milliseconds before the next retry.

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:36](https://github.com/Sitecore/jss/blob/7b81ae6e2/packages/sitecore-jss/src/graphql-request-client.ts#L36)

___

### shouldRetry

▸ **shouldRetry**(`error`, `attempt`, `retries`): `boolean`

Determines whether a request should be retried based on the given error and attempt count.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | [`ClientError`](../classes/index.ClientError.md) | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |
| `retries` | `number` | The number of retries configured. |

#### Returns

`boolean`

A boolean indicating whether to retry the request.

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:29](https://github.com/Sitecore/jss/blob/7b81ae6e2/packages/sitecore-jss/src/graphql-request-client.ts#L29)
