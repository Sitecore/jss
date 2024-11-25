[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / withFieldMetadata

# Function: withFieldMetadata()

> **withFieldMetadata**\<`FieldComponentProps`, `RefElementType`\>(`FieldComponent`, `isForwardRef`): `ForwardRefExoticComponent`\<`PropsWithoutRef`\<`FieldComponentProps`\> & `RefAttributes`\<`RefElementType`\>\> \| (`props`) => `Element`

Wraps the field component with metadata markup intended to be used for chromes hydration in Pages

## Type Parameters

• **FieldComponentProps** *extends* `WithMetadataProps`

• **RefElementType** = `HTMLElement`

## Parameters

• **FieldComponent**: `ComponentType`\<`FieldComponentProps`\>

the field component

• **isForwardRef**: `boolean` = `false`

set to 'true' if forward reference is needed

## Returns

`ForwardRefExoticComponent`\<`PropsWithoutRef`\<`FieldComponentProps`\> & `RefAttributes`\<`RefElementType`\>\> \| (`props`) => `Element`

## Defined in

[packages/sitecore-jss-react/src/enhancers/withFieldMetadata.tsx:16](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-react/src/enhancers/withFieldMetadata.tsx#L16)
