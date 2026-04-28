[**@sitecore-jss/sitecore-jss-react-forms**](../README.md)

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FieldWithValueProps

# Interface: FieldWithValueProps\<TFormField, TValueType\>

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:21](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L21)
=======
Defined in: [src/FieldProps.ts:21](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L21)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

## Extends

- [`FieldProps`](FieldProps.md)\<`TFormField`\>

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TFormField` *extends* `FormField` | `FormField` |
| `TValueType` *extends* `string` \| `string`[] | `string` |

## Properties

### children?

> `optional` **children?**: `ReactNode`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:51](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L51)
=======
Defined in: [src/FieldProps.ts:51](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L51)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

***

### errors

> **errors**: `string`[]

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:32](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L32)
=======
Defined in: [src/FieldProps.ts:32](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L32)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

If the field is not valid, this contains a list of messages detailing why

***

### field

> **field**: `TFormField`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:26](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L26)
=======
Defined in: [src/FieldProps.ts:26](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L26)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Form field schema data

#### Overrides

[`FieldProps`](FieldProps.md).[`field`](FieldProps.md#field)

***

### fieldFactory

> **fieldFactory**: (`field`) => `ReactNode`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:34](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L34)
=======
Defined in: [src/FieldProps.ts:34](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L34)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Function that can be called to create child form field components (used for sections)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `FormField` |

#### Returns

`ReactNode`

#### Overrides

[`FieldProps`](FieldProps.md).[`fieldFactory`](FieldProps.md#fieldfactory)

***

### fieldValidationErrorsComponent?

> `optional` **fieldValidationErrorsComponent?**: `ComponentType`\<[`LabelProps`](../type-aliases/LabelProps.md)\<`InputViewModel`\>\>

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:44](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L44)
=======
Defined in: [src/FieldProps.ts:44](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L44)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optionally override the field validation errors display component for any field components that render validation errors

***

### isValid

> **isValid**: `boolean`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:30](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L30)
=======
Defined in: [src/FieldProps.ts:30](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L30)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Whether the field is currently in a valid state (always starts as true until user input)

***

### key?

> `optional` **key?**: `string`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:49](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L49)
=======
Defined in: [src/FieldProps.ts:49](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L49)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

#### Overrides

[`FieldProps`](FieldProps.md).[`key`](FieldProps.md#key)

***

### labelComponent?

> `optional` **labelComponent?**: `ComponentType`\<[`LabelProps`](../type-aliases/LabelProps.md)\<`InputViewModel`\>\>

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:41](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L41)
=======
Defined in: [src/FieldProps.ts:41](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L41)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Optionally override the label component for any field components that render a label

***

### onButtonClick

> **onButtonClick**: (`buttonFieldName`) => `void`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:38](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L38)
=======
Defined in: [src/FieldProps.ts:38](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L38)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Callback for when a submit button is clicked. Tells the parent form which button was clicked when a submit occurs.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `buttonFieldName` | `string` |

#### Returns

`void`

#### Overrides

[`FieldProps`](FieldProps.md).[`onButtonClick`](FieldProps.md#onbuttonclick)

***

### onChange

> **onChange**: [`FieldChangeCallback`](../type-aliases/FieldChangeCallback.md)

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:36](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L36)
=======
Defined in: [src/FieldProps.ts:36](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L36)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Callback for when the value of the form field changes. Will cause the parent form state and value prop to be updated.

***

### tracker

> **tracker**: `FormTracker`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:47](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L47)
=======
Defined in: [src/FieldProps.ts:47](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L47)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Analytics tracker on form field actions

***

### value

> **value**: `TValueType`

<<<<<<< HEAD
Defined in: [src/FieldProps.ts:28](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react-forms/src/FieldProps.ts#L28)
=======
Defined in: [src/FieldProps.ts:28](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L28)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

The current value of the form field
