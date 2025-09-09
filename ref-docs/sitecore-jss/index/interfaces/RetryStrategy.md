[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [index](../README.md) / RetryStrategy

# Interface: RetryStrategy

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:42](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/graphql-request-client.ts#L42)

Defines the strategy for retrying GraphQL requests based on errors and attempts.

## Methods

### getDelay()

> **getDelay**(`error`, `attempt`): `number`

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:57](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/graphql-request-client.ts#L57)

Calculates the delay (in milliseconds) before the next retry based on the given error and attempt count.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `error` | [`GraphQLClientError`](../../graphql/type-aliases/GraphQLClientError.md) | The error received from the GraphQL request. |
| `attempt` | `number` | The current attempt number. |

#### Returns

`number`

The delay in milliseconds before the next retry.

***

### shouldRetry()

> **shouldRetry**(`error`, `attempt`, `retries`): `boolean`

Defined in: [packages/sitecore-jss/src/graphql-request-client.ts:50](https://github.com/Sitecore/jss/blob/f052e595eb560433ff6e14addede2d4d85985051/packages/sitecore-jss/src/graphql-request-client.ts#L50)

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
