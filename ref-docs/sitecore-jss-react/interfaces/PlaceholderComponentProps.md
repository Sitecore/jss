[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / PlaceholderComponentProps

# Interface: PlaceholderComponentProps

## Extends

- `PlaceholderProps`

## Properties

### componentFactory?

> `optional` **componentFactory**: [`ComponentFactory`](../type-aliases/ComponentFactory.md)

A factory function that will receive a componentName and return an instance of a React component.
When rendered within a <SitecoreContext> component, defaults to the context componentFactory.

#### Inherited from

`PlaceholderProps.componentFactory`

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:46](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L46)

***

### componentLoadingMessage?

> `optional` **componentLoadingMessage**: `string`

The message that gets displayed while component is loading

#### Inherited from

`PlaceholderProps.componentLoadingMessage`

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:91](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L91)

***

### errorComponent?

> `optional` **errorComponent**: `ComponentClass`\<`ErrorComponentProps`, `any`\> \| `FC`\<`ErrorComponentProps`\>

A component that is rendered in place of the placeholder when an error occurs rendering
the placeholder

#### Inherited from

`PlaceholderProps.errorComponent`

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:83](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L83)

***

### fields?

> `optional` **fields**: `object`

An object of field names/values that are aggregated and propagated through the component tree created by a placeholder.
Any component or placeholder rendered by a placeholder will have access to this data via `props.fields`.

#### Index Signature

 \[`name`: `string`\]: [`Field`](Field.md) \| [`Item`](Item.md)[]

#### Inherited from

`PlaceholderProps.fields`

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:51](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L51)

***

### hiddenRenderingComponent?

> `optional` **hiddenRenderingComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

A component that is rendered in place of any components that are hidden

#### Inherited from

`PlaceholderProps.hiddenRenderingComponent`

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:77](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L77)

***

### missingComponentComponent?

> `optional` **missingComponentComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

A component that is rendered in place of any components that are in this placeholder,
but do not have a definition in the componentFactory (i.e. don't have a React implementation)

#### Inherited from

`PlaceholderProps.missingComponentComponent`

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:72](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L72)

***

### modifyComponentProps()?

> `optional` **modifyComponentProps**: (`componentProps`) => `ComponentProps`

Modify final props of component (before render) provided by rendering data.
Can be used in case when you need to insert additional data into the component.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `componentProps` | `ComponentProps` | component props to be modified |

#### Returns

`ComponentProps`

modified or initial props

#### Inherited from

`PlaceholderProps.modifyComponentProps`

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:67](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L67)

***

### name

> **name**: `string`

Name of the placeholder to render.

#### Inherited from

`PlaceholderProps.name`

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:39](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L39)

***

### params?

> `optional` **params**: `object`

An object of rendering parameter names/values that are aggregated and propagated through the component tree created by a placeholder.
Any component or placeholder rendered by a placeholder will have access to this data via `props.params`.

#### Index Signature

 \[`name`: `string`\]: `string`

#### Inherited from

`PlaceholderProps.params`

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:58](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L58)

***

### render()?

> `optional` **render**: (`components`, `data`, `props`) => `ReactNode`

Render props function that enables control over the rendering of the components in the placeholder.
Useful for techniques like wrapping each child in a wrapper component.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `components` | `ReactNode`[] |
| `data` | ([`ComponentRendering`](ComponentRendering.md)\<[`ComponentFields`](ComponentFields.md)\> \| [`HtmlElementRendering`](HtmlElementRendering.md))[] |
| `props` | `PlaceholderProps` |

#### Returns

`ReactNode`

#### Defined in

[packages/sitecore-jss-react/src/components/Placeholder.tsx:18](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/Placeholder.tsx#L18)

***

### renderEach()?

> `optional` **renderEach**: (`component`, `index`) => `ReactNode`

Render props function that is called for each non-system component added to the placeholder.
Mutually exclusive with `render`. System components added during Experience Editor are automatically rendered as-is.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `component` | `ReactNode` |
| `index` | `number` |

#### Returns

`ReactNode`

#### Defined in

[packages/sitecore-jss-react/src/components/Placeholder.tsx:28](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/Placeholder.tsx#L28)

***

### renderEmpty()?

> `optional` **renderEmpty**: (`components`) => `ReactNode`

Render props function that is called when the placeholder contains no content components.
Can be used to wrap the Sitecore EE empty placeholder markup in something that's visually correct

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `components` | `ReactNode`[] |

#### Returns

`ReactNode`

#### Defined in

[packages/sitecore-jss-react/src/components/Placeholder.tsx:13](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/Placeholder.tsx#L13)

***

### rendering

> **rendering**: [`ComponentRendering`](ComponentRendering.md)\<[`ComponentFields`](ComponentFields.md)\> \| [`RouteData`](RouteData.md)\<`Record`\<`string`, [`Field`](Field.md)\<`GenericFieldValue`\> \| [`Item`](Item.md) \| [`Item`](Item.md)[]\>\>

Rendering data to be used when rendering the placeholder.

#### Inherited from

`PlaceholderProps.rendering`

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:41](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L41)

***

### sitecoreContext

> **sitecoreContext**: [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md)

Context data from the Sitecore Layout Service

#### Inherited from

`PlaceholderProps.sitecoreContext`

#### Defined in

[packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:87](https://github.com/Sitecore/jss/blob/4a0927fbf2da75c0716c3495b24fb0fa0a87da51/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L87)
