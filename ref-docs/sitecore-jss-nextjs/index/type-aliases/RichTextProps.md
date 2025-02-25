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

[sitecore-jss-nextjs/src/components/RichText.tsx:10](https://github.com/Sitecore/jss/blob/c2bf4af7955ae6502bbd82bd590ced28dee62ffa/packages/sitecore-jss-nextjs/src/components/RichText.tsx#L10)
