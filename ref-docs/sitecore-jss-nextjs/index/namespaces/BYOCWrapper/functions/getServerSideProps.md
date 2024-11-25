[**@sitecore-jss/sitecore-jss-nextjs**](../../../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../../../README.md) / [index](../../../README.md) / [BYOCWrapper](../README.md) / getServerSideProps

# Function: getServerSideProps()

> **getServerSideProps**(`rendering`, `layoutData`, `context`): `Promise`\<`unknown`\>

Will be called during SSR

## Parameters

• **rendering**: [`ComponentRendering`](../../../interfaces/ComponentRendering.md)\<[`ComponentFields`](../../../interfaces/ComponentFields.md)\>

• **layoutData**: [`LayoutServiceData`](../../../interfaces/LayoutServiceData.md)

• **context**: `GetServerSidePropsContext`

## Returns

`Promise`\<`unknown`\>

context

## Defined in

[sitecore-jss-nextjs/src/components/BYOCWrapper.tsx:36](https://github.com/Sitecore/jss/blob/b5a46b615f5ff23027c5e9a755573e12c4212373/packages/sitecore-jss-nextjs/src/components/BYOCWrapper.tsx#L36)
