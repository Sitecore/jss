[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / sharedTypes/component-props

# Module: sharedTypes/component-props

## Table of contents

### Type aliases

- [ComponentPropsCollection](sharedTypes_component_props.md#componentpropscollection)
- [ComponentPropsFetchFunction](sharedTypes_component_props.md#componentpropsfetchfunction)
- [GetServerSideComponentProps](sharedTypes_component_props.md#getserversidecomponentprops)
- [GetStaticComponentProps](sharedTypes_component_props.md#getstaticcomponentprops)

## Type aliases

### ComponentPropsCollection

Ƭ **ComponentPropsCollection**: `Object`

Shape of component props storage

#### Index signature

▪ [componentUid: `string`]: `unknown`

#### Defined in

[src/sharedTypes/component-props.ts:7](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/sharedTypes/component-props.ts#L7)

___

### ComponentPropsFetchFunction

Ƭ **ComponentPropsFetchFunction**<`NextContext`, `FetchedProps`\>: (`rendering`: [`ComponentRendering`](../interfaces/index.ComponentRendering.md), `layoutData`: [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md), `context`: `NextContext`) => `Promise`<`FetchedProps`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NextContext` | `NextContext` |
| `FetchedProps` | `unknown` |

#### Type declaration

▸ (`rendering`, `layoutData`, `context`): `Promise`<`FetchedProps`\>

Type of side effect function which could be invoked on component level (getStaticProps/getServerSideProps)

##### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](../interfaces/index.ComponentRendering.md) |
| `layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |
| `context` | `NextContext` |

##### Returns

`Promise`<`FetchedProps`\>

#### Defined in

[src/sharedTypes/component-props.ts:14](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/sharedTypes/component-props.ts#L14)

___

### GetServerSideComponentProps

Ƭ **GetServerSideComponentProps**: [`ComponentPropsFetchFunction`](sharedTypes_component_props.md#componentpropsfetchfunction)<`GetServerSidePropsContext`\>

Shape of getServerSideProps function on component level

#### Defined in

[src/sharedTypes/component-props.ts:23](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/sharedTypes/component-props.ts#L23)

___

### GetStaticComponentProps

Ƭ **GetStaticComponentProps**: [`ComponentPropsFetchFunction`](sharedTypes_component_props.md#componentpropsfetchfunction)<`GetStaticPropsContext`\>

Shape of getStaticProps function on component level

#### Defined in

[src/sharedTypes/component-props.ts:28](https://github.com/Sitecore/jss/blob/8c00be96/packages/sitecore-jss-nextjs/src/sharedTypes/component-props.ts#L28)
