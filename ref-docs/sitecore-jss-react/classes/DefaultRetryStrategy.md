[@sitecore-jss/sitecore-jss-react](../README.md) / DefaultRetryStrategy

# Class: DefaultRetryStrategy

Represents a default retry strategy for handling retry attempts in case of specific HTTP status codes.
This class implements the RetryStrategy interface and provides methods to determine whether a request
should be retried and calculates the delay before the next retry attempt.

## Implements

- [`RetryStrategy`](../interfaces/RetryStrategy.md)

## Table of contents

### Constructors

- [constructor](DefaultRetryStrategy.md#constructor)

### Properties

- [factor](DefaultRetryStrategy.md#factor)
- [statusCodes](DefaultRetryStrategy.md#statuscodes)

### Methods

- [getDelay](DefaultRetryStrategy.md#getdelay)
- [shouldRetry](DefaultRetryStrategy.md#shouldretry)

## Constructors

### constructor

• **new DefaultRetryStrategy**(`options?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` | Configurable options for retry mechanism. |
| `options.factor?` | `number` | Factor by which the delay increases with each retry attempt |
| `options.statusCodes?` | `number`[] | HTTP status codes to trigger retries on |

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:94

## Properties

### factor

• `Private` **factor**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:88

___

### statusCodes

• `Private` **statusCodes**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:87

## Methods

### getDelay

▸ **getDelay**(`error`, `attempt`): `number`

Calculates the delay (in milliseconds) before the next retry based on the given error and attempt count.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `ClientError` | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |

#### Returns

`number`

The delay in milliseconds before the next retry.

#### Implementation of

[RetryStrategy](../interfaces/RetryStrategy.md).[getDelay](../interfaces/RetryStrategy.md#getdelay)

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:99

___

### shouldRetry

▸ **shouldRetry**(`error`, `attempt`, `retries`): `boolean`

Determines whether a request should be retried based on the given error and attempt count.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `ClientError` | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |
| `retries` | `number` | The number of retries configured. |

#### Returns

`boolean`

A boolean indicating whether to retry the request.

#### Implementation of

[RetryStrategy](../interfaces/RetryStrategy.md).[shouldRetry](../interfaces/RetryStrategy.md#shouldretry)

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:98
