[**@sitecore-jss/sitecore-jss**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / addComponentUpdateHandler

# Function: addComponentUpdateHandler()

> **addComponentUpdateHandler**(`rootComponent`, `successCallback`?): `undefined` \| () => `void`

Adds the browser-side event handler for 'component:update' message used in Component Library
The event should update a component on page by uid, with fields and params from event args

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rootComponent` | [`ComponentRendering`](../../layout/interfaces/ComponentRendering.md)\<[`ComponentFields`](../../layout/interfaces/ComponentFields.md)\> | root component displayed for Component Library page |
| `successCallback`? | (`updatedRootComponent`) => `void` | callback to be called after successful component update |

## Returns

`undefined` \| () => `void`

## Defined in

[packages/sitecore-jss/src/editing/utils.ts:196](https://github.com/Sitecore/jss/blob/32e43cec490a623a675f03f30cb52f47552c878c/packages/sitecore-jss/src/editing/utils.ts#L196)