[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / ImageProps

# Interface: ImageProps

## Extends

- `EditableFieldProps`

## Indexable

 \[`attributeName`: `string`\]: `unknown`

## Properties

### editable?

> `optional` **editable**: `boolean`

Can be used to explicitly disable inline editing.
If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.

#### Default

```ts
true
```

#### Inherited from

`EditableFieldProps.editable`

#### Defined in

[packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/5315c64ad6a46bcd0171506df0a095ad99cc47c7/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)

***

### emptyFieldEditingComponent?

> `optional` **emptyFieldEditingComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

-- Edit Mode Metadata --

Custom element to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

`EditableFieldProps.emptyFieldEditingComponent`

#### Defined in

[packages/sitecore-jss-react/src/components/sharedTypes.ts:36](https://github.com/Sitecore/jss/blob/5315c64ad6a46bcd0171506df0a095ad99cc47c7/packages/sitecore-jss-react/src/components/sharedTypes.ts#L36)

***

### field?

> `optional` **field**: [`ImageFieldValue`](ImageFieldValue.md) \| [`ImageField`](ImageField.md) & `FieldMetadata`

Image field data (consistent with other field types)

#### Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:44](https://github.com/Sitecore/jss/blob/5315c64ad6a46bcd0171506df0a095ad99cc47c7/packages/sitecore-jss-react/src/components/Image.tsx#L44)

***

### imageParams?

> `optional` **imageParams**: `object`

Parameters that will be attached to Sitecore media URLs

#### Index Signature

 \[`paramName`: `string`\]: `string` \| `number`

#### Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:49](https://github.com/Sitecore/jss/blob/5315c64ad6a46bcd0171506df0a095ad99cc47c7/packages/sitecore-jss-react/src/components/Image.tsx#L49)

***

### mediaUrlPrefix?

> `optional` **mediaUrlPrefix**: `RegExp`

Custom regexp that finds media URL prefix that will be replaced by `/-/jssmedia` or `/~/jssmedia`.

#### Example

```ts
//([-~]{1})assets//i
/-assets/website -> /-/jssmedia/website
/~assets/website -> /~/jssmedia/website
```

#### Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:62](https://github.com/Sitecore/jss/blob/5315c64ad6a46bcd0171506df0a095ad99cc47c7/packages/sitecore-jss-react/src/components/Image.tsx#L62)

***

### srcSet?

> `optional` **srcSet**: [`ImageSizeParameters`](ImageSizeParameters.md)[]

#### Defined in

[packages/sitecore-jss-react/src/components/Image.tsx:53](https://github.com/Sitecore/jss/blob/5315c64ad6a46bcd0171506df0a095ad99cc47c7/packages/sitecore-jss-react/src/components/Image.tsx#L53)
