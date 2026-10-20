[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / LinkProps

# Type Alias: LinkProps

> **LinkProps** = `ReactLinkProps` & `object` & `Pick`\<`NextLinkProps`, *typeof* `supportedNextLinkProps`\[`number`\]\>

Defined in: [sitecore-jss-nextjs/src/components/Link.tsx:24](https://github.com/Sitecore/jss/blob/f33619ddf50b2d04e7f866efb2d4fbbce54af6dd/packages/sitecore-jss-nextjs/src/components/Link.tsx#L24)

## Type Declaration

### internalLinkMatcher?

> `optional` **internalLinkMatcher?**: `RegExp`

If `href` match with `internalLinkMatcher` regexp, then it's internal link and NextLink will be rendered

#### Default

```ts
/^//g
```
