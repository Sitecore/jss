[**@sitecore-jss/sitecore-jss-nextjs**](../../../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../../../README.md) / [index](../../../README.md) / [FEaaSWrapper](../README.md) / getServerSideProps

# Function: getServerSideProps()

> **getServerSideProps**(`rendering`, `layoutData`, `context`): `Promise`\<`unknown`\>

Will be called during SSR

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rendering` | [`ComponentRendering`](../../../interfaces/ComponentRendering.md)\<[`ComponentFields`](../../../interfaces/ComponentFields.md)\> |  |
| `layoutData` | [`LayoutServiceData`](../../../interfaces/LayoutServiceData.md) |  |
| `context` | `GetServerSidePropsContext` | - |

## Returns

`Promise`\<`unknown`\>

context

## Defined in

[sitecore-jss-nextjs/src/components/FEaaSWrapper.tsx:41](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-nextjs/src/components/FEaaSWrapper.tsx#L41)
