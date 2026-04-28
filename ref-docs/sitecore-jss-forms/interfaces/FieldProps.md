[**@sitecore-jss/sitecore-jss-react-forms**](../README.md)

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FieldProps

# Interface: FieldProps\<TFormField\>

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:10](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L10)
=======
Defined in: [src/FieldProps.ts:10](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L10)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Extended by

- [`FieldWithValueProps`](FieldWithValueProps.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TFormField` *extends* `FormField` | `FormField` |

## Properties

### field

> **field**: `TFormField`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:12](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L12)
=======
Defined in: [src/FieldProps.ts:12](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L12)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Form field schema data

***

### fieldFactory

> **fieldFactory**: (`field`) => `ReactNode`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:14](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L14)
=======
Defined in: [src/FieldProps.ts:14](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L14)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Function that can be called to create child form field components (used for sections)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `FormField` |

#### Returns

`ReactNode`

***

### key?

> `optional` **key?**: `string`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:18](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L18)
=======
Defined in: [src/FieldProps.ts:18](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L18)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### onButtonClick

> **onButtonClick**: (`buttonFieldName`) => `void`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:16](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L16)
=======
Defined in: [src/FieldProps.ts:16](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L16)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Callback for when a submit button is clicked. Tells the parent form which button was clicked when a submit occurs.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `buttonFieldName` | `string` |

#### Returns

`void`
