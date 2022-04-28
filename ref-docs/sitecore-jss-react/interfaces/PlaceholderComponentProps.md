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
- [name](PlaceholderComponentProps.md#name)
- [params](PlaceholderComponentProps.md#params)
- [rendering](PlaceholderComponentProps.md#rendering)

### Methods

- [modifyComponentProps](PlaceholderComponentProps.md#modifycomponentprops)
- [render](PlaceholderComponentProps.md#render)
- [renderEach](PlaceholderComponentProps.md#rendereach)
- [renderEmpty](PlaceholderComponentProps.md#renderempty)

## Properties

### componentFactory

• `Optional` **componentFactory**: [`ComponentFactory`](../README.md#componentfactory)

A factory function that will receive a componentName and return an instance of a React component.
When rendered within a <SitecoreContext> component, defaults to the context componentFactory.

#### Inherited from

PlaceholderProps.componentFactory

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:35](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L35)

___

### errorComponent

• `Optional` **errorComponent**: `ComponentClass`<`ErrorComponentProps`, `any`\> \| `FC`<`ErrorComponentProps`\>

A component that is rendered in place of the placeholder when an error occurs rendering
the placeholder

#### Inherited from

PlaceholderProps.errorComponent

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:72](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L72)

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

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:40](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L40)

___

### hiddenRenderingComponent

• `Optional` **hiddenRenderingComponent**: `ComponentClass`<`unknown`, `any`\> \| `FC`<`unknown`\>

A component that is rendered in place of any components that are hidden

#### Inherited from

PlaceholderProps.hiddenRenderingComponent

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:66](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L66)

___

### missingComponentComponent

• `Optional` **missingComponentComponent**: `ComponentClass`<`unknown`, `any`\> \| `FC`<`unknown`\>

A component that is rendered in place of any components that are in this placeholder,
but do not have a definition in the componentFactory (i.e. don't have a React implementation)

#### Inherited from

PlaceholderProps.missingComponentComponent

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:61](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L61)

___

### name

• **name**: `string`

Name of the placeholder to render.

#### Inherited from

PlaceholderProps.name

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:28](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L28)

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

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:47](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L47)

___

### rendering

• **rendering**: [`RouteData`](RouteData.md) \| [`ComponentRendering`](ComponentRendering.md)

Rendering data to be used when rendering the placeholder.

#### Inherited from

PlaceholderProps.rendering

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:30](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L30)

## Methods

### modifyComponentProps

▸ `Optional` **modifyComponentProps**(`componentProps`): `ComponentProps`

Modify final props of component (before render) provided by rendering data.
Can be used in case when you need to insert additional data into the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentProps` | `ComponentProps` | component props to be modified |

#### Returns

`ComponentProps`

modified or initial props

#### Inherited from

PlaceholderProps.modifyComponentProps

#### Defined in

[sitecore-jss-react/src/components/PlaceholderCommon.tsx:56](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L56)

___

### render

▸ `Optional` **render**(`components`, `data`, `props`): `ComponentClass`<`unknown`, `any`\> \| `ReactNode` \| `SFC`<`unknown`\>

Render props function that enables control over the rendering of the components in the placeholder.
Useful for techniques like wrapping each child in a wrapper component.

#### Parameters

| Name | Type |
| :------ | :------ |
| `components` | `ReactNode`[] |
| `data` | ([`HtmlElementRendering`](HtmlElementRendering.md) \| [`ComponentRendering`](ComponentRendering.md))[] |
| `props` | `PlaceholderProps` |

#### Returns

`ComponentClass`<`unknown`, `any`\> \| `ReactNode` \| `SFC`<`unknown`\>

#### Defined in

[sitecore-jss-react/src/components/Placeholder.tsx:19](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/Placeholder.tsx#L19)

___

### renderEach

▸ `Optional` **renderEach**(`component`, `index`): `ComponentClass`<`unknown`, `any`\> \| `ReactNode` \| `SFC`<`unknown`\>

Render props function that is called for each non-system component added to the placeholder.
Mutually exclusive with `render`. System components added during Experience Editor are automatically rendered as-is.

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | `ReactNode` |
| `index` | `number` |

#### Returns

`ComponentClass`<`unknown`, `any`\> \| `ReactNode` \| `SFC`<`unknown`\>

#### Defined in

[sitecore-jss-react/src/components/Placeholder.tsx:29](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/Placeholder.tsx#L29)

___

### renderEmpty

▸ `Optional` **renderEmpty**(`components`): `ComponentClass`<`unknown`, `any`\> \| `ReactNode` \| `SFC`<`unknown`\>

Render props function that is called when the placeholder contains no content components.
Can be used to wrap the Sitecore EE empty placeholder markup in something that's visually correct

#### Parameters

| Name | Type |
| :------ | :------ |
| `components` | `ReactNode`[] |

#### Returns

`ComponentClass`<`unknown`, `any`\> \| `ReactNode` \| `SFC`<`unknown`\>

#### Defined in

[sitecore-jss-react/src/components/Placeholder.tsx:12](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-react/src/components/Placeholder.tsx#L12)
