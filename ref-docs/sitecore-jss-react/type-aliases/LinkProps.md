[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / LinkProps

# Type Alias: LinkProps

> **LinkProps**: `EditableFieldProps` & `React.AnchorHTMLAttributes`\<`HTMLAnchorElement`\> & `RefAttributes`\<`HTMLAnchorElement`\> & `object`

## Type declaration

### field

> **field**: [`LinkField`](../interfaces/LinkField.md) \| [`LinkFieldValue`](../interfaces/LinkFieldValue.md) & `FieldMetadata`

The link field data.

### showLinkTextWithChildrenPresent?

> `optional` **showLinkTextWithChildrenPresent**: `boolean`

Displays a link text ('description' in Sitecore) even when children exist
NOTE: when in Sitecore Experience Editor, this setting is ignored due to technical limitations, and the description is always rendered.

## Defined in

[packages/sitecore-jss-react/src/components/Link.tsx:29](https://github.com/Sitecore/jss/blob/a7d807eb792128c89facd42fd54f8177ce44b9b9/packages/sitecore-jss-react/src/components/Link.tsx#L29)
