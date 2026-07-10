[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / LinkProps

# Type Alias: LinkProps

> **LinkProps** = `ReactLinkProps` & `object` & `Pick`\<`NextLinkProps`, *typeof* `supportedNextLinkProps`\[`number`\]\>

Defined in: [sitecore-jss-nextjs/src/components/Link.tsx:24](https://github.com/Sitecore/jss/blob/4ce2efe7e448483cf1ae360a90417b0dfe43089b/packages/sitecore-jss-nextjs/src/components/Link.tsx#L24)

## Type Declaration

### internalLinkMatcher?

> `optional` **internalLinkMatcher?**: `RegExp`

If `href` match with `internalLinkMatcher` regexp, then it's internal link and NextLink will be rendered

#### Default

```ts
/^//g
```
