[@sitecore-jss/sitecore-jss-react](../README.md) / PlaceholderComponentProps

# Interface: PlaceholderComponentProps

## Hierarchy

- `PlaceholderProps`

  ↳ **`PlaceholderComponentProps`**

## Table of contents

### Properties

- [componentFactory](PlaceholderComponentProps.md#componentfactory)
- [componentLoadingMessage](PlaceholderComponentProps.md#componentloadingmessage)
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
- [sitecoreContext](PlaceholderComponentProps.md#sitecorecontext)

## Properties

### componentFactory

• `Optional` **componentFactory**: [`ComponentFactory`](../README.md#componentfactory)

A factory function that will receive a componentName and return an instance of a React component.
When rendered within a <SitecoreContext> component, defaults to the context componentFactory.

#### Inherited from

PlaceholderProps.componentFactory

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:43](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L43)

___

### componentLoadingMessage

• `Optional` **componentLoadingMessage**: `string`

The message that gets displayed while component is loading

#### Inherited from

PlaceholderProps.componentLoadingMessage

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:88](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L88)

___

### errorComponent

• `Optional` **errorComponent**: `ComponentClass`\<`ErrorComponentProps`, `any`\> \| `FC`\<`ErrorComponentProps`\>

A component that is rendered in place of the placeholder when an error occurs rendering
the placeholder

#### Inherited from

PlaceholderProps.errorComponent

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:80](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L80)

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

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:48](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L48)

___

### hiddenRenderingComponent

• `Optional` **hiddenRenderingComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

A component that is rendered in place of any components that are hidden

#### Inherited from

PlaceholderProps.hiddenRenderingComponent

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:74](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L74)

___

### missingComponentComponent

• `Optional` **missingComponentComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

A component that is rendered in place of any components that are in this placeholder,
but do not have a definition in the componentFactory (i.e. don't have a React implementation)

#### Inherited from

PlaceholderProps.missingComponentComponent

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:69](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L69)

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

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:64](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L64)

___

### name

• **name**: `string`

Name of the placeholder to render.

#### Inherited from

PlaceholderProps.name

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:36](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L36)

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

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:55](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L55)

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

[packages/sitecore-jss-react/src/components/Placeholder.tsx:18](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/Placeholder.tsx#L18)

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

[packages/sitecore-jss-react/src/components/Placeholder.tsx:28](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/Placeholder.tsx#L28)

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

[packages/sitecore-jss-react/src/components/Placeholder.tsx:13](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/Placeholder.tsx#L13)

___

### rendering

• **rendering**: [`ComponentRendering`](ComponentRendering.md) \| [`RouteData`](RouteData.md)\<`Record`\<`string`, [`Field`](Field.md)\<`GenericFieldValue`\> \| [`Item`](Item.md) \| [`Item`](Item.md)[]\>\>

Rendering data to be used when rendering the placeholder.

#### Inherited from

PlaceholderProps.rendering

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:38](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L38)

___

### sitecoreContext

• **sitecoreContext**: [`SitecoreContextValue`](../README.md#sitecorecontextvalue)

Context data from the Sitecore Layout Service

#### Inherited from

PlaceholderProps.sitecoreContext

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:84](https://github.com/Sitecore/jss/blob/121d7f33b/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L84)
