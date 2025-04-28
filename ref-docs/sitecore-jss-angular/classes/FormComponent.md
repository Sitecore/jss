[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / FormComponent

# Class: FormComponent

A component that renders a Sitecore Form.
It fetches the form markup from the Sitecore Edge service and renders it in the component's template.

## Implements

- `OnInit`
- `OnDestroy`

## Constructors

### new FormComponent()

> **new FormComponent**(`edgeConfig`, `platformId`, `elRef`, `jssState`): [`FormComponent`](FormComponent.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `edgeConfig` | `EdgeConfigToken` |
| `platformId` | `object` |
| `elRef` | `ElementRef`\<`HTMLElement`\> |
| `jssState` | [`JssStateService`](JssStateService.md)\<[`BaseJssState`](BaseJssState.md)\> |

#### Returns

[`FormComponent`](FormComponent.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:75](https://github.com/Sitecore/jss/blob/6217e2e71367ae392fe1df0895780151e0676f93/packages/sitecore-jss-angular/src/components/form.component.ts#L75)

## Properties

### hasError

> **hasError**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:69](https://github.com/Sitecore/jss/blob/6217e2e71367ae392fe1df0895780151e0676f93/packages/sitecore-jss-angular/src/components/form.component.ts#L69)

***

### isEditing

> **isEditing**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:71](https://github.com/Sitecore/jss/blob/6217e2e71367ae392fe1df0895780151e0676f93/packages/sitecore-jss-angular/src/components/form.component.ts#L71)

***

### rendering

> **rendering**: `FormRendering`

The rendering data for the component

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:67](https://github.com/Sitecore/jss/blob/6217e2e71367ae392fe1df0895780151e0676f93/packages/sitecore-jss-angular/src/components/form.component.ts#L67)

## Methods

### loadForm()

> **loadForm**(): `Promise`\<`void`\>

Fetches the form markup from the Sitecore Edge service and renders it in the component's template.

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:101](https://github.com/Sitecore/jss/blob/6217e2e71367ae392fe1df0895780151e0676f93/packages/sitecore-jss-angular/src/components/form.component.ts#L101)

***

### ngOnDestroy()

> **ngOnDestroy**(): `void`

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:92](https://github.com/Sitecore/jss/blob/6217e2e71367ae392fe1df0895780151e0676f93/packages/sitecore-jss-angular/src/components/form.component.ts#L92)

***

### ngOnInit()

> **ngOnInit**(): `void`

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:82](https://github.com/Sitecore/jss/blob/6217e2e71367ae392fe1df0895780151e0676f93/packages/sitecore-jss-angular/src/components/form.component.ts#L82)
