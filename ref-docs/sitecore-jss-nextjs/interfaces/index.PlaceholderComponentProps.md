[@sitecore-jss/sitecore-jss-nextjs](../README.md) / [index](../modules/index.md) / PlaceholderComponentProps

# Interface: PlaceholderComponentProps

[index](../modules/index.md).PlaceholderComponentProps

## Hierarchy

- `PlaceholderProps`

  ↳ **`PlaceholderComponentProps`**

## Table of contents

### Properties

- [componentFactory](index.PlaceholderComponentProps.md#componentfactory)
- [errorComponent](index.PlaceholderComponentProps.md#errorcomponent)
- [fields](index.PlaceholderComponentProps.md#fields)
- [hiddenRenderingComponent](index.PlaceholderComponentProps.md#hiddenrenderingcomponent)
- [missingComponentComponent](index.PlaceholderComponentProps.md#missingcomponentcomponent)
- [modifyComponentProps](index.PlaceholderComponentProps.md#modifycomponentprops)
- [name](index.PlaceholderComponentProps.md#name)
- [params](index.PlaceholderComponentProps.md#params)
- [render](index.PlaceholderComponentProps.md#render)
- [renderEach](index.PlaceholderComponentProps.md#rendereach)
- [renderEmpty](index.PlaceholderComponentProps.md#renderempty)
- [rendering](index.PlaceholderComponentProps.md#rendering)

## Properties

### componentFactory

• `Optional` **componentFactory**: [`ComponentFactory`](../modules/index.md#componentfactory)

A factory function that will receive a componentName and return an instance of a React component.
When rendered within a <SitecoreContext> component, defaults to the context componentFactory.

#### Inherited from

PlaceholderProps.componentFactory

#### Defined in

sitecore-jss-react/types/components/PlaceholderCommon.d.ts:24

___

### errorComponent

• `Optional` **errorComponent**: `ComponentClass`<`ErrorComponentProps`, `any`\> \| `FC`<`ErrorComponentProps`\>

A component that is rendered in place of the placeholder when an error occurs rendering
the placeholder

#### Inherited from

PlaceholderProps.errorComponent

#### Defined in

sitecore-jss-react/types/components/PlaceholderCommon.d.ts:59

___

### fields

• `Optional` **fields**: `Object`

An object of field names/values that are aggregated and propagated through the component tree created by a placeholder.
Any component or placeholder rendered by a placeholder will have access to this data via `props.fields`.

#### Index signature

▪ [name: `string`]: [`Field`](index.Field.md) \| [`Item`](index.Item.md)[]

#### Inherited from

PlaceholderProps.fields

#### Defined in

sitecore-jss-react/types/components/PlaceholderCommon.d.ts:29

___

### hiddenRenderingComponent

• `Optional` **hiddenRenderingComponent**: `ComponentClass`<`unknown`, `any`\> \| `FC`<`unknown`\>

A component that is rendered in place of any components that are hidden

#### Inherited from

PlaceholderProps.hiddenRenderingComponent

#### Defined in

sitecore-jss-react/types/components/PlaceholderCommon.d.ts:54

___

### missingComponentComponent

• `Optional` **missingComponentComponent**: `ComponentClass`<`unknown`, `any`\> \| `FC`<`unknown`\>

A component that is rendered in place of any components that are in this placeholder,
but do not have a definition in the componentFactory (i.e. don't have a React implementation)

#### Inherited from

PlaceholderProps.missingComponentComponent

#### Defined in

sitecore-jss-react/types/components/PlaceholderCommon.d.ts:50

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

sitecore-jss-react/types/components/PlaceholderCommon.d.ts:45

___

### name

• **name**: `string`

Name of the placeholder to render.

#### Inherited from

PlaceholderProps.name

#### Defined in

sitecore-jss-react/types/components/PlaceholderCommon.d.ts:17

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

sitecore-jss-react/types/components/PlaceholderCommon.d.ts:36

___

### render

• `Optional` **render**: (`components`: `ReactNode`[], `data`: ([`ComponentRendering`](index.ComponentRendering.md) \| [`HtmlElementRendering`](index.HtmlElementRendering.md))[], `props`: `PlaceholderProps`) => `ReactNode`

#### Type declaration

▸ (`components`, `data`, `props`): `ReactNode`

Render props function that enables control over the rendering of the components in the placeholder.
Useful for techniques like wrapping each child in a wrapper component.

##### Parameters

| Name | Type |
| :------ | :------ |
| `components` | `ReactNode`[] |
| `data` | ([`ComponentRendering`](index.ComponentRendering.md) \| [`HtmlElementRendering`](index.HtmlElementRendering.md))[] |
| `props` | `PlaceholderProps` |

##### Returns

`ReactNode`

#### Defined in

sitecore-jss-react/types/components/Placeholder.d.ts:15

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

sitecore-jss-react/types/components/Placeholder.d.ts:20

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

sitecore-jss-react/types/components/Placeholder.d.ts:10

___

### rendering

• **rendering**: [`ComponentRendering`](index.ComponentRendering.md) \| [`RouteData`](index.RouteData.md)<`Record`<`string`, [`Field`](index.Field.md)<`GenericFieldValue`\> \| [`Item`](index.Item.md) \| [`Item`](index.Item.md)[]\>\>

Rendering data to be used when rendering the placeholder.

#### Inherited from

PlaceholderProps.rendering

#### Defined in

sitecore-jss-react/types/components/PlaceholderCommon.d.ts:19
