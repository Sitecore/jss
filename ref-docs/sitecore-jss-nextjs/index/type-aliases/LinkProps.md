[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / LinkProps

# Type Alias: LinkProps

> **LinkProps**: `ReactLinkProps` & `object`

## Type declaration

### internalLinkMatcher?

> `optional` **internalLinkMatcher**: `RegExp`

If `href` match with `internalLinkMatcher` regexp, then it's internal link and NextLink will be rendered

#### Default

```ts
/^//g
```

### prefetch?

> `optional` **prefetch**: `NextLinkProps`\[`"prefetch"`\]

Next.js Link prefetch.

## Defined in

[sitecore-jss-nextjs/src/components/Link.tsx:11](https://github.com/Sitecore/jss/blob/e75a84e27a017ba303b4e9b3a8e65d4dac4c8a59/packages/sitecore-jss-nextjs/src/components/Link.tsx#L11)
