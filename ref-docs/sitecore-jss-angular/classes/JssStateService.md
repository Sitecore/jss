[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / JssStateService

# Class: JssStateService\<State\>

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:17](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L17)

The service that is used to store and retrieve the current state of the app.
Referenced by the SDK to get the current state of the app.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `State` *extends* [`BaseJssState`](BaseJssState.md) | [`BaseJssState`](BaseJssState.md) |

## Constructors

### Constructor

> **new JssStateService**\<`State`\>(): `JssStateService`\<`State`\>

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:21](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L21)

#### Returns

`JssStateService`\<`State`\>

## Properties

### transferState

> `protected` **transferState**: `TransferState`

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:18](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L18)

## Accessors

### state

#### Get Signature

> **get** **state**(): `Observable`\<`State`\>

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:28](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L28)

Observable JSS state to subscribe to

##### Returns

`Observable`\<`State`\>

***

### stateValue

#### Get Signature

> **get** **stateValue**(): `State`

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:35](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L35)

The 'here and now' state value, usable without subscribing

##### Returns

`State`

## Methods

### setState()

> **setState**(`newState`): `void`

Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:43](https://github.com/Sitecore/jss/blob/795167d8b0d1148debd3f4bb1d52fda751bd355c/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L43)

Set new JSS state

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newState` | `State` | new state |

#### Returns

`void`
