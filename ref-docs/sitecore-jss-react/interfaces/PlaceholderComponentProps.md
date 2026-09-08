[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / PlaceholderComponentProps

# Interface: PlaceholderComponentProps

Defined in: [packages/sitecore-jss-react/src/components/Placeholder.tsx:7](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/Placeholder.tsx#L7)

## Extends

- `PlaceholderProps`

## Indexable

> \[`key`: `string`\]: `unknown`

## Properties

### componentFactory?

> `optional` **componentFactory?**: [`ComponentFactory`](../type-aliases/ComponentFactory.md)

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:39](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L39)

A factory function that will receive a componentName and return an instance of a React component.
When rendered within a <SitecoreContext> component, defaults to the context componentFactory.

#### Inherited from

`PlaceholderProps.componentFactory`

***

### componentLoadingMessage?

> `optional` **componentLoadingMessage?**: `string`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:91](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L91)

The message that gets displayed while component is loading

#### Inherited from

`PlaceholderProps.componentLoadingMessage`

***

### ~~disableSuspense?~~

> `optional` **disableSuspense?**: `boolean`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:99](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L99)

#### Deprecated

The `disableSuspense` prop is deprecated and will be removed in version 23.0.0.
The default value is set to `true` to avoid forcing Suspense usage across all components which could negatively impact performance metrics. Suspense can now be enabled explicitly when needed.

If `false`, enables Suspense in ErrorBoundary for the components rendered by placeholder.

#### Default

```ts
true
```

#### Inherited from

`PlaceholderProps.disableSuspense`

***

### errorComponent?

> `optional` **errorComponent?**: `ComponentClass`\<`ErrorComponentProps`, `any`\> \| `FC`\<`ErrorComponentProps`\>

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:83](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L83)

A component that is rendered in place of the placeholder when an error occurs rendering
the placeholder

#### Inherited from

`PlaceholderProps.errorComponent`

***

### fields?

> `optional` **fields?**: `object`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:44](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L44)

An object of field names/values that are aggregated and propagated through the component tree created by a placeholder.
Any component or placeholder rendered by a placeholder will have access to this data via `props.fields`.

#### Index Signature

\[`name`: `string`\]: [`Field`](Field.md)\<`GenericFieldValue`\> \| [`Item`](Item.md) \| [`Item`](Item.md)[]

#### Inherited from

`PlaceholderProps.fields`

***

### hiddenRenderingComponent?

> `optional` **hiddenRenderingComponent?**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:77](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L77)

A component that is rendered in place of any components that are hidden

#### Inherited from

`PlaceholderProps.hiddenRenderingComponent`

***

### missingComponentComponent?

> `optional` **missingComponentComponent?**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:72](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L72)

A component that is rendered in place of any components that are in this placeholder,
but do not have a definition in the componentFactory (i.e. don't have a React implementation)

#### Inherited from

`PlaceholderProps.missingComponentComponent`

***

### modifyComponentProps?

> `optional` **modifyComponentProps?**: (`componentProps`) => `ComponentProps`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:60](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L60)

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

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:32](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L32)

Name of the placeholder to render.

#### Inherited from

`PlaceholderProps.name`

***

### params?

> `optional` **params?**: `object`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:51](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L51)

An object of rendering parameter names/values that are aggregated and propagated through the component tree created by a placeholder.
Any component or placeholder rendered by a placeholder will have access to this data via `props.params`.

#### Index Signature

\[`name`: `string`\]: `string`

#### Inherited from

`PlaceholderProps.params`

***

### passThroughComponentProps?

> `optional` **passThroughComponentProps?**: `object`

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:65](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L65)

An alternative to `modifyComponentProps` that allows passing additional props to rendered
components without forwarding Placeholder/SitecoreContext internal props.

#### Index Signature

\[`key`: `string`\]: `unknown`

#### Inherited from

`PlaceholderProps.passThroughComponentProps`

***

### render?

> `optional` **render?**: (`components`, `data`, `props`) => `ReactNode`

Defined in: [packages/sitecore-jss-react/src/components/Placeholder.tsx:17](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/Placeholder.tsx#L17)

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

### renderEach?

> `optional` **renderEach?**: (`component`, `index`) => `ReactNode`

Defined in: [packages/sitecore-jss-react/src/components/Placeholder.tsx:27](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/Placeholder.tsx#L27)

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

### renderEmpty?

> `optional` **renderEmpty?**: (`components`) => `ReactNode`

Defined in: [packages/sitecore-jss-react/src/components/Placeholder.tsx:12](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/Placeholder.tsx#L12)

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

> **rendering**: [`RouteData`](RouteData.md)\<`Record`\<`string`, [`Field`](Field.md)\<`GenericFieldValue`\> \| [`Item`](Item.md) \| [`Item`](Item.md)[]\>\> \| [`ComponentRendering`](ComponentRendering.md)\<[`ComponentFields`](ComponentFields.md)\>

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:34](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L34)

Rendering data to be used when rendering the placeholder.

#### Inherited from

`PlaceholderProps.rendering`

***

### sitecoreContext

> **sitecoreContext**: [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md)

Defined in: [packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx:87](https://github.com/Sitecore/jss/blob/8a860497599fff48344819f724f0293af1acc602/packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx#L87)

Context data from the Sitecore Layout Service

#### Inherited from

`PlaceholderProps.sitecoreContext`
