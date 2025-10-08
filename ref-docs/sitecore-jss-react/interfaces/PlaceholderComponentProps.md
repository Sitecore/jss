[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / PlaceholderComponentProps

# Interface: PlaceholderComponentProps

Defined in: [packages/sitecore-jss-react/src/components/Placeholder.tsx:8](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/Placeholder.tsx#L8)

## Extends

- `PlaceholderProps`

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### componentFactory?

> `optional` **componentFactory**: [`ComponentFactory`](../type-aliases/ComponentFactory.md)

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:45](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L45)

A factory function that will receive a componentName and return an instance of a React component.
When rendered within a <SitecoreContext> component, defaults to the context componentFactory.

#### Inherited from

`PlaceholderProps.componentFactory`

***

### componentLoadingMessage?

> `optional` **componentLoadingMessage**: `string`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:90](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L90)

The message that gets displayed while component is loading

#### Inherited from

`PlaceholderProps.componentLoadingMessage`

***

### disableSuspense?

> `optional` **disableSuspense**: `boolean`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:95](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L95)

If true, disables Suspense for the placeholder.

#### Default

```ts
false
```

#### Inherited from

`PlaceholderProps.disableSuspense`

***

### errorComponent?

> `optional` **errorComponent**: `ComponentClass`\<`ErrorComponentProps`, `any`\> \| `FC`\<`ErrorComponentProps`\>

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:82](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L82)

A component that is rendered in place of the placeholder when an error occurs rendering
the placeholder

#### Inherited from

`PlaceholderProps.errorComponent`

***

### fields?

> `optional` **fields**: `object`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:50](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L50)

An object of field names/values that are aggregated and propagated through the component tree created by a placeholder.
Any component or placeholder rendered by a placeholder will have access to this data via `props.fields`.

#### Index Signature

\[`name`: `string`\]: [`Field`](Field.md)\<`GenericFieldValue`\> \| [`Item`](Item.md) \| [`Item`](Item.md)[]

#### Inherited from

`PlaceholderProps.fields`

***

### hiddenRenderingComponent?

> `optional` **hiddenRenderingComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:76](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L76)

A component that is rendered in place of any components that are hidden

#### Inherited from

`PlaceholderProps.hiddenRenderingComponent`

***

### missingComponentComponent?

> `optional` **missingComponentComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:71](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L71)

A component that is rendered in place of any components that are in this placeholder,
but do not have a definition in the componentFactory (i.e. don't have a React implementation)

#### Inherited from

`PlaceholderProps.missingComponentComponent`

***

### modifyComponentProps()?

> `optional` **modifyComponentProps**: (`componentProps`) => `ComponentProps`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:66](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L66)

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

***

### name

> **name**: `string`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:38](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L38)

Name of the placeholder to render.

#### Inherited from

`PlaceholderProps.name`

***

### params?

> `optional` **params**: `object`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:57](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L57)

An object of rendering parameter names/values that are aggregated and propagated through the component tree created by a placeholder.
Any component or placeholder rendered by a placeholder will have access to this data via `props.params`.

#### Index Signature

\[`name`: `string`\]: `string`

#### Inherited from

`PlaceholderProps.params`

***

### render()?

> `optional` **render**: (`components`, `data`, `props`) => `ReactNode`

Defined in: [packages/sitecore-jss-react/src/components/Placeholder.tsx:18](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/Placeholder.tsx#L18)

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

***

### renderEach()?

> `optional` **renderEach**: (`component`, `index`) => `ReactNode`

Defined in: [packages/sitecore-jss-react/src/components/Placeholder.tsx:28](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/Placeholder.tsx#L28)

Render props function that is called for each non-system component added to the placeholder.
Mutually exclusive with `render`. System components added during Experience Editor are automatically rendered as-is.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `component` | `ReactNode` |
| `index` | `number` |

#### Returns

`ReactNode`

***

### renderEmpty()?

> `optional` **renderEmpty**: (`components`) => `ReactNode`

Defined in: [packages/sitecore-jss-react/src/components/Placeholder.tsx:13](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/Placeholder.tsx#L13)

Render props function that is called when the placeholder contains no content components.
Can be used to wrap the Sitecore EE empty placeholder markup in something that's visually correct

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `components` | `ReactNode`[] |

#### Returns

`ReactNode`

***

### rendering

> **rendering**: [`ComponentRendering`](ComponentRendering.md)\<[`ComponentFields`](ComponentFields.md)\> \| [`RouteData`](RouteData.md)\<`Record`\<`string`, [`Field`](Field.md)\<`GenericFieldValue`\> \| [`Item`](Item.md) \| [`Item`](Item.md)[]\>\>

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:40](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L40)

Rendering data to be used when rendering the placeholder.

#### Inherited from

`PlaceholderProps.rendering`

***

### sitecoreContext

> **sitecoreContext**: [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md)

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:86](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L86)

Context data from the Sitecore Layout Service

#### Inherited from

`PlaceholderProps.sitecoreContext`
