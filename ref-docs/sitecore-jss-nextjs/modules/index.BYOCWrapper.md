[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](index.md) / BYOCWrapper

# Namespace: BYOCWrapper

[index](index.md).BYOCWrapper

## Table of contents

### Functions

- [default](index.BYOCWrapper.md#default)
- [getServerSideProps](index.BYOCWrapper.md#getserversideprops)
- [getStaticProps](index.BYOCWrapper.md#getstaticprops)

## Functions

### default

▸ **default**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BYOCComponentProps`](index.md#byoccomponentprops) |

#### Returns

`Element`

#### Defined in

sitecore-jss-react/types/components/BYOCWrapper.d.ts:3

___

### getServerSideProps

▸ **getServerSideProps**(`rendering`, `layoutData`, `context`): `Promise`\<`unknown`\>

Will be called during SSR

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](../interfaces/index.ComponentRendering.md) |
| `layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |
| `context` | `GetServerSidePropsContext`\<`ParsedUrlQuery`, `PreviewData`\> |

#### Returns

`Promise`\<`unknown`\>

context

#### Defined in

[sitecore-jss-nextjs/src/sharedTypes/component-props.ts:17](https://github.com/Sitecore/jss/blob/a6aceacd9/packages/sitecore-jss-nextjs/src/sharedTypes/component-props.ts#L17)

___

### getStaticProps

▸ **getStaticProps**(`rendering`, `layoutData`, `context`): `Promise`\<`unknown`\>

Will be called during SSG

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](../interfaces/index.ComponentRendering.md) |
| `layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |
| `context` | `GetStaticPropsContext`\<`ParsedUrlQuery`, `PreviewData`\> |

#### Returns

`Promise`\<`unknown`\>

context

#### Defined in

[sitecore-jss-nextjs/src/sharedTypes/component-props.ts:17](https://github.com/Sitecore/jss/blob/a6aceacd9/packages/sitecore-jss-nextjs/src/sharedTypes/component-props.ts#L17)
