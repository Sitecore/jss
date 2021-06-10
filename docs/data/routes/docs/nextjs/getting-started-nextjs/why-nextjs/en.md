---
name: why-nextjs
routeTemplate: ./data/component-templates/article.yml
title: Why Next.js and JSS
---
# Why Next.js and JSS?

[Next.js](https://nextjs.org/) is a framework built on top of **React**. It aims to help developers create production-ready applications with minimal need for configuration and boilerplate code. 

The latest JSS SDK leverages many of Next.js' [features](https://nextjs.org/#features), to simplify and enhance development workflow and experience. 

<p>
The following video highlights the benefits of Next.js.
<iframe width="672" height="378" src="https://www.youtube.com/embed/CfoOKlKjzfA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<small style="display:block">
    <a href="https://www.youtube.com/playlist?list=PL1jJVFm_lGnwZup4L4BjITS2sKr4rpMfI" target="_blank">
      View the entire Master Sitecore "Headless &amp; JSS" playlist on YouTube
    </a>
  </small>
</p>

## Improvements over previous JSS SDKs

* Development and production runtime parity, including SSR during development.
* Fewer confusing “modes” and deployment requirements.
* No Headless SSR Proxy needed for production or integration with Sitecore tracking.
* No need to deploy your application bundle to the Content Management instance for Experience Editor support.

## Features

- Support for Next.js static HTML export, incremental static site generation, server-side rendering, and hybrid rendering.
- Dynamic author-defined URLs via Next.js pages and the Sitecore Layout Service.
- Dynamic component rendering based on author-defined page layouts.
- Helper components for rendering various Sitecore field types.
- Sitecore Experience Editor integration via Next.js Preview Mode.
- Sitecore route querying for static site generation.
- Next.js client-side routing support for Sitecore link and rich text fields.
- Internationalization support via Sitecore language versions and Next.js internationalized routing.
- Component-level data fetching for Sitecore-driven components.
- Sitecore analytics and personalization support (SSR with Sitecore Layout Service REST API only).
- Support for JSS code-first workflow and mock Sitecore services.
- A sample/starter TypeScript-enabled implementation template which demonstrates common use cases.
- Containerized starter template for Windows-based developers.
- Other great built-in Next.js features like component-level CSS, code splitting, fast refresh, and more.
- [Vercel](https://vercel.com/) deployment compatible.