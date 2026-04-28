[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / addComponentUpdateHandler

# Function: addComponentUpdateHandler()

<<<<<<< HEAD
> **addComponentUpdateHandler**(`rootComponent`, `successCallback?`): `undefined` \| () => `void`

Defined in: [packages/sitecore-jss/src/editing/design-library.ts:47](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss/src/editing/design-library.ts#L47)
=======
> **addComponentUpdateHandler**(`rootComponent`, `successCallback?`): (() => `void`) \| `undefined`

Defined in: [packages/sitecore-jss/src/editing/design-library.ts:47](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss/src/editing/design-library.ts#L47)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Adds the browser-side event handler for 'component:update' message used in Design Library
The event should update a component on page by uid, with fields and params from event args

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rootComponent` | [`ComponentRendering`](../../layout/interfaces/ComponentRendering.md) | root component displayed for Design Library page |
| `successCallback?` | (`updatedRootComponent`) => `void` | callback to be called after successful component update |

## Returns

<<<<<<< HEAD
`undefined` \| () => `void`
=======
(() => `void`) \| `undefined`
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028
