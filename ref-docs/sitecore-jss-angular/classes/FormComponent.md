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

[packages/sitecore-jss-angular/src/components/form.component.ts:67](https://github.com/Sitecore/jss/blob/83f15febcf8abedd06b92438d2299bd762d5a1b9/packages/sitecore-jss-angular/src/components/form.component.ts#L67)

## Properties

### hasError

> **hasError**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:61](https://github.com/Sitecore/jss/blob/83f15febcf8abedd06b92438d2299bd762d5a1b9/packages/sitecore-jss-angular/src/components/form.component.ts#L61)

***

### isEditing

> **isEditing**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:63](https://github.com/Sitecore/jss/blob/83f15febcf8abedd06b92438d2299bd762d5a1b9/packages/sitecore-jss-angular/src/components/form.component.ts#L63)

***

### rendering

> **rendering**: `FormRendering`

The rendering data for the component

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:59](https://github.com/Sitecore/jss/blob/83f15febcf8abedd06b92438d2299bd762d5a1b9/packages/sitecore-jss-angular/src/components/form.component.ts#L59)

## Methods

### loadForm()

> **loadForm**(): `Promise`\<`void`\>

Fetches the form markup from the Sitecore Edge service and renders it in the component's template.

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:93](https://github.com/Sitecore/jss/blob/83f15febcf8abedd06b92438d2299bd762d5a1b9/packages/sitecore-jss-angular/src/components/form.component.ts#L93)

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

[packages/sitecore-jss-angular/src/components/form.component.ts:84](https://github.com/Sitecore/jss/blob/83f15febcf8abedd06b92438d2299bd762d5a1b9/packages/sitecore-jss-angular/src/components/form.component.ts#L84)

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

[packages/sitecore-jss-angular/src/components/form.component.ts:74](https://github.com/Sitecore/jss/blob/83f15febcf8abedd06b92438d2299bd762d5a1b9/packages/sitecore-jss-angular/src/components/form.component.ts#L74)
