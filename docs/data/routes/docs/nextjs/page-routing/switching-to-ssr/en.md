---
name: switching-to-ssr
routeTemplate: ./data/component-templates/article.yml
title: Switching to SSR
---
# Walkthrough: Switching to SSR

By default, the Next.js sample application uses a route optimized for SSG. However, we have also provided a working SSR route you can use: `\pages_examples\[[..path]].SSR.tsx`.

This file may be used as a starter for SSR routes in Next.js hybrid (both SSR & SSG) applications, or may be used to switch the Next.js sample application to full SSR.

> SSR may be desired in cases where you want [full Sitecore analytics and personalization functionality](/docs/nextjs/tracking-and-analytics/overview).

To switch the Next.js sample application to full SSR:

1. Rename the `\pages\[[..path]].tsx` to `[[..path]].SSG.tsx` and move to `\pages_examples\`
2. Rename the `\pages_examples\[[..path]].SSR.tsx` to `\pages_examples\[[..path]].tsx` and move to `\pages\`