[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / RichTextProps

# Type Alias: RichTextProps

> **RichTextProps** = `ReactRichTextProps` & `object`

Defined in: [sitecore-jss-nextjs/src/components/RichText.tsx:8](https://github.com/Sitecore/jss/blob/de5a366b5c64e694b6838ed9bfcd3f3d778e5453/packages/sitecore-jss-nextjs/src/components/RichText.tsx#L8)

## Type Declaration

### internalLinksSelector?

> `optional` **internalLinksSelector?**: `string`

Selector which should be used in order to prefetch it and attach event listeners

#### Default

```ts
'a[href^="/"]'
```

### prefetchLinks?

> `optional` **prefetchLinks?**: `boolean` \| `"hover"`

Controls the prefetch of internal links. This can be beneficial if you have RichText fields
with large numbers of internal links in them.
- `true` (default): The full route & its data will be prefetched.
- `hover`: Prefetching will happen on hover.
- `false`: Prefetching will not happen.

#### Default

```ts
true
```
