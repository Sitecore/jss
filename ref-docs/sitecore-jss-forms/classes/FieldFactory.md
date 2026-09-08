[**@sitecore-jss/sitecore-jss-react-forms**](../README.md)

***

[@sitecore-jss/sitecore-jss-react-forms](../README.md) / FieldFactory

# Class: FieldFactory

Defined in: [src/field-factory.tsx:14](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss-react-forms/src/field-factory.tsx#L14)

Maps field type IDs from Sitecore (/sitecore/system/Settings/Forms/Field Types)
into an implementing React component - this is very similar to the JSS componentFactory,
but it maps form element components instead of layout components

## Constructors

### Constructor

> **new FieldFactory**(): `FieldFactory`

Defined in: [src/field-factory.tsx:18](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss-react-forms/src/field-factory.tsx#L18)

#### Returns

`FieldFactory`

## Methods

### get()

> **get**(`field`, `props`): `ReactNode`

Defined in: [src/field-factory.tsx:37](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss-react-forms/src/field-factory.tsx#L37)

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

Defined in: [src/field-factory.tsx:30](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss-react-forms/src/field-factory.tsx#L30)

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

Defined in: [src/field-factory.tsx:26](https://github.com/Sitecore/jss/blob/16422526b0fccc024c0cc66c2f2946a3722333c1/packages/sitecore-jss-react-forms/src/field-factory.tsx#L26)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `component` | `ComponentType`\<`FormField`\<`ViewModel`\>\> |

#### Returns

`void`
