[@sitecore-jss/sitecore-jss](../README.md) / [index](../modules/index.md) / DefaultRetryStrategy

# Class: DefaultRetryStrategy

[index](../modules/index.md).DefaultRetryStrategy

Represents a default retry strategy for handling retry attempts in case of specific HTTP status codes.
This class implements the RetryStrategy interface and provides methods to determine whether a request
should be retried and calculates the delay before the next retry attempt.

## Implements

- [`RetryStrategy`](../interfaces/index.RetryStrategy.md)

## Table of contents

### Constructors

- [constructor](index.DefaultRetryStrategy.md#constructor)

### Properties

- [factor](index.DefaultRetryStrategy.md#factor)
- [statusCodes](index.DefaultRetryStrategy.md#statuscodes)

### Methods

- [getDelay](index.DefaultRetryStrategy.md#getdelay)
- [shouldRetry](index.DefaultRetryStrategy.md#shouldretry)

## Constructors

### constructor

• **new DefaultRetryStrategy**(`options?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Configurable options for retry mechanism. |
| `options.factor?` | `number` | Factor by which the delay increases with each retry attempt |
| `options.statusCodes?` | `number`[] | HTTP status codes to trigger retries on |

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:102](https://github.com/Sitecore/jss/blob/74e2e36b1/packages/sitecore-jss/src/graphql-request-client.ts#L102)

## Properties

### factor

• `Private` **factor**: `number`

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:95](https://github.com/Sitecore/jss/blob/74e2e36b1/packages/sitecore-jss/src/graphql-request-client.ts#L95)

___

### statusCodes

• `Private` **statusCodes**: `number`[]

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:94](https://github.com/Sitecore/jss/blob/74e2e36b1/packages/sitecore-jss/src/graphql-request-client.ts#L94)

## Methods

### getDelay

▸ **getDelay**(`error`, `attempt`): `number`

Calculates the delay (in milliseconds) before the next retry based on the given error and attempt count.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | [`ClientError`](index.ClientError.md) | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |

#### Returns

`number`

The delay in milliseconds before the next retry.

#### Implementation of

[RetryStrategy](../interfaces/index.RetryStrategy.md).[getDelay](../interfaces/index.RetryStrategy.md#getdelay)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:116](https://github.com/Sitecore/jss/blob/74e2e36b1/packages/sitecore-jss/src/graphql-request-client.ts#L116)

___

### shouldRetry

▸ **shouldRetry**(`error`, `attempt`, `retries`): `boolean`

Determines whether a request should be retried based on the given error and attempt count.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | [`ClientError`](index.ClientError.md) | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |
| `retries` | `number` | The number of retries configured. |

#### Returns

`boolean`

A boolean indicating whether to retry the request.

#### Implementation of

[RetryStrategy](../interfaces/index.RetryStrategy.md).[shouldRetry](../interfaces/index.RetryStrategy.md#shouldretry)

#### Defined in

[packages/sitecore-jss/src/graphql-request-client.ts:107](https://github.com/Sitecore/jss/blob/74e2e36b1/packages/sitecore-jss/src/graphql-request-client.ts#L107)
