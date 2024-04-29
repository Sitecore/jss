[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [graphql](../modules/graphql.md) / DefaultRetryStrategy

# Class: DefaultRetryStrategy

[graphql](../modules/graphql.md).DefaultRetryStrategy

Represents a default retry strategy for handling retry attempts in case of specific HTTP status codes.
This class implements the RetryStrategy interface and provides methods to determine whether a request
should be retried and calculates the delay before the next retry attempt.

## Implements

- [`RetryStrategy`](../interfaces/graphql.RetryStrategy.md)

## Table of contents

### Constructors

- [constructor](graphql.DefaultRetryStrategy.md#constructor)

### Properties

- [errorCodes](graphql.DefaultRetryStrategy.md#errorcodes)
- [factor](graphql.DefaultRetryStrategy.md#factor)
- [statusCodes](graphql.DefaultRetryStrategy.md#statuscodes)

### Methods

- [getDelay](graphql.DefaultRetryStrategy.md#getdelay)
- [shouldRetry](graphql.DefaultRetryStrategy.md#shouldretry)

## Constructors

### constructor

• **new DefaultRetryStrategy**(`options?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` | Configurable options for retry mechanism. |
| `options.errorCodes?` | `string`[] | Node error codes to trigger retries. Default is ['ECONNRESET', 'ETIMEDOUT', 'EPROTO']. |
| `options.factor?` | `number` | Factor by which the delay increases with each retry attempt. Default is 2. |
| `options.statusCodes?` | `number`[] | HTTP status codes to trigger retries on. Default is [429]. |

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:103

## Properties

### errorCodes

• `Private` **errorCodes**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:95

___

### factor

• `Private` **factor**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:96

___

### statusCodes

• `Private` **statusCodes**: `any`

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:94

## Methods

### getDelay

▸ **getDelay**(`error`, `attempt`): `number`

Calculates the delay (in milliseconds) before the next retry based on the given error and attempt count.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | [`GraphQLClientError`](../modules/graphql.md#graphqlclienterror) | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |

#### Returns

`number`

The delay in milliseconds before the next retry.

#### Implementation of

[RetryStrategy](../interfaces/graphql.RetryStrategy.md).[getDelay](../interfaces/graphql.RetryStrategy.md#getdelay)

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:109

___

### shouldRetry

▸ **shouldRetry**(`error`, `attempt`, `retries`): `boolean`

Determines whether a request should be retried based on the given error and attempt count.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | [`GraphQLClientError`](../modules/graphql.md#graphqlclienterror) | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |
| `retries` | `number` | The number of retries configured. |

#### Returns

`boolean`

A boolean indicating whether to retry the request.

#### Implementation of

[RetryStrategy](../interfaces/graphql.RetryStrategy.md).[shouldRetry](../interfaces/graphql.RetryStrategy.md#shouldretry)

#### Defined in

sitecore-jss/types/graphql-request-client.d.ts:108
