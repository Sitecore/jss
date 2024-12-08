[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / DateFieldProps

# Interface: DateFieldProps

## Extends

- `EditableFieldProps`

## Indexable

 \[`htmlAttributes`: `string`\]: `unknown`

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

[packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)

***

### emptyFieldEditingComponent?

> `optional` **emptyFieldEditingComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

-- Edit Mode Metadata --

Custom element to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

`EditableFieldProps.emptyFieldEditingComponent`

#### Defined in

[packages/sitecore-jss-react/src/components/sharedTypes.ts:36](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-react/src/components/sharedTypes.ts#L36)

***

### field

> **field**: `FieldMetadata` & `object`

#### Type declaration

##### editable?

> `optional` **editable**: `string`

##### value?

> `optional` **value**: `string`

#### Defined in

[packages/sitecore-jss-react/src/components/Date.tsx:13](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-react/src/components/Date.tsx#L13)

***

### render()?

> `optional` **render**: (`date`) => `ReactNode`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `Date` |

#### Returns

`ReactNode`

#### Defined in

[packages/sitecore-jss-react/src/components/Date.tsx:22](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-react/src/components/Date.tsx#L22)

***

### tag?

> `optional` **tag**: `string`

The HTML element that will wrap the contents of the field.

#### Defined in

[packages/sitecore-jss-react/src/components/Date.tsx:20](https://github.com/Sitecore/jss/blob/991c8f57eceef710471966b7c855981e4aac1ded/packages/sitecore-jss-react/src/components/Date.tsx#L20)
