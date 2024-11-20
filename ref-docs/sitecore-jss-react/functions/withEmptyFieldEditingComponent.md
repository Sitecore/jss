[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / withEmptyFieldEditingComponent

# Function: withEmptyFieldEditingComponent()

> **withEmptyFieldEditingComponent**\<`FieldComponentProps`, `RefElementType`\>(`FieldComponent`, `options`): `ForwardRefExoticComponent`\<`PropsWithoutRef`\<`FieldComponentProps`\> & `RefAttributes`\<`RefElementType`\>\> \| (`props`) => `Element`

Returns the passed field component or default component in case field value is empty and edit mode is 'metadata'

## Type Parameters

• **FieldComponentProps** *extends* `WithEmptyFieldEditingComponentProps`

• **RefElementType** = `HTMLElement`

## Parameters

• **FieldComponent**: `ComponentType`\<`FieldComponentProps`\>

the field component

• **options**: `WithEmptyFieldEditingComponentOptions`

the options of the HOC;

## Returns

`ForwardRefExoticComponent`\<`PropsWithoutRef`\<`FieldComponentProps`\> & `RefAttributes`\<`RefElementType`\>\> \| (`props`) => `Element`

## Defined in

[packages/sitecore-jss-react/src/enhancers/withEmptyFieldEditingComponent.tsx:38](https://github.com/Sitecore/jss/blob/ff400466a8d16483c667d9a837e1247d6192035e/packages/sitecore-jss-react/src/enhancers/withEmptyFieldEditingComponent.tsx#L38)
