[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / LinkProps

# Type Alias: LinkProps

> **LinkProps** = `ReactLinkProps` & `object` & `Pick`\<`NextLinkProps`, *typeof* `supportedNextLinkProps`\[`number`\]\>

Defined in: [sitecore-jss-nextjs/src/components/Link.tsx:24](https://github.com/Sitecore/jss/blob/a3875474f0467d1f797f9f2665ed814a1c0c85c5/packages/sitecore-jss-nextjs/src/components/Link.tsx#L24)

## Type Declaration

### internalLinkMatcher?

> `optional` **internalLinkMatcher?**: `RegExp`

If `href` match with `internalLinkMatcher` regexp, then it's internal link and NextLink will be rendered

#### Default

```ts
/^//g
```
