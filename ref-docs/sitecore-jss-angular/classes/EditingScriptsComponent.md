[@sitecore-jss/sitecore-jss-angular](../README.md) / EditingScriptsComponent

# Class: EditingScriptsComponent

Component that renders editing scripts and client data for the current page in Sitecore Editor.
Only renders scripts when Metadata mode is used.

## Implements

- `OnInit`

## Table of contents

### Constructors

- [constructor](EditingScriptsComponent.md#constructor)

### Properties

- [document](EditingScriptsComponent.md#document)
- [renderer](EditingScriptsComponent.md#renderer)
- [stateService](EditingScriptsComponent.md#stateservice)

### Methods

- [ngOnInit](EditingScriptsComponent.md#ngoninit)

## Constructors

### constructor

• **new EditingScriptsComponent**(`renderer`, `stateService`, `document`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderer` | `Renderer2` |
| `stateService` | [`JssStateService`](JssStateService.md)\<[`BaseJssState`](BaseJssState.md)\> |
| `document` | `Document` |

#### Defined in

[packages/sitecore-jss-angular/src/components/editing-scripts.component.ts:16](https://github.com/Sitecore/jss/blob/2794c8c94/packages/sitecore-jss-angular/src/components/editing-scripts.component.ts#L16)

## Properties

### document

• `Private` **document**: `Document`

#### Defined in

[packages/sitecore-jss-angular/src/components/editing-scripts.component.ts:19](https://github.com/Sitecore/jss/blob/2794c8c94/packages/sitecore-jss-angular/src/components/editing-scripts.component.ts#L19)

___

### renderer

• `Private` **renderer**: `Renderer2`

#### Defined in

[packages/sitecore-jss-angular/src/components/editing-scripts.component.ts:17](https://github.com/Sitecore/jss/blob/2794c8c94/packages/sitecore-jss-angular/src/components/editing-scripts.component.ts#L17)

___

### stateService

• `Private` **stateService**: [`JssStateService`](JssStateService.md)\<[`BaseJssState`](BaseJssState.md)\>

#### Defined in

[packages/sitecore-jss-angular/src/components/editing-scripts.component.ts:18](https://github.com/Sitecore/jss/blob/2794c8c94/packages/sitecore-jss-angular/src/components/editing-scripts.component.ts#L18)

## Methods

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[packages/sitecore-jss-angular/src/components/editing-scripts.component.ts:22](https://github.com/Sitecore/jss/blob/2794c8c94/packages/sitecore-jss-angular/src/components/editing-scripts.component.ts#L22)
