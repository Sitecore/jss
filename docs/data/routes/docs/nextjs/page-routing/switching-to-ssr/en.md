---
name: switching-to-ssr
routeTemplate: ./data/component-templates/article.yml
title: Switching between SSG and SSR
---
# Walkthrough: Switching between Static Site Generation (SSG) and Server-Side Rendering (SSR)

The Next.js sample application `[[..path]].tsx` route can be optimized for either Static Site Generation (SSG) or Server-Side Rendering (SSR).

You can choose the initial pre-rendering form on create with the optional `prerender` parameter. SSG is used by default if you omit the parameter. For example, [with `jss create`](/docs/nextjs/getting-started-nextjs/walkthrough-jsscreate):

```
jss create my-first-jss-app nextjs [--prerender {SSG|SSR}]
```

However, you may wish to switch the pre-rendering form after creation or reference both for Next.js hybrid (both SSR & SSG) applications.

> See [Next.js documentation](https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering) to learn more about SSG, SSR, and hybrid forms of pre-rendering.

To switch the Next.js sample application from SSG to SSR:

1. Move or delete `\pages\[[..path]].tsx`
2. Download [`[[..path]].SSR.tsx`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/%5B%5B%2E%2E%2Epath%5D%5D.SSR.tsx) to `\pages\` and rename as `[[..path]].tsx`
3. Delete `\lib\sitemap-fetcher.ts` (optional)

To switch the Next.js sample application from SSR to SSG:

1. Move or delete `\pages\[[..path]].tsx`
2. Download [`[[..path]].tsx`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages/%5B%5B%2E%2E%2Epath%5D%5D.tsx) to `\pages\`
3. Download [`sitemap-fetcher.ts`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/lib/sitemap-fetcher.ts) to `\lib\`