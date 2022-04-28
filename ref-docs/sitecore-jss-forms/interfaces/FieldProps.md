[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FieldProps

# Interface: FieldProps<TFormField\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `TFormField` | extends `FormField``FormField` |

## Hierarchy

- **`FieldProps`**

  ↳ [`FieldWithValueProps`](FieldWithValueProps.md)

## Table of contents

### Properties

- [field](FieldProps.md#field)
- [key](FieldProps.md#key)

### Methods

- [fieldFactory](FieldProps.md#fieldfactory)
- [onButtonClick](FieldProps.md#onbuttonclick)

## Properties

### field

• **field**: `TFormField`

Form field schema data

#### Defined in

[src/FieldProps.ts:12](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/FieldProps.ts#L12)

___

### key

• `Optional` **key**: `string`

#### Defined in

[src/FieldProps.ts:18](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/FieldProps.ts#L18)

## Methods

### fieldFactory

▸ **fieldFactory**(`field`): `ReactNode`

Function that can be called to create child form field components (used for sections)

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `FormField`<`ViewModel`\> |

#### Returns

`ReactNode`

#### Defined in

[src/FieldProps.ts:14](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/FieldProps.ts#L14)

___

### onButtonClick

▸ **onButtonClick**(`buttonFieldName`): `void`

Callback for when a submit button is clicked. Tells the parent form which button was clicked when a submit occurs.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buttonFieldName` | `string` |

#### Returns

`void`

#### Defined in

[src/FieldProps.ts:16](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-react-forms/src/FieldProps.ts#L16)
