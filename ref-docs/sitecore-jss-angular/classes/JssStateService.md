[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / JssStateService

# Class: JssStateService\<State\>

The service that is used to store and retrieve the current state of the app.
Referenced by the SDK to get the current state of the app.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `State` *extends* [`BaseJssState`](BaseJssState.md) | [`BaseJssState`](BaseJssState.md) |

## Constructors

### new JssStateService()

> **new JssStateService**\<`State`\>(`transferState`): [`JssStateService`](JssStateService.md)\<`State`\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `transferState` | `TransferState` |

#### Returns

[`JssStateService`](JssStateService.md)\<`State`\>

#### Defined in

[packages/sitecore-jss-angular/src/services/jss-state.service.ts:20](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L20)

## Properties

### transferState

> `protected` **transferState**: `TransferState`

#### Defined in

[packages/sitecore-jss-angular/src/services/jss-state.service.ts:20](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L20)

## Accessors

### state

#### Get Signature

> **get** **state**(): `Observable`\<`State`\>

Observable JSS state to subscribe to

##### Returns

`Observable`\<`State`\>

#### Defined in

[packages/sitecore-jss-angular/src/services/jss-state.service.ts:27](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L27)

***

### stateValue

#### Get Signature

> **get** **stateValue**(): `State`

The 'here and now' state value, usable without subscribing

##### Returns

`State`

#### Defined in

[packages/sitecore-jss-angular/src/services/jss-state.service.ts:34](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L34)

## Methods

### setState()

> **setState**(`newState`): `void`

Set new JSS state

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newState` | `State` | new state |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/services/jss-state.service.ts:42](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L42)
