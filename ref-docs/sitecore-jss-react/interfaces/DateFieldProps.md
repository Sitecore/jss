[@sitecore-jss/sitecore-jss-react](../README.md) / DateFieldProps

# Interface: DateFieldProps

## Hierarchy

- `EditableFieldProps`

  ↳ **`DateFieldProps`**

## Indexable

▪ [htmlAttributes: `string`]: `unknown`

## Table of contents

### Properties

- [editable](DateFieldProps.md#editable)
- [emptyFieldEditingComponent](DateFieldProps.md#emptyfieldeditingcomponent)
- [field](DateFieldProps.md#field)
- [render](DateFieldProps.md#render)
- [tag](DateFieldProps.md#tag)

## Properties

### editable

• `Optional` **editable**: `boolean`

Can be used to explicitly disable inline editing.
If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.

**`Default`**

```ts
true
```

#### Inherited from

EditableFieldProps.editable

#### Defined in

[packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/ff173d88b/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)

___

### emptyFieldEditingComponent

• `Optional` **emptyFieldEditingComponent**: `ComponentClass`\<`unknown`, `any`\> \| `FC`\<`unknown`\>

-- Edit Mode Metadata --

Custom element to render in Pages in Metadata edit mode if field value is empty

#### Inherited from

EditableFieldProps.emptyFieldEditingComponent

#### Defined in

[packages/sitecore-jss-react/src/components/sharedTypes.ts:36](https://github.com/Sitecore/jss/blob/ff173d88b/packages/sitecore-jss-react/src/components/sharedTypes.ts#L36)

___

### field

• **field**: `FieldMetadata` & \{ `editable?`: `string` ; `value?`: `string`  }

#### Defined in

[packages/sitecore-jss-react/src/components/Date.tsx:13](https://github.com/Sitecore/jss/blob/ff173d88b/packages/sitecore-jss-react/src/components/Date.tsx#L13)

___

### render

• `Optional` **render**: (`date`: `Date`) => `ReactNode`

#### Type declaration

▸ (`date`): `ReactNode`

##### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

##### Returns

`ReactNode`

#### Defined in

[packages/sitecore-jss-react/src/components/Date.tsx:22](https://github.com/Sitecore/jss/blob/ff173d88b/packages/sitecore-jss-react/src/components/Date.tsx#L22)

___

### tag

• `Optional` **tag**: `string`

The HTML element that will wrap the contents of the field.

#### Defined in

[packages/sitecore-jss-react/src/components/Date.tsx:20](https://github.com/Sitecore/jss/blob/ff173d88b/packages/sitecore-jss-react/src/components/Date.tsx#L20)
