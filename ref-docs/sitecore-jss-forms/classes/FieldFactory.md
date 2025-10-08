[**@sitecore-jss/sitecore-jss-react-forms**](../README.md)

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FieldFactory

# Class: FieldFactory

Defined in: [src/field-factory.tsx:14](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react-forms/src/field-factory.tsx#L14)

Maps field type IDs from Sitecore (/sitecore/system/Settings/Forms/Field Types)
into an implementing React component - this is very similar to the JSS componentFactory,
but it maps form element components instead of layout components

## Constructors

### Constructor

> **new FieldFactory**(): `FieldFactory`

Defined in: [src/field-factory.tsx:18](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react-forms/src/field-factory.tsx#L18)

#### Returns

`FieldFactory`

## Methods

### get()

> **get**(`field`, `props`): `ReactNode`

Defined in: [src/field-factory.tsx:38](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react-forms/src/field-factory.tsx#L38)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | `FormField` |
| `props` | [`FieldProps`](../interfaces/FieldProps.md) |

#### Returns

`ReactNode`

***

### setComponent()

> **setComponent**\<`TProps`\>(`type`, `component`): `void`

Defined in: [src/field-factory.tsx:31](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react-forms/src/field-factory.tsx#L31)

#### Type Parameters

| Type Parameter |
| ------ |
| `TProps` *extends* [`FieldProps`](../interfaces/FieldProps.md)\<`FormField`\<`ViewModel`\>\> |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `component` | `FormFieldComponent`\<`TProps`\> |

#### Returns

`void`

***

### setComponentNotFoundComponent()

> **setComponentNotFoundComponent**(`component`): `void`

Defined in: [src/field-factory.tsx:27](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-react-forms/src/field-factory.tsx#L27)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `component` | `ComponentType`\<`FormField`\<`ViewModel`\>\> |

#### Returns

`void`
