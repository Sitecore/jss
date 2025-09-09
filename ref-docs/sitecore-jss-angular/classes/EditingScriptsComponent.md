[**@sitecore-jss/sitecore-jss-angular**](../README.md)

***

[@sitecore-jss/sitecore-jss-angular](../README.md) / EditingScriptsComponent

# Class: EditingScriptsComponent

Defined in: [packages/sitecore-jss-angular/src/components/editing-scripts.component.ts:16](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-angular/src/components/editing-scripts.component.ts#L16)

Component that renders editing scripts and client data for the current page in Sitecore Editor.
Only renders scripts when Metadata mode is used.

## Implements

- `OnInit`

## Constructors

### Constructor

> **new EditingScriptsComponent**(`renderer`, `stateService`, `document`): `EditingScriptsComponent`

Defined in: [packages/sitecore-jss-angular/src/components/editing-scripts.component.ts:17](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-angular/src/components/editing-scripts.component.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `renderer` | `Renderer2` |
| `stateService` | [`JssStateService`](JssStateService.md) |
| `document` | `Document` |

#### Returns

`EditingScriptsComponent`

## Methods

### ngOnInit()

> **ngOnInit**(): `void`

Defined in: [packages/sitecore-jss-angular/src/components/editing-scripts.component.ts:23](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-angular/src/components/editing-scripts.component.ts#L23)

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`
