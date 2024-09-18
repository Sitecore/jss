[@sitecore-jss/sitecore-jss-angular](../README.md) / JssStateService

# Class: JssStateService\<State\>

The service that is used to store and retrieve the current state of the app.
Referenced by the SDK to get the current state of the app.

## Type parameters

| Name | Type |
| :------ | :------ |
| `State` | extends [`BaseJssState`](BaseJssState.md) = [`BaseJssState`](BaseJssState.md) |

## Table of contents

### Constructors

- [constructor](JssStateService.md#constructor)

### Properties

- [\_state](JssStateService.md#_state)
- [transferState](JssStateService.md#transferstate)

### Accessors

- [state](JssStateService.md#state)
- [stateValue](JssStateService.md#statevalue)

### Methods

- [setState](JssStateService.md#setstate)

## Constructors

### constructor

• **new JssStateService**\<`State`\>(`transferState`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `State` | extends [`BaseJssState`](BaseJssState.md)\<`State`\> = [`BaseJssState`](BaseJssState.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `transferState` | `TransferState` |

#### Defined in

[packages/sitecore-jss-angular/src/services/jss-state.service.ts:34](https://github.com/Sitecore/jss/blob/8cb9651dc/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L34)

## Properties

### \_state

• `Private` **\_state**: `BehaviorSubject`\<`State`\>

#### Defined in

[packages/sitecore-jss-angular/src/services/jss-state.service.ts:32](https://github.com/Sitecore/jss/blob/8cb9651dc/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L32)

___

### transferState

• `Protected` **transferState**: `TransferState`

#### Defined in

[packages/sitecore-jss-angular/src/services/jss-state.service.ts:34](https://github.com/Sitecore/jss/blob/8cb9651dc/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L34)

## Accessors

### state

• `get` **state**(): `Observable`\<`State`\>

Observable JSS state to subscribe to

#### Returns

`Observable`\<`State`\>

#### Defined in

[packages/sitecore-jss-angular/src/services/jss-state.service.ts:21](https://github.com/Sitecore/jss/blob/8cb9651dc/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L21)

___

### stateValue

• `get` **stateValue**(): `State`

The 'here and now' state value, usable without subscribing

#### Returns

`State`

#### Defined in

[packages/sitecore-jss-angular/src/services/jss-state.service.ts:28](https://github.com/Sitecore/jss/blob/8cb9651dc/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L28)

## Methods

### setState

▸ **setState**(`newState`): `void`

Set new JSS state

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newState` | `State` | new state |

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/services/jss-state.service.ts:42](https://github.com/Sitecore/jss/blob/8cb9651dc/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L42)
