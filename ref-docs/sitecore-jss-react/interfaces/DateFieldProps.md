[@sitecore-jss/sitecore-jss-react](../README.md) / DateFieldProps

# Interface: DateFieldProps

## Indexable

▪ [htmlAttributes: `string`]: `unknown`

## Table of contents

### Properties

- [editable](DateFieldProps.md#editable)
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

#### Defined in

[packages/sitecore-jss-react/src/components/Date.tsx:22](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss-react/src/components/Date.tsx#L22)

___

### field

• **field**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `editable?` | `string` |
| `metadata?` | \{ `[key: string]`: `unknown`;  } |
| `value?` | `string` |

#### Defined in

[packages/sitecore-jss-react/src/components/Date.tsx:8](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss-react/src/components/Date.tsx#L8)

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

[packages/sitecore-jss-react/src/components/Date.tsx:23](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss-react/src/components/Date.tsx#L23)

___

### tag

• `Optional` **tag**: `string`

The HTML element that will wrap the contents of the field.

#### Defined in

[packages/sitecore-jss-react/src/components/Date.tsx:16](https://github.com/Sitecore/jss/blob/5d2a6e907/packages/sitecore-jss-react/src/components/Date.tsx#L16)
