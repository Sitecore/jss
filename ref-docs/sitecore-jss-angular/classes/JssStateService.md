[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / JssStateService

# Class: JssStateService\<State\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:17](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L17)
=======
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:17](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L17)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The service that is used to store and retrieve the current state of the app.
Referenced by the SDK to get the current state of the app.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `State` *extends* [`BaseJssState`](BaseJssState.md) | [`BaseJssState`](BaseJssState.md) |

## Constructors

### Constructor

> **new JssStateService**\<`State`\>(): `JssStateService`\<`State`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:21](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L21)
=======
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:21](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L21)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Returns

`JssStateService`\<`State`\>

## Properties

### transferState

> `protected` **transferState**: `TransferState`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:18](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L18)
=======
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:18](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L18)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Accessors

### state

#### Get Signature

> **get** **state**(): `Observable`\<`State`\>

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:28](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L28)
=======
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:28](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L28)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Observable JSS state to subscribe to

##### Returns

`Observable`\<`State`\>

***

### stateValue

#### Get Signature

> **get** **stateValue**(): `State`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:35](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L35)
=======
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:35](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L35)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The 'here and now' state value, usable without subscribing

##### Returns

`State`

## Methods

### setState()

> **setState**(`newState`): `void`

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:43](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L43)
=======
Defined in: [packages/sitecore-jss-angular/src/services/jss-state.service.ts:43](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-angular/src/services/jss-state.service.ts#L43)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Set new JSS state

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newState` | `State` | new state |

#### Returns

`void`
