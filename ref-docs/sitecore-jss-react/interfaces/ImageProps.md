[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / ImageProps

# Interface: ImageProps

Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:37](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-react/src/components/Image.tsx#L37)

## Extends

- `EditableFieldProps`

## Indexable

> \[`attributeName`: `string`\]: `unknown`

## Properties

### editable?

> `optional` **editable?**: `boolean`

Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)

Can be used to explicitly disable inline editing.
If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.

#### Default

```ts
true
```

#### Inherited from

`EditableFieldProps.editable`

***

### field?

> `optional` **field?**: [`ImageFieldValue`](ImageFieldValue.md) \| [`ImageField`](ImageField.md)

Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:40](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-react/src/components/Image.tsx#L40)

Image field data (consistent with other field types)

***

### imageParams?

> `optional` **imageParams?**: `object`

Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:45](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-react/src/components/Image.tsx#L45)

Parameters that will be attached to Sitecore media URLs

#### Index Signature

\[`paramName`: `string`\]: `string` \| `number`

***

### mediaUrlPrefix?

> `optional` **mediaUrlPrefix?**: `RegExp`

Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:58](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-react/src/components/Image.tsx#L58)

Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.

#### Example

```ts
//([-~]{1})assets//i
/-assets/website -> /-/jssmedia/website
/~assets/website -> /~/jssmedia/website
```

***

### srcSet?

> `optional` **srcSet?**: [`ImageSizeParameters`](ImageSizeParameters.md)[]

Defined in: [packages/sitecore-jss-react/src/components/Image.tsx:49](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-react/src/components/Image.tsx#L49)
