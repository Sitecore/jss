[@sitecore-jss/sitecore-jss-react](../README.md) / PlaceholderComponentProps

# Interface: PlaceholderComponentProps

## Hierarchy

- `PlaceholderProps`

  ↳ **`PlaceholderComponentProps`**

## Table of contents

### Properties

- [componentFactory](PlaceholderComponentProps.md#componentfactory)
- [errorComponent](PlaceholderComponentProps.md#errorcomponent)
- [fields](PlaceholderComponentProps.md#fields)
- [hiddenRenderingComponent](PlaceholderComponentProps.md#hiddenrenderingcomponent)
- [missingComponentComponent](PlaceholderComponentProps.md#missingcomponentcomponent)
- [modifyComponentProps](PlaceholderComponentProps.md#modifycomponentprops)
- [name](PlaceholderComponentProps.md#name)
- [params](PlaceholderComponentProps.md#params)
- [render](PlaceholderComponentProps.md#render)
- [renderEach](PlaceholderComponentProps.md#rendereach)
- [renderEmpty](PlaceholderComponentProps.md#renderempty)
- [rendering](PlaceholderComponentProps.md#rendering)

## Properties

### componentFactory

• `Optional` **componentFactory**: [`ComponentFactory`](../README.md#componentfactory)

A factory function that will receive a componentName and return an instance of a React component.
When rendered within a <SitecoreContext> component, defaults to the context componentFactory.

#### Inherited from

PlaceholderProps.componentFactory

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:48](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L48)

___

### errorComponent

• `Optional` **errorComponent**: `ComponentClass`<`ErrorComponentProps`, `any`\> \| `FC`<`ErrorComponentProps`\>

A component that is rendered in place of the placeholder when an error occurs rendering
the placeholder

#### Inherited from

PlaceholderProps.errorComponent

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:85](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L85)

___

### fields

• `Optional` **fields**: `Object`

An object of field names/values that are aggregated and propagated through the component tree created by a placeholder.
Any component or placeholder rendered by a placeholder will have access to this data via `props.fields`.

#### Index signature

▪ [name: `string`]: [`Field`](Field.md) \| [`Item`](Item.md)[]

#### Inherited from

PlaceholderProps.fields

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:53](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L53)

___

### hiddenRenderingComponent

• `Optional` **hiddenRenderingComponent**: `ComponentClass`<`unknown`, `any`\> \| `FC`<`unknown`\>

A component that is rendered in place of any components that are hidden

#### Inherited from

PlaceholderProps.hiddenRenderingComponent

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:79](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L79)

___

### missingComponentComponent

• `Optional` **missingComponentComponent**: `ComponentClass`<`unknown`, `any`\> \| `FC`<`unknown`\>

A component that is rendered in place of any components that are in this placeholder,
but do not have a definition in the componentFactory (i.e. don't have a React implementation)

#### Inherited from

PlaceholderProps.missingComponentComponent

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:74](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L74)

___

### modifyComponentProps

• `Optional` **modifyComponentProps**: (`componentProps`: `ComponentProps`) => `ComponentProps`

#### Type declaration

▸ (`componentProps`): `ComponentProps`

Modify final props of component (before render) provided by rendering data.
Can be used in case when you need to insert additional data into the component.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentProps` | `ComponentProps` | component props to be modified |

##### Returns

`ComponentProps`

modified or initial props

#### Inherited from

PlaceholderProps.modifyComponentProps

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:69](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L69)

___

### name

• **name**: `string`

Name of the placeholder to render.

#### Inherited from

PlaceholderProps.name

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:41](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L41)

___

### params

• `Optional` **params**: `Object`

An object of rendering parameter names/values that are aggregated and propagated through the component tree created by a placeholder.
Any component or placeholder rendered by a placeholder will have access to this data via `props.params`.

#### Index signature

▪ [name: `string`]: `string`

#### Inherited from

PlaceholderProps.params

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:60](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L60)

___

### render

• `Optional` **render**: (`components`: `ReactNode`[], `data`: ([`ComponentRendering`](ComponentRendering.md) \| [`HtmlElementRendering`](HtmlElementRendering.md))[], `props`: `PlaceholderProps`) => `ReactNode`

#### Type declaration

▸ (`components`, `data`, `props`): `ReactNode`

Render props function that enables control over the rendering of the components in the placeholder.
Useful for techniques like wrapping each child in a wrapper component.

##### Parameters

| Name | Type |
| :------ | :------ |
| `components` | `ReactNode`[] |
| `data` | ([`ComponentRendering`](ComponentRendering.md) \| [`HtmlElementRendering`](HtmlElementRendering.md))[] |
| `props` | `PlaceholderProps` |

##### Returns

`ReactNode`

#### Defined in

[sitecore-jss-react/src/components/Placeholder.tsx:17](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/Placeholder.tsx#L17)

___

### renderEach

• `Optional` **renderEach**: (`component`: `ReactNode`, `index`: `number`) => `ReactNode`

#### Type declaration

▸ (`component`, `index`): `ReactNode`

Render props function that is called for each non-system component added to the placeholder.
Mutually exclusive with `render`. System components added during Experience Editor are automatically rendered as-is.

##### Parameters

| Name | Type |
| :------ | :------ |
| `component` | `ReactNode` |
| `index` | `number` |

##### Returns

`ReactNode`

#### Defined in

[sitecore-jss-react/src/components/Placeholder.tsx:27](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/Placeholder.tsx#L27)

___

### renderEmpty

• `Optional` **renderEmpty**: (`components`: `ReactNode`[]) => `ReactNode`

#### Type declaration

▸ (`components`): `ReactNode`

Render props function that is called when the placeholder contains no content components.
Can be used to wrap the Sitecore EE empty placeholder markup in something that's visually correct

##### Parameters

| Name | Type |
| :------ | :------ |
| `components` | `ReactNode`[] |

##### Returns

`ReactNode`

#### Defined in

[sitecore-jss-react/src/components/Placeholder.tsx:12](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/Placeholder.tsx#L12)

___

### rendering

• **rendering**: [`ComponentRendering`](ComponentRendering.md) \| [`RouteData`](RouteData.md)<`Record`<`string`, [`Field`](Field.md)<`GenericFieldValue`\> \| [`Item`](Item.md) \| [`Item`](Item.md)[]\>\>

Rendering data to be used when rendering the placeholder.

#### Inherited from

PlaceholderProps.rendering

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:43](https://github.com/Sitecore/jss/blob/361a71f79/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L43)
