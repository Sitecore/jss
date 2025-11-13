[**@sitecore-jss/sitecore-jss-react-forms**](../README.md)

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FieldProps

# Interface: FieldProps\<TFormField\>

Defined in: [src/FieldProps.ts:10](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L10)

## Extended by

- [`FieldWithValueProps`](FieldWithValueProps.md)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TFormField` *extends* `FormField` | `FormField` |

## Properties

### field

> **field**: `TFormField`

Defined in: [src/FieldProps.ts:12](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L12)

Form field schema data

***

### fieldFactory()

> **fieldFactory**: (`field`) => `ReactNode`

Defined in: [src/FieldProps.ts:14](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L14)

Function that can be called to create child form field components (used for sections)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `FormField` |

#### Returns

`ReactNode`

***

### key?

> `optional` **key**: `string`

Defined in: [src/FieldProps.ts:18](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L18)

***

### onButtonClick()

> **onButtonClick**: (`buttonFieldName`) => `void`

Defined in: [src/FieldProps.ts:16](https://github.com/Sitecore/jss/blob/702e51fc8851b1a2555bb5692b413107d3f3a8f5/packages/sitecore-jss-react-forms/src/FieldProps.ts#L16)

Callback for when a submit button is clicked. Tells the parent form which button was clicked when a submit occurs.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `buttonFieldName` | `string` |

#### Returns

`void`
