[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / FormComponent

# Class: FormComponent

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:63](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/form.component.ts#L63)

A component that renders a Sitecore Form.
It fetches the form markup from the Sitecore Edge service and renders it in the component's template.

## Implements

- `OnInit`
- `OnDestroy`

## Constructors

### Constructor

> **new FormComponent**(`edgeConfig`, `platformId`, `elRef`, `jssState`): `FormComponent`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:75](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/form.component.ts#L75)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `edgeConfig` | `EdgeConfigToken` |
| `platformId` | \{\[`key`: `string`\]: `unknown`; \} |
| `elRef` | `ElementRef`\<`HTMLElement`\> |
| `jssState` | [`JssStateService`](JssStateService.md) |

#### Returns

`FormComponent`

## Properties

### hasError

> **hasError**: `boolean` = `false`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:69](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/form.component.ts#L69)

***

### isEditing

> **isEditing**: `boolean` = `false`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:71](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/form.component.ts#L71)

***

### rendering

> **rendering**: `FormRendering`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:67](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/form.component.ts#L67)

The rendering data for the component

## Methods

### loadForm()

> **loadForm**(): `Promise`\<`void`\>

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:101](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/form.component.ts#L101)

Fetches the form markup from the Sitecore Edge service and renders it in the component's template.

#### Returns

`Promise`\<`void`\>

***

### ngOnDestroy()

> **ngOnDestroy**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:92](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/form.component.ts#L92)

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

***

### ngOnInit()

> **ngOnInit**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/form.component.ts:82](https://github.com/Sitecore/jss/blob/503b58072e9380598907b2254bdfac59cbbc2b2e/packages/sitecore-jss-angular/src/components/form.component.ts#L82)

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`
