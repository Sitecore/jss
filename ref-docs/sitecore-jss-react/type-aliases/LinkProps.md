[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / LinkProps

# Type Alias: LinkProps

> **LinkProps** = `EditableFieldProps`\<`LinkProps`\> & `React.AnchorHTMLAttributes`\<`HTMLAnchorElement`\> & `RefAttributes`\<`HTMLAnchorElement`\> & `object`

Defined in: [packages/sitecore-jss-react/src/components/Link.tsx:28](https://github.com/Sitecore/jss/blob/0855fc0bf7b8e965294dea4bcc778e59543a60e6/packages/sitecore-jss-react/src/components/Link.tsx#L28)

## Type Declaration

### field

> **field**: [`LinkField`](../interfaces/LinkField.md) \| [`LinkFieldValue`](../interfaces/LinkFieldValue.md) & `FieldMetadata`

The link field data.

### showLinkTextWithChildrenPresent?

> `optional` **showLinkTextWithChildrenPresent?**: `boolean`

Displays a link text ('description' in Sitecore) even when children exist
NOTE: when in Sitecore Experience Editor, this setting is ignored due to technical limitations, and the description is always rendered.
