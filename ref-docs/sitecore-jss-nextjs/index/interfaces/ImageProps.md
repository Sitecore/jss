[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / ImageProps

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

sitecore-jss-react/types/components/sharedTypes.d.ts:25

***

### emptyFieldEditingComponent?

> `optional` **emptyFieldEditingComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

-- Edit Mode Metadata --

Custom element to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

`EditableFieldProps.emptyFieldEditingComponent`

#### Defined in

sitecore-jss-react/types/components/sharedTypes.d.ts:31

***

### field?

> `optional` **field**: (ImageField \| ImageFieldValue) & FieldMetadata

Image field data (consistent with other field types)

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:33

***

### imageParams?

> `optional` **imageParams**: `object`

Parameters that will be attached to Sitecore media URLs

#### Index Signature

 \[`paramName`: `string`\]: `string` \| `number`

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:37

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

sitecore-jss-react/types/components/Image.d.ts:48

***

### srcSet?

> `optional` **srcSet**: [`ImageSizeParameters`](ImageSizeParameters.md)[]

#### Defined in

sitecore-jss-react/types/components/Image.d.ts:40
