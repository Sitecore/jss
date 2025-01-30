[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / RichTextProps

# Type Alias: RichTextProps

> **RichTextProps**: `ReactRichTextProps` & `object`

## Type declaration

### internalLinksSelector?

> `optional` **internalLinksSelector**: `string`

Selector which should be used in order to prefetch it and attach event listeners

#### Default

```ts
'a[href^="/"]'
```

### prefetchLinks?

> `optional` **prefetchLinks**: `boolean`

Controls the prefetch of internal links. This can be beneficial if you have RichText fields
with large numbers of internal links in them.

#### Default

```ts
true
```

## Defined in

[sitecore-jss-nextjs/src/components/RichText.tsx:10](https://github.com/Sitecore/jss/blob/92f5707a5f98736d13ac70a08e503789a36d5deb/packages/sitecore-jss-nextjs/src/components/RichText.tsx#L10)
