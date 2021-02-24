---
name: switching-to-ssr
routeTemplate: ./data/component-templates/article.yml
title: Switching to SSR
---
# Walkthrough: Switching to Server-side Rendering (SSR)

By default, the Next.js sample application uses a route optimized for Static Generation (SSG). However, we have also provided a working Server-side Rendering (SSR) route you can use: [`\pages_examples\[[..path]].SSR.tsx`](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/pages_examples/%5B%5B%2E%2E%2Epath%5D%5D.SSR.tsx).

This file may be used as a starter for SSR routes in Next.js hybrid (both SSR & SSG) applications, or may be used to switch the Next.js sample application to full SSR.

> See [Next.js documentation](https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering) to learn more about SSG, SSR, and hybrid modes of pre-rendering.

To switch the Next.js sample application to full SSR:

1. Rename the `\pages\[[..path]].tsx` to `[[..path]].SSG.tsx` and move to `\pages_examples\`
2. Rename the `\pages_examples\[[..path]].SSR.tsx` to `\pages_examples\[[..path]].tsx` and move to `\pages\`