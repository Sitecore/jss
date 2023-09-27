[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](index.md) / FEaaSWrapper

# Namespace: FEaaSWrapper

[index](index.md).FEaaSWrapper

## Table of contents

### Functions

- [default](index.FEaaSWrapper.md#default)
- [getServerSideProps](index.FEaaSWrapper.md#getserversideprops)
- [getStaticProps](index.FEaaSWrapper.md#getstaticprops)

## Functions

### default

▸ **default**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FEaaSComponentProps`](index.md#feaascomponentprops) |

#### Returns

`Element`

#### Defined in

sitecore-jss-react/types/components/FEaaSWrapper.d.ts:3

___

### getServerSideProps

▸ **getServerSideProps**(`rendering`, `layoutData`, `context`): `Promise`<`unknown`\>

Will be called during SSR

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](../interfaces/index.ComponentRendering.md) |
| `layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |
| `context` | `GetServerSidePropsContext`<`ParsedUrlQuery`, `PreviewData`\> |

#### Returns

`Promise`<`unknown`\>

context

#### Defined in

[sitecore-jss-nextjs/src/sharedTypes/component-props.ts:17](https://github.com/Sitecore/jss/blob/16ece717c/packages/sitecore-jss-nextjs/src/sharedTypes/component-props.ts#L17)

___

### getStaticProps

▸ **getStaticProps**(`rendering`, `layoutData`, `context`): `Promise`<`unknown`\>

Will be called during SSG

#### Parameters

| Name | Type |
| :------ | :------ |
| `rendering` | [`ComponentRendering`](../interfaces/index.ComponentRendering.md) |
| `layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |
| `context` | `GetStaticPropsContext`<`ParsedUrlQuery`, `PreviewData`\> |

#### Returns

`Promise`<`unknown`\>

context

#### Defined in

[sitecore-jss-nextjs/src/sharedTypes/component-props.ts:17](https://github.com/Sitecore/jss/blob/16ece717c/packages/sitecore-jss-nextjs/src/sharedTypes/component-props.ts#L17)
