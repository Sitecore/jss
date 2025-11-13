[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / JssStateService

# Class: JssStateService\<State\>

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:17](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L17)

The service that is used to store and retrieve the current state of the app.
Referenced by the SDK to get the current state of the app.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `State` *extends* [`BaseJssState`](BaseJssState.md) | [`BaseJssState`](BaseJssState.md) |

## Constructors

### Constructor

> **new JssStateService**\<`State`\>(`transferState`): `JssStateService`\<`State`\>

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:20](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L20)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `transferState` | `TransferState` |

#### Returns

`JssStateService`\<`State`\>

## Properties

### transferState

> `protected` **transferState**: `TransferState`

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:20](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L20)

## Accessors

### state

#### Get Signature

> **get** **state**(): `Observable`\<`State`\>

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:27](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L27)

Observable JSS state to subscribe to

##### Returns

`Observable`\<`State`\>

***

### stateValue

#### Get Signature

> **get** **stateValue**(): `State`

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:34](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L34)

The 'here and now' state value, usable without subscribing

##### Returns

`State`

## Methods

### setState()

> **setState**(`newState`): `void`

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:42](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L42)

Set new JSS state

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newState` | `State` | new state |

#### Returns

`void`
