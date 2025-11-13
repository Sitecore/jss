[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / DateFieldProps

# Interface: DateFieldProps

Defined in: [packages/sitecore-jss-react/src/components/Date.tsx:9](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-react/src/components/Date.tsx#L9)

## Extends

- `EditableFieldProps`\<`DateFieldProps`\>

## Indexable

\[`htmlAttributes`: `string`\]: `unknown`

The date field data.

## Properties

### editable?

> `optional` **editable**: `boolean`

Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)

Can be used to explicitly disable inline editing.
If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.

#### Default

```ts
true
```

#### Inherited from

`EditableFieldProps.editable`

***

### emptyFieldEditingComponent?

> `optional` **emptyFieldEditingComponent**: `ComponentClass`\<`DateFieldProps`, `any`\> \| `FC`\<`DateFieldProps`\>

Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:36](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-react/src/components/sharedTypes.ts#L36)

-- Edit Mode Metadata --

Custom element to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

`EditableFieldProps.emptyFieldEditingComponent`

***

### field

> **field**: `FieldMetadata` & `object`

Defined in: [packages/sitecore-jss-react/src/components/Date.tsx:12](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-react/src/components/Date.tsx#L12)

#### Type declaration

##### editable?

> `optional` **editable**: `string`

##### value?

> `optional` **value**: `string`

***

### render()?

> `optional` **render**: (`date`) => `ReactNode`

Defined in: [packages/sitecore-jss-react/src/components/Date.tsx:21](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-react/src/components/Date.tsx#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `Date` |

#### Returns

`ReactNode`

***

### tag?

> `optional` **tag**: `string`

Defined in: [packages/sitecore-jss-react/src/components/Date.tsx:19](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-react/src/components/Date.tsx#L19)

The HTML element that will wrap the contents of the field.
