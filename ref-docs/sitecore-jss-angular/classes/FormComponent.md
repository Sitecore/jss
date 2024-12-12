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

[packages/sitecore-jss-angular/src/components/form.component.ts:62](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/form.component.ts#L62)

## Properties

### hasError

> **hasError**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:56](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/form.component.ts#L56)

***

### isEditing

> **isEditing**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:58](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/form.component.ts#L58)

***

### rendering

> **rendering**: `FormRendering`

The rendering data for the component

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:54](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/form.component.ts#L54)

## Methods

### executeScriptElements()

> **executeScriptElements**(): `void`

When you set the innerHTML property of an element, the browser does not execute any <script> tags included in the HTML string
This method ensures that any <script> elements within the loaded HTML are executed.
It re-creates the script elements and appends the to the component's template, then removes old script elements to avoid duplication.

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:173](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/form.component.ts#L173)

***

### loadForm()

> **loadForm**(): `Promise`\<`void`\>

Fetches the form markup from the Sitecore Edge service and renders it in the component's template.

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:88](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/form.component.ts#L88)

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

[packages/sitecore-jss-angular/src/components/form.component.ts:79](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/form.component.ts#L79)

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

[packages/sitecore-jss-angular/src/components/form.component.ts:69](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/form.component.ts#L69)

***

### subscribeToFormSubmitEvent()

> **subscribeToFormSubmitEvent**(): `void`

Subscribes to the custom "form:engage" event and sends data to CloudSDK.
This listener captures interactions such as form views or submissions

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:145](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/form.component.ts#L145)
