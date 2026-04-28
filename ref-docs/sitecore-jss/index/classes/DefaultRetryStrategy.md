[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / DefaultRetryStrategy

# Class: DefaultRetryStrategy

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:118](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L118)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:118](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L118)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Represents a default retry strategy for handling retry attempts in case of specific HTTP status codes.
This class implements the RetryStrategy interface and provides methods to determine whether a request
should be retried and calculates the delay before the next retry attempt.

## Implements

- [`RetryStrategy`](../interfaces/RetryStrategy.md)

## Constructors

### Constructor

> **new DefaultRetryStrategy**(`options`): `DefaultRetryStrategy`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:129](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L129)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:129](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L129)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `errorCodes?`: `string`[]; `factor?`: `number`; `statusCodes?`: `number`[]; \} | Configurable options for retry mechanism. |
| `options.errorCodes?` | `string`[] | Node error codes to trigger retries. Default is ['ECONNRESET', 'ETIMEDOUT', 'EPROTO']. |
| `options.factor?` | `number` | Factor by which the delay increases with each retry attempt. Default is 2. |
| `options.statusCodes?` | `number`[] | HTTP status codes to trigger retries on. Default is [429]. |

#### Returns

`DefaultRetryStrategy`

## Methods

### getDelay()

> **getDelay**(`error`, `attempt`): `number`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:142](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L142)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:142](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L142)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Calculates the delay (in milliseconds) before the next retry based on the given error and attempt count.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `error` | [`GraphQLClientError`](../../graphql/type-aliases/GraphQLClientError.md) | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |

#### Returns

`number`

The delay in milliseconds before the next retry.

#### Implementation of

[`RetryStrategy`](../interfaces/RetryStrategy.md).[`getDelay`](../interfaces/RetryStrategy.md#getdelay)

***

### shouldRetry()

> **shouldRetry**(`error`, `attempt`, `retries`): `boolean`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:135](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/graphql-request-client.ts#L135)
=======
Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:135](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/graphql-request-client.ts#L135)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

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

#### Implementation of

[`RetryStrategy`](../interfaces/RetryStrategy.md).[`shouldRetry`](../interfaces/RetryStrategy.md#shouldretry)
