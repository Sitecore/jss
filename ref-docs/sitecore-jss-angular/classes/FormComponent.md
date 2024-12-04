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

[packages/sitecore-jss-angular/src/components/form.component.ts:61](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/form.component.ts#L61)

## Properties

### hasError

> **hasError**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:55](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/form.component.ts#L55)

***

### isEditing

> **isEditing**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:57](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/form.component.ts#L57)

***

### rendering

> **rendering**: `FormRendering`

The rendering data for the component

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:53](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/form.component.ts#L53)

## Methods

### executeScriptElements()

> **executeScriptElements**(): `void`

When you set the innerHTML property of an element, the browser does not execute any <script> tags included in the HTML string
This method ensures that any <script> elements within the loaded HTML are executed.
It re-creates the script elements and appends the to the component's template, then removes old script elements to avoid duplication.

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:144](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/form.component.ts#L144)

***

### loadForm()

> **loadForm**(): `Promise`\<`void`\>

Fetches the form markup from the Sitecore Edge service and renders it in the component's template.

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:87](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/form.component.ts#L87)

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

[packages/sitecore-jss-angular/src/components/form.component.ts:78](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/form.component.ts#L78)

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

[packages/sitecore-jss-angular/src/components/form.component.ts:68](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-angular/src/components/form.component.ts#L68)
