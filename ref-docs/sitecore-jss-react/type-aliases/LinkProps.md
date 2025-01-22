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

[packages/sitecore-jss-react/src/components/Link.tsx:29](https://github.com/Sitecore/jss/blob/8dfc30480738a6477e61c78f1cd69e312022dcef/packages/sitecore-jss-react/src/components/Link.tsx#L29)
