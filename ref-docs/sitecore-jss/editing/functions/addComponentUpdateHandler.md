[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / addComponentUpdateHandler

# Function: addComponentUpdateHandler()

> **addComponentUpdateHandler**(`rootComponent`, `successCallback?`): () => `void` \| `undefined`

Defined in: [packages/sitecore-jss/src/editing/design-library.ts:47](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss/src/editing/design-library.ts#L47)

Adds the browser-side event handler for 'component:update' message used in Design Library
The event should update a component on page by uid, with fields and params from event args

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rootComponent` | [`ComponentRendering`](../../layout/interfaces/ComponentRendering.md) | root component displayed for Design Library page |
| `successCallback?` | (`updatedRootComponent`) => `void` | callback to be called after successful component update |

## Returns

() => `void` \| `undefined`
