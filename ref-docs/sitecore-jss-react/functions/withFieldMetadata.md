[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / withFieldMetadata

# Function: withFieldMetadata()

<<<<<<< HEAD
> **withFieldMetadata**\<`FieldComponentProps`, `RefElementType`\>(`FieldComponent`, `isForwardRef`): `ForwardRefExoticComponent`\<`PropsWithoutRef`\<`FieldComponentProps`\> & `RefAttributes`\<`RefElementType`\>\> \| (`props`) => `Element`

Defined in: [packages/sitecore-jss-react/src/enhancers/withFieldMetadata.tsx:16](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/enhancers/withFieldMetadata.tsx#L16)
=======
> **withFieldMetadata**\<`FieldComponentProps`, `RefElementType`\>(`FieldComponent`, `isForwardRef?`): `ForwardRefExoticComponent`\<`PropsWithoutRef`\<`FieldComponentProps`\> & `RefAttributes`\<`RefElementType`\>\> \| ((`props`) => `Element`)

Defined in: [packages/sitecore-jss-react/src/enhancers/withFieldMetadata.tsx:16](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/enhancers/withFieldMetadata.tsx#L16)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

Wraps the field component with metadata markup intended to be used for chromes hydration in Pages

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `FieldComponentProps` *extends* `WithMetadataProps` | - |
| `RefElementType` | `HTMLElement` |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `FieldComponent` | `ComponentType`\<`FieldComponentProps`\> | `undefined` | the field component |
| `isForwardRef` | `boolean` | `false` | set to 'true' if forward reference is needed |

## Returns

`ForwardRefExoticComponent`\<`PropsWithoutRef`\<`FieldComponentProps`\> & `RefAttributes`\<`RefElementType`\>\> \| ((`props`) => `Element`)
