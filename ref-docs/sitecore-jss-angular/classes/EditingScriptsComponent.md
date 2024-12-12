[**@sitecore-jss/sitecore-jss-angular**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / EditingScriptsComponent

# Class: EditingScriptsComponent

Component that renders editing scripts and client data for the current page in Sitecore Editor.
Only renders scripts when Metadata mode is used.

## Implements

- `OnInit`

## Constructors

### new EditingScriptsComponent()

> **new EditingScriptsComponent**(`renderer`, `stateService`, `document`): [`EditingScriptsComponent`](EditingScriptsComponent.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `renderer` | `Renderer2` |
| `stateService` | [`JssStateService`](JssStateService.md)\<[`BaseJssState`](BaseJssState.md)\> |
| `document` | `Document` |

#### Returns

[`EditingScriptsComponent`](EditingScriptsComponent.md)

#### Defined in

[packages/sitecore-jss-angular/src/components/editing-scripts.component.ts:17](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/editing-scripts.component.ts#L17)

## Methods

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

[packages/sitecore-jss-angular/src/components/editing-scripts.component.ts:23](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-angular/src/components/editing-scripts.component.ts#L23)
