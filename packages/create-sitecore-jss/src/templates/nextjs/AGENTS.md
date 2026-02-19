# AGENTS.md — AI Guidance for Sitecore JSS Next.js (Pages Router) App

## Project Overview

This is a **Sitecore JSS** application built with **Next.js (Pages Router)** and **TypeScript**. AI agents work as developer assistants within this scaffolded head application. The app integrates with Sitecore XM Cloud (or on-premises) for content, uses Layout Service (REST) or GraphQL for data fetching, and supports SSG or SSR.

**Scope:** This file applies to **this application only** (a scaffolded head app). It is **not** the JSS monorepo — for SDK package development use that repo's root `AGENTS.md`. Here we edit app code and config (pages, components, API routes, lib); we do not modify SDK packages or CI.

---

## Quick Commands

```bash
npm install
npm run build           # Build for production (runs bootstrap + next build)
npm run next:dev        # Start development server
npm run next:start      # Start production server
npm run start:connected # Connected dev (bootstrap + next:dev + watch components)
npm run scaffold        # Add new Sitecore component (jss scaffold <ComponentName>)
npm run lint            # Run ESLint
```

**Environment:** Use `.env` with Sitecore API key, host, site name, language, and `FETCH_WITH` (REST or GraphQL). Never commit `.env` or `.env.local`. Config comes from `package.json` config section, `scjssconfig.json` (from `jss setup`), and env vars.

---

## Application Structure (Pages Router)

```
src/
  pages/                    # Next.js Pages Router
    [[...path]].tsx         # Catch-all Sitecore page (SSG or SSR)
    _app.tsx
    404.tsx, _error.tsx
    api/                    # API routes (editing, healthz)
  components/               # Sitecore components (registered in componentBuilder)
  lib/                      # Core app logic
    page-props-factory/     # Plugins: site, normal-mode, preview-mode, component-props
    middleware/             # Middleware with plugins (temp/middleware-plugins)
    extract-path/           # Path extraction with plugins
    site-resolver/          # Site resolution with plugins
    layout-service-factory.ts
    dictionary-service-factory.ts
    graphql-client-factory/  # GraphQL client (when FETCH_WITH=GraphQL)
    sitemap-fetcher/        # SSG paths (plugins: graphql-sitemap-service, etc.)
    component-props/        # ComponentPropsService, fetchComponentProps
    config.ts
  Layout.tsx, Bootstrap.tsx, Scripts.tsx, NotFound.tsx
  proxy.ts                  # Next.js 16 middleware entry (re-exports lib/middleware)
temp/                       # Auto-generated — DO NOT EDIT
  config.ts                 # From scripts/config/plugins
  componentBuilder.ts       # From scripts/generate-component-builder
  page-props-factory-plugins.ts, middleware-plugins.ts, sitemap-fetcher-plugins.ts, etc.
scripts/                    # Bootstrap, scaffold-component, generate-plugins, config
sitecore/config/            # Sitecore CM config (e.g. {{appName}}.config)
next.config.js              # i18n, rewrites, images (uses temp/config, temp/next-config-plugins)
```

---

## Key Concepts for This App

These are the main head-app–specific concepts. Details are in the sections below.

### Page Props Factory

- **Where:** `src/lib/page-props-factory/index.ts` — `sitecorePagePropsFactory.create(context)`
- **What it does:** Plugin chain fetches layout data, dictionary, and component props. Used in `getStaticProps` or `getServerSideProps` in `[[...path]].tsx`. Plugin order: **site** (0) → **normal-mode** or **preview-mode** (1) → **component-props** (10).
- **Plugins:** Defined in `src/lib/page-props-factory/plugins/`; auto-exported to `temp/page-props-factory-plugins.ts` via `scripts/generate-plugins.ts`. **Do not change plugin order** without understanding dependencies.
- **Data sources:** `layoutServiceFactory` and `dictionaryServiceFactory` — Layout Service (REST) or GraphQL per `FETCH_WITH` env. GraphQL uses `lib/graphql-client-factory`; REST uses `config.sitecoreApiHost`, `config.sitecoreApiKey`.

### Layout Service and Dictionary Service

- **Where:** `src/lib/layout-service-factory.ts`, `src/lib/dictionary-service-factory.ts`
- **Layout service:** `RestLayoutService` or `GraphQLLayoutService` per `FETCH_WITH`. Fetches layout data (route, placeholders) from Sitecore.
- **Dictionary service:** Fetches i18n dictionary for the site/locale.
- **Do not:** Create duplicate instances; use the factories. They are called from `normal-mode` plugin.

### Catch-All Route

- **Where:** `src/pages/[[...path]].tsx`. This is the **only** page component that renders Sitecore content; the optional `[[...path]]` segment captures the content path.
- **Flow:** Path from `pathExtractor.extract(context.params)` (normalized Sitecore item path); locale from `context.locale` (Next.js i18n). Call `sitecorePagePropsFactory.create(context)` — returns `{ layoutData, componentProps, dictionary, notFound, site, locale, headLinks }`. For SSG, `getStaticPaths` uses `sitemapFetcher.fetch(context)` with paths from sitemap plugin (e.g. GraphQL). For preview, `context.preview` and `context.previewData`; the `preview-mode` plugin uses `editingDataService.getEditingData(context.previewData)`.
- **Do not:** Add another page or catch-all for Sitecore content; keep this single entry point.

### How Locale Works

- **Config:** `next.config.js` → `i18n.locales` and `i18n.defaultLocale` (from `jssConfig.defaultLanguage`). Match (or subset) Sitecore languages. There is no `[locale]` in the URL path; Next.js i18n handles locale via its built-in behavior.
- **In the app:** Per-request locale is `context.locale` in `getStaticProps` and `getServerSideProps`. Pass it to layout service and dictionary. The `site` plugin resolves `props.site` from `siteResolver.getByName(config.sitecoreSiteName)`; locale is `context.locale ?? props.site.language`.
- **Do not:** Assume locale from headers or elsewhere; always use `context.locale` and the resolved site for Sitecore calls.

### Component Builder and Component Props

- **Component builder:** `temp/componentBuilder.ts` — auto-generated by `scripts/generate-component-builder/`. Registers all Sitecore components. Use `componentBuilder.getComponentFactory({ isEditing })` in the page. Add components via `jss scaffold` or by extending `scripts/generate-component-builder/plugins/`. **Do not edit temp/ manually.**
- **Component props:** The `component-props` plugin calls `fetchComponentProps(props.layoutData, context)` which uses `ComponentPropsService` and `moduleFactory` from componentBuilder to fetch getStaticProps/getServerSideProps for each component.

### Middleware (proxy)

- **Where:** `src/proxy.ts` — Next.js 16 entry point for middleware (replaces `middleware.ts`). Re-exports `lib/middleware`.
- **What it does:** Runs on each request (respecting `config.matcher`). Plugin chain from `temp/middleware-plugins.ts`; plugins in `src/lib/middleware/plugins/`. Base template may have no custom plugins; add-ons (e.g. nextjs-xmcloud) inject plugins (e.g. Personalize). **Do not change plugin order.** Matcher excludes `/api`, `/_next`, `/healthz`, `/sitecore/api`, `/-`, static files.
- **Config:** `proxy.ts` exports `config.matcher` array. Keep middleware lightweight; do not add heavy logic without excluding paths.

### Config and Env

- **temp/config:** Generated from `scripts/config/plugins/`. Provides `sitecoreApiHost`, `sitecoreApiKey`, `sitecoreSiteName`, `defaultLanguage`, `publicUrl`, etc. Built at bootstrap from `scjssconfig.json`, `package.json` config, and env vars.
- **package.json config:** `appName`, `rootPlaceholders`, `graphQLEndpointPath`, `language`
- **scjssconfig.json:** Generated by `jss setup`; git-ignored. Contains API key and host for local dev.
- **.env:** `SITECORE_API_KEY`, `SITECORE_API_HOST`, `SITECORE_SITE_NAME`, `FETCH_WITH`, `GRAPH_QL_ENDPOINT`, `DEFAULT_LANGUAGE`, `GRAPH_QL_SERVICE_RETRIES`, `JSS_EDITING_SECRET`, `DISABLE_SSG_FETCH` (SSG), etc. Never commit.

### Site Resolver and Path Extractor

- **Site resolver:** `src/lib/site-resolver/` — plugins resolve site. Default plugin adds `config.sitecoreSiteName` with `hostName: '*'`. Used by `site` plugin in page-props-factory.
- **Path extractor:** `src/lib/extract-path/` — `pathExtractor.extract(context.params)` normalizes path from `params.path` (array or string) to leading-slash format. Plugins in `extract-path/plugins/` can transform path (e.g. personalization add-on).

### Sitemap Fetcher (SSG)

- **Where:** `src/lib/sitemap-fetcher/` — `sitemapFetcher.fetch(context)` returns `StaticPath[]` for getStaticPaths. Plugins in `sitemap-fetcher/plugins/` (e.g. `graphql-sitemap-service` when FETCH_WITH=GraphQL).
- **SSG only:** Used when `prerender === 'SSG'`. When `DISABLE_SSG_FETCH=true` or in development, paths may be empty with `fallback: 'blocking'` for ISR.

### More (editing, rewrites)

- **Editing/preview:** Use `context.preview` and `context.previewData` in the catch-all; `preview-mode` plugin handles it. Editing API routes: `src/pages/api/editing/render.ts`, `api/editing/data/[key].ts` — used by Sitecore Editor (XM Cloud).
- **Rewrites:** `next.config.js` → rewrites for `/sitecore/api/:path*`, `/-/:path*`, `/healthz` → `/api/healthz`, `/sitecore/service/:path*`. Config from `temp/config` and `temp/next-config-plugins`.

---

## Next.js Pages Router Specifics

### Routing and Data Fetching

- **_app.tsx:** Wraps the app and receives the page/layout from the catch-all's getStaticProps/getServerSideProps. Do not fetch Sitecore data in _app; all data flows from `[[...path]].tsx`.
- **Single page for Sitecore content:** `src/pages/[[...path]].tsx` is the catch-all. Path from `pathExtractor.extract(context.params)`; locale from `context.locale`.
- **SSG:** Uses `getStaticPaths` and `getStaticProps`. Paths from `sitemapFetcher.fetch(context)`. Use `revalidate` for ISR. When `DISABLE_SSG_FETCH=true` or in development, paths may be empty with `fallback: 'blocking'`.
- **SSR:** Uses `getServerSideProps` only; no `getStaticPaths`.
- **Preview:** `context.preview` and `context.previewData`; `preview-mode` plugin uses `editingDataService.getEditingData(context.previewData)`.
- **Page data:** `sitecorePagePropsFactory.create(context)` — layout, dictionary, component props, site, locale, notFound.

### i18n (Pages Router)

- **Config:** `next.config.js` → `i18n.locales` and `i18n.defaultLocale` (from `jssConfig.defaultLanguage`).
- **Per-request locale:** `context.locale` in getStaticProps / getServerSideProps.

### Middleware (proxy)

- **Middleware:** `src/proxy.ts` → `lib/middleware`. Plugins from `temp/middleware-plugins` (generated from `lib/middleware/plugins/`). Chain runs in `order`; each plugin receives req and previous response.
- **Matcher:** Excludes `/api`, `/_next`, `/healthz`, `/sitecore/api`, `/-`, `favicon.ico`, `sc_logo.svg`. Add new exclusions if adding routes.
- **Add-ons:** nextjs-xmcloud adds Personalize plugin. Do not change order when combining add-ons.

### API Routes

- **Editing:** `src/pages/api/editing/render.ts`, `api/editing/data/[key].ts` — used by Sitecore Editor. Config from componentBuilder and layout data.
- **Health:** `src/pages/api/healthz.ts` — health check. Rewrite: `/healthz` → `/api/healthz`.
- **Rewrites:** `next.config.js` → `rewrites()` for Sitecore paths, healthz. Plugins in `lib/next-config/plugins/` can extend config.

### Layout and Components

- **Layout:** `Layout.tsx` renders page layout and placeholders. The catch-all page wraps content in `SitecoreContext` and `ComponentPropsContext`; `Layout` uses `componentBuilder.getComponentFactory({ isEditing })` and `Placeholder` for dynamic layout. `_app.tsx` includes `Bootstrap` and `I18nProvider`; base Bootstrap returns null (XM Cloud add-on extends it for CloudSDK/CDP).
- **404 / _error:** `NotFound` component. When catch-all returns `notFound: true`, Next.js renders `404.tsx` (which renders `<NotFound />`). `_error.tsx` handles 500 and other server/client errors (Next.js error boundary).
- **Component registration:** All components in `componentBuilder` (from `temp/componentBuilder.ts`). Add via `jss scaffold` or `scripts/generate-component-builder/plugins/`.

---

## Best Practices

- **Quick checks:** If path or locale is wrong, ensure you use `pathExtractor.extract(context.params)` and `context.locale`; do not assume from elsewhere. Keep page-props-factory plugin order (site → normal/preview → component-props). Keep middleware matcher excluding API and static paths.
- **Security:** Use only environment variables; never hardcode API keys, editing secret, or host URLs. Do not expose secrets in client-side code or logs. Validate and sanitize user input at boundaries.
- **Performance:** Keep middleware lightweight. Use `revalidate` in getStaticProps for ISR. Prefer server-side data fetching. Do not run layout/dictionary fetches in client components when SSR/SSG is intended.
- **Sitecore patterns:** Use JSS field components (`<Text>`, `<Image>`, `<RichText>`) and validate field existence. Register new components via `jss scaffold` and component-builder plugins. **Never edit temp/** — it is regenerated at build.
- **Consistency:** Follow patterns in `[[...path]].tsx`, `_app.tsx`, and page-props-factory plugins. When adding API routes or rewrites, keep middleware matcher and next.config in sync.

---

## DO & DON'T (app-level)

| DO | DON'T |
|----|-------|
| Use `pathExtractor.extract(context.params)` and `context.locale` | Assume path or locale from elsewhere |
| Use `sitecorePagePropsFactory.create(context)` in getStaticProps/getServerSideProps | Fetch in client components when SSR/SSG is intended |
| Add components via `jss scaffold` and component-builder plugins | Edit `temp/` files manually |
| Use layoutServiceFactory and dictionaryServiceFactory | Create duplicate layout/dictionary instances |
| Follow existing SSG/SSR and preview patterns | Change getStaticPaths/getStaticProps contract without updating callers |
| Use JSS field components and validate fields | Expose API keys or editing secret in client code |
| Document required env vars in `.env` (template) | Commit `.env` or `.env.local` |
| Run `npm run build` after changes | Add npm dependencies without explicit approval |
| Keep middleware matcher and plugin order | Add heavy logic to middleware without exclusions |

---

## Guardrails for Agentic AI

- **Preserve behavior:** Do not change the contract of `getStaticPaths` / `getStaticProps` (or getServerSideProps), the page-props-factory plugin order, or the shape of page props/layout without updating all consumers. Preserve SSG/SSR and preview behavior.
- **Do not expand scope:** Limit edits to the app (pages, components, API routes, lib, config). Do not modify SDK packages or monorepo tooling unless explicitly asked. Do not change CI, lockfiles, or root config.
- **Follow existing patterns:** When adding plugins, components, or routes, mirror the existing structure. Use the same layout service, dictionary service, and config. Do not introduce new patterns (e.g. a second layout service or different path resolution) without clear need.
- **Verify and stay safe:** After edits, the app should build with `npm run build`. Do not commit secrets or `.env`; only document variables in template `.env`. Do not add npm dependencies without explicit approval. **Never edit temp/** — those files are auto-generated.
- **If the user asks for something that conflicts with these guardrails** (e.g. editing temp/, committing .env, skipping component registration), explain the constraint and suggest a safe alternative rather than complying.

---

## Example Agent Tasks

- **Add a new Sitecore component:** Run `jss scaffold` or add to `scripts/generate-component-builder/plugins/`, ensure component is in the generated componentBuilder; ensure it is rendered in Layout/placeholder as in existing components.
- **Add a page-props-factory plugin:** Create in `src/lib/page-props-factory/plugins/`, set `order`, ensure it is picked up by `scripts/generate-plugins.ts` (or the plugin definition for page-props-factory).
- **Add middleware plugin:** Create in `src/lib/middleware/plugins/`; ensure `scripts/generate-plugins.ts` includes it; keep order and matcher consistent.
- **Add an API route:** Create under `src/pages/api/`, add a rewrite in `next.config.js` if needed (via `lib/next-config/plugins/`), ensure proxy matcher excludes it.

---

## Boundaries

**Never edit:** `.next/`, `node_modules/`, `temp/` (auto-generated).

**Environment variables:** You may add new env vars when needed. Add the variable to the template `.env` with a placeholder or comment; never put real secrets in template files. If editing `.env.local` for local dev, add only the variable name and tell the user to set the value. **Never commit** `.env` or `.env.local` — they are gitignored.

**Edit with care:** `next.config.js` (rewrites, i18n), `proxy.ts` (matcher), plugin order in page-props-factory and middleware, `scripts/generate-plugins.ts` when adding new plugin types. When adding API routes or rewrites, keep middleware matcher and rewrite rules consistent.

**Focus on:** `src/pages/`, `src/components/`, `src/lib/`, `Layout.tsx`, `Bootstrap.tsx`, `next.config.js`, `proxy.ts`, `scripts/generate-component-builder/plugins/`, `scripts/config/plugins/`, `lib/page-props-factory/plugins/`, `lib/middleware/plugins/`.

---

## References

- [Sitecore JSS Documentation](https://jss.sitecore.com/docs)
- [Next.js Pages Router](https://nextjs.org/docs/pages) — Data fetching, API routes, i18n.
- **JSS monorepo root AGENTS.md** — For SDK package development; not for this head app.
- **JSS monorepo CLAUDE.md** — Full coding standards and Sitecore patterns.

**For head applications / starters:** This AGENTS.md is the guide for scaffolded JSS Next.js apps. Do not replace it with the JSS monorepo root AGENTS.md — that file describes the SDK source tree. Adjust only what is specific to your project (e.g. custom layout or workflow).

---

**Remember:** When in doubt, follow existing patterns in this app and refer to JSS docs and CLAUDE.md for Sitecore and code standards.
