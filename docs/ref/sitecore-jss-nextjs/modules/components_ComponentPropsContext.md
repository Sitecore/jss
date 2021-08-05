[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / components/ComponentPropsContext

# Module: components/ComponentPropsContext

## Table of contents

### Type aliases

- [ComponentPropsContextProps](components_ComponentPropsContext.md#componentpropscontextprops)

### Variables

- [ComponentPropsReactContext](components_ComponentPropsContext.md#componentpropsreactcontext)

### Functions

- [ComponentPropsContext](components_ComponentPropsContext.md#componentpropscontext)
- [useComponentProps](components_ComponentPropsContext.md#usecomponentprops)

## Type aliases

### ComponentPropsContextProps

Ƭ **ComponentPropsContextProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `ReactNode` |
| `value` | [`ComponentPropsCollection`](sharedTypes_component_props.md#componentpropscollection) |

#### Defined in

[src/components/ComponentPropsContext.tsx:21](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx#L21)

## Variables

### ComponentPropsReactContext

• `Const` **ComponentPropsReactContext**: `Context`<[`ComponentPropsCollection`](sharedTypes_component_props.md#componentpropscollection)\>

Component props context which we are using in order to store data fetched on components level (getStaticProps/getServerSideProps)

#### Defined in

[src/components/ComponentPropsContext.tsx:7](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx#L7)

## Functions

### ComponentPropsContext

▸ `Const` **ComponentPropsContext**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ComponentPropsContextProps`](components_ComponentPropsContext.md#componentpropscontextprops) |

#### Returns

`Element`

#### Defined in

[src/components/ComponentPropsContext.tsx:26](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx#L26)

___

### useComponentProps

▸ **useComponentProps**<`ComponentData`\>(`componentUid`): `ComponentData`

Hook in order to get access to props related to specific component. Data comes from ComponentPropsContext.

**`see`** ComponentPropsContext

#### Type parameters

| Name |
| :------ |
| `ComponentData` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentUid` | `string` | component uId |

#### Returns

`ComponentData`

component props

#### Defined in

[src/components/ComponentPropsContext.tsx:15](https://github.com/Sitecore/jss/blob/e49fd4cc/packages/sitecore-jss-nextjs/src/components/ComponentPropsContext.tsx#L15)
