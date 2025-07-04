[**@sitecore-jss/sitecore-jss-nextjs**](../../../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../../../README.md) / [index](../../../README.md) / [BYOCWrapper](../README.md) / getStaticProps

# Function: getStaticProps()

> **getStaticProps**(`rendering`, `layoutData`, `context`): `Promise`\<`unknown`\>

Will be called during SSG

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rendering` | [`ComponentRendering`](../../../interfaces/ComponentRendering.md)\<[`ComponentFields`](../../../interfaces/ComponentFields.md)\> |  |
| `layoutData` | [`LayoutServiceData`](../../../interfaces/LayoutServiceData.md) | - |
| `context` | `GetStaticPropsContext` | - |

## Returns

`Promise`\<`unknown`\>

context

## Defined in

[sitecore-jss-nextjs/src/components/BYOCWrapper.tsx:22](https://github.com/Sitecore/jss/blob/aea19a93d5f4579420e42987ed16bb5c1676f06f/packages/sitecore-jss-nextjs/src/components/BYOCWrapper.tsx#L22)
