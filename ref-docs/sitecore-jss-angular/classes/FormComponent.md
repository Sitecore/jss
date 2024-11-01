[@sitecore-jss/sitecore-jss-angular](../README.md) / FormComponent

# Class: FormComponent

A component that renders a Sitecore Form.
It fetches the form markup from the Sitecore Edge service and renders it in the component's template.

## Implements

- `OnInit`
- `OnDestroy`

## Table of contents

### Constructors

- [constructor](FormComponent.md#constructor)

### Properties

- [contextSubscription](FormComponent.md#contextsubscription)
- [edgeConfig](FormComponent.md#edgeconfig)
- [elRef](FormComponent.md#elref)
- [hasError](FormComponent.md#haserror)
- [isEditing](FormComponent.md#isediting)
- [jssState](FormComponent.md#jssstate)
- [platformId](FormComponent.md#platformid)
- [rendering](FormComponent.md#rendering)

### Methods

- [executeScriptElements](FormComponent.md#executescriptelements)
- [loadForm](FormComponent.md#loadform)
- [ngOnDestroy](FormComponent.md#ngondestroy)
- [ngOnInit](FormComponent.md#ngoninit)

## Constructors

### constructor

• **new FormComponent**(`edgeConfig`, `platformId`, `elRef`, `jssState`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `edgeConfig` | `EdgeConfigToken` |
| `platformId` | `Object` |
| `elRef` | `ElementRef`\<`HTMLElement`\> |
| `jssState` | [`JssStateService`](JssStateService.md)\<[`BaseJssState`](BaseJssState.md)\> |

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:61](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L61)

## Properties

### contextSubscription

• `Private` **contextSubscription**: `Subscription`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:59](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L59)

___

### edgeConfig

• `Private` **edgeConfig**: `EdgeConfigToken`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:62](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L62)

___

### elRef

• `Private` **elRef**: `ElementRef`\<`HTMLElement`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:64](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L64)

___

### hasError

• **hasError**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:55](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L55)

___

### isEditing

• **isEditing**: `boolean` = `false`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:57](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L57)

___

### jssState

• `Private` **jssState**: [`JssStateService`](JssStateService.md)\<[`BaseJssState`](BaseJssState.md)\>

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:65](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L65)

___

### platformId

• `Private` **platformId**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:63](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L63)

___

### rendering

• **rendering**: `FormRendering`

The rendering data for the component

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:53](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L53)

## Methods

### executeScriptElements

▸ **executeScriptElements**(): `void`

When you set the innerHTML property of an element, the browser does not execute any <script> tags included in the HTML string
This method ensures that any <script> elements within the loaded HTML are executed.
It re-creates the script elements and appends the to the component's template, then removes old script elements to avoid duplication.

#### Returns

`void`

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:144](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L144)

___

### loadForm

▸ **loadForm**(): `Promise`\<`void`\>

Fetches the form markup from the Sitecore Edge service and renders it in the component's template.

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:87](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L87)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:78](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L78)

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[packages/sitecore-jss-angular/src/components/form.component.ts:68](https://github.com/Sitecore/jss/blob/dcd70ff8b/packages/sitecore-jss-angular/src/components/form.component.ts#L68)
