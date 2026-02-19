# AGENTS.md — AI Guidance for Sitecore JSS Next.js + XM Cloud App

## Project Overview

This is a **Sitecore JSS** application built with **Next.js (Pages Router)**, **TypeScript**, and the **XM Cloud add-on**. AI agents work as developer assistants within this scaffolded head application. The app integrates with Sitecore XM Cloud for content, supports **FEAAS (Sitecore Components)**, **BYOC (Bring Your Own Components)**, **CDP/Personalize**, and GraphQL editing for the Sitecore Editor.

**Scope:** This file applies to **this application only** (a scaffolded head app with XM Cloud add-on). It is **not** the JSS monorepo — for SDK package development use that repo's root `AGENTS.md`. Here we edit app code and config (pages, components, API routes, lib); we do not modify SDK packages or CI.

---

## Quick Commands

```bash
npm install
npm run build           # Build for production
npm run next:dev        # Start development server
npm run next:start      # Start production server
npm run start:connected # Connected dev (bootstrap + next:dev + watch components)
npm run scaffold        # Add new Sitecore/BYOC component (jss scaffold <ComponentName>)
npm run lint            # Run ESLint
```

**Environment:** Use `.env` with Sitecore API key, host, Edge URL, Edge context ID (`SITECORE_EDGE_CONTEXT_ID`), `FETCH_WITH`, `NEXT_PUBLIC_PERSONALIZE_SCOPE`, and Personalize timeouts. Never commit `.env` or `.env.local`.

---

## Application Structure (XM Cloud Add-On)

```
src/
  pages/
    [[...path]].tsx         # Catch-all Sitecore page (SSG)
    feaas/render.tsx        # FEAAS render for Component Builder
    api/editing/            # config.ts, render.ts, feaas/render.ts
  components/               # Sitecore + FEAAS + BYOC (CdpPageView, FEAASScripts, etc.)
  byoc/                     # BYOC registration (index.tsx, index.client.tsx, index.hybrid.ts)
  lib/
    page-props-factory/     # + personalize, content-styles, component-themes plugins
    middleware/plugins/     # + personalize.ts (PersonalizeMiddleware)
    extract-path/plugins/   # + personalize.ts (path normalization for Personalize rewrites)
    graphql-editing-service.ts
  proxy.ts                  # Next.js 16 middleware entry; matcher excludes /feaas-render
temp/                       # config includes sitecoreEdgeUrl, sitecoreEdgeContextId
next.config.js
```

All base Next.js JSS concepts apply (page-props-factory, componentBuilder, pathExtractor, layout-service-factory, etc.). See the base nextjs template `AGENTS.md` in the JSS repo for full base guidance. Below are **XM Cloud add-on specifics** in detail.

---

## Key Concepts for This App (XM Cloud Add-On)

### FEAAS (Sitecore Components)

- **Where:** `src/components/FEAASScripts.tsx`, `src/pages/feaas/render.tsx`, `src/pages/api/editing/feaas/render.ts`, `FEaaSWrapper` in componentBuilder
- **What it does:** Renders Sitecore Components (FEAAS) in the app. The Component Builder in XM Cloud uses these to display and edit components. `FEAASScripts` registers Next.js Image for FEAAS `img` elements. The `feaas/render` page and `api/editing/feaas/render` API route serve FEAAS content for the Sitecore Editor.
- **Component registration:** Register FEAAS components in `scripts/generate-component-builder/plugins/feaas.ts`. `FEaaSWrapper` and `BYOCWrapper` (wrapper components) are in componentBuilder.
- **Do not:** Remove `FEAASScripts` from Layout/Scripts when using Sitecore Components. Keep editing routes in sync with component map. Do not skip FEAAS registration in component-builder plugins.

### BYOC (Bring Your Own Components)

- **Where:** `src/byoc/index.tsx`, `src/byoc/index.client.tsx`, `src/byoc/index.hybrid.ts`
- **What it does:** Registers custom React components for use in the Sitecore Editor (Component Builder). Add components via `jss scaffold` with the BYOC plugin. The BYOC module exports component registration for server, client, and hybrid rendering.
- **Do not:** Remove BYOC registration; the Sitecore Editor relies on it for custom components. When adding BYOC components, ensure they are registered in the appropriate index file (client vs server) based on their dependencies.

### CDP and Browser Events (Bootstrap)

- **Where:** `src/Bootstrap.tsx` (in _app.tsx), `CdpPageView` component
- **What it does:** `Bootstrap` initializes the CloudSDK (`@sitecore-cloudsdk/core/browser`) for page view tracking. Uses `config.sitecoreEdgeUrl`, `config.sitecoreEdgeContextId` from temp/config. Only initializes when `pageState === Normal` and `renderingType !== Component` (not in edit/preview). `CdpPageView` tracks page views for CDP/Personalize.
- **Config:** Edge URL and context ID from `scripts/config/plugins/edge-platform.ts`. Env: `SITECORE_EDGE_URL` (or `SITECORE_EDGE_CONTEXT_ID` for context).
- **Do not:** Remove `CdpPageView` when using personalization; it provides context for page variants. Do not initialize CloudSDK in development (Bootstrap skips it when `NODE_ENV === 'development'`).

### Personalize Middleware

- **Where:** `src/lib/middleware/plugins/personalize.ts`
- **What it does:** Runs `PersonalizeMiddleware` from `@sitecore-jss/sitecore-jss-nextjs/middleware` for A/B testing and personalization. Calls Sitecore Experience Edge for personalization info, then Sitecore Personalize (CDP) for page/component variants. Rewrites response to the selected variant. Uses `clientFactory` from graphql-client-factory, `config.sitecoreEdgeUrl`, `config.sitecoreEdgeContextId`. **Disabled in development** by default (`disabled: () => process.env.NODE_ENV === 'development'`).
- **Config:** `NEXT_PUBLIC_PERSONALIZE_SCOPE` (optional, isolates data when multiple XM Cloud envs share Personalize tenant), `PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT`, `PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT` (default 400ms).
- **Order:** Plugin uses `order = 1` to leave room for redirects. **Do not change middleware plugin order** — Personalize must run after any redirect/site resolution.
- **Path extractor:** `src/lib/extract-path/plugins/personalize.ts` normalizes paths when Personalize rewrites; strips personalize segment. Required for correct path resolution in getStaticProps/getServerSideProps.
- **Skip paths:** `PersonalizeMiddleware` has exclusion logic; ensure API routes, `_next`, static assets are excluded via the proxy matcher.

### GraphQL Editing Service

- **Where:** `src/lib/graphql-editing-service.ts`
- **What it does:** `GraphQLEditingService` instance used for fetching editing data in Pages preview (Metadata Edit Mode). Uses `clientFactory` from graphql-client-factory. Used when editing layout/metadata in the Sitecore Editor.
- **Do not:** Remove or bypass; the editing flow depends on it for Metadata Edit Mode.

### Edge Platform Config

- **Where:** `scripts/config/plugins/edge-platform.ts`
- **What it does:** Adds `sitecoreEdgeUrl` and `sitecoreEdgeContextId` to `temp/config`. Used by Bootstrap (CloudSDK), SitecoreContext (editing API), Personalize middleware, and CdpPageView. Reads from `SITECORE_EDGE_URL` (default `https://edge-platform.sitecorecloud.io`) and `SITECORE_EDGE_CONTEXT_ID`.
- **Note:** If both `sitecoreApiKey` and `sitecoreEdgeContextId` are set, `sitecoreEdgeContextId` is used (plugin logs a warning).
- **Env:** `SITECORE_EDGE_URL`, `SITECORE_EDGE_CONTEXT_ID` (or `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID` for client).

### Editing API Routes (XM Cloud)

- **Where:** `src/pages/api/editing/config.ts`, `render.ts`, `feaas/render.ts`
- **config.ts:** `EditingConfigMiddleware` with `components` from componentBuilder and `metadata` from `temp/metadata.json`. Used by Sitecore Editor to determine feature compatibility.
- **render.ts:** Renders layout for the Sitecore Editor. Uses component map and layout data.
- **feaas/render.ts:** Renders FEAAS components for the Component Builder in the Editor.
- **Do not:** Remove or alter these routes; XM Cloud Editor depends on them. Keep `temp/metadata.json` in sync (generated by scripts).

### SitecoreContext API (Edge)

- **Where:** `[[...path]].tsx` passes `api={{ edge: { contextId, edgeUrl } }}` to `SitecoreContext`
- **What it does:** Provides Edge context to the editing UI. Values from `config.sitecoreEdgeContextId` and `config.sitecoreEdgeUrl`.
- **Do not:** Omit when using XM Cloud; the Editor needs this for editing features.

---

## Next.js Pages Router Specifics (XM Cloud)

### Page and Layout

- **Catch-all:** Same as base — `sitecorePagePropsFactory.create(context)`. XM Cloud add-on adds extra page-props-factory plugins: `personalize`, `content-styles`, `component-themes`. Plugin order must be preserved.
- **Layout:** `Layout` includes `FEAASScripts` (from Scripts.tsx). `SitecoreContext` receives `api.edge` for Editor integration.
- **Bootstrap:** XM Cloud Bootstrap initializes CloudSDK; base Bootstrap does not. Ensure Bootstrap runs for CDP tracking.

### Rewrites and next.config

- **Rewrites:** Base rewrites apply. XM Cloud may add rewrites for `/feaas-render` or Component Builder paths via `lib/next-config/plugins/`. Check `next.config.js` and plugins.
- **Images:** `remotePatterns` include `feaas*.blob.core.windows.net` for FEAAS. Do not remove.

### Component Builder

- **FEAAS and BYOC:** `scripts/generate-component-builder/plugins/` includes `feaas.ts`, `form.ts`, `byoc.ts`. These register FEAAS, Form, and BYOC components. Do not remove plugin registration when using those features.

---

## Best Practices (XM Cloud)

- **Quick checks:** If Personalize is not working, ensure `NEXT_PUBLIC_PERSONALIZE_SCOPE` matches XM Cloud env and Personalize middleware is not disabled (check `NODE_ENV`). If FEAAS components do not render, verify `FEAASScripts` is in Layout/Scripts and component-builder plugins include feaas.
- **Security:** Use env vars only for Edge URL, context ID, Personalize scope. Never hardcode. Do not expose in client code except where required (e.g. `NEXT_PUBLIC_*` for client-side config).
- **Performance:** Personalize middleware runs on each request; keep it disabled in development. Ensure proxy matcher excludes static assets and API routes.
- **Sitecore patterns:** Preserve FEAAS, BYOC, and Personalize integration. When adding components, register in the appropriate plugin (component-builder, BYOC, FEAAS). Keep editing API routes and metadata in sync.

---

## DO & DON'T (XM Cloud add-on)

| DO | DON'T |
|----|-------|
| Keep FEAASScripts and BYOC registration when using those features | Remove FEAASScripts or BYOC when Sitecore Components/custom components are used |
| Preserve Personalize middleware plugin order | Change middleware plugin order (Personalize must run after redirects) |
| Use Edge config from temp/config (sitecoreEdgeUrl, sitecoreEdgeContextId) | Hardcode Edge URLs or context IDs |
| Pass `api.edge` to SitecoreContext for Editor | Omit api.edge when using XM Cloud Editor |
| Keep Personalize disabled in development for performance | Enable Personalize in dev unless testing |
| Document Edge and Personalize env vars in `.env` template | Commit `.env` or expose secrets |
| Run `npm run build` after changes | Add npm dependencies without approval |
| Include CdpPageView when using personalization | Remove CdpPageView when A/B or personalization is active |

---

## Guardrails for Agentic AI (XM Cloud)

- **Preserve behavior:** Do not change the Personalize middleware order, FEAAS/BYOC registration, or editing API route structure. Preserve Edge config flow (edge-platform plugin → temp/config → Bootstrap, SitecoreContext, Personalize).
- **Do not expand scope:** Limit edits to the app. Do not modify SDK packages. Do not change CloudSDK or Personalize integration without understanding the full flow.
- **Follow existing patterns:** When adding FEAAS or BYOC components, use the same registration pattern. Keep editing routes and metadata in sync.
- **Verify and stay safe:** After edits, app should build with `npm run build`. Do not commit secrets. Do not add deps without approval. When in doubt, prefer the existing implementation.
- **If the user asks for something that conflicts** (e.g. removing FEAAS, changing Personalize order), explain the constraint and suggest a safe alternative.

---

## Example Agent Tasks (XM Cloud)

- **Add a FEAAS component:** Register in `scripts/generate-component-builder/plugins/feaas.ts`; ensure FEaaSWrapper handles it. Add to Layout/placeholder if needed.
- **Add a BYOC component:** Use `jss scaffold` with BYOC plugin; ensure registration in `src/byoc/index.client.tsx` or `index.tsx` as appropriate.
- **Adjust Personalize config:** Update `personalize.ts` to change `disabled`, `scope`, or timeouts. Do not change `order` or the middleware chain.
- **Add Edge-related env var:** Add to template `.env`; extend `edge-platform.ts` if the var should be in temp/config; never commit real values.

---

## Boundaries (XM Cloud)

**Never edit:** `.next/`, `node_modules/`, `temp/`.

**Focus on (XM Cloud–specific):** `src/components/CdpPageView.tsx`, `src/components/FEAASScripts.tsx`, `src/byoc/`, `src/lib/middleware/plugins/personalize.ts`, `src/lib/graphql-editing-service.ts`, `src/pages/api/editing/`, `src/pages/feaas/render.tsx`, `scripts/config/plugins/edge-platform.ts`, `scripts/generate-component-builder/plugins/feaas.ts`, `scripts/generate-component-builder/plugins/byoc.ts`.

**Inherits from base:** All boundaries and patterns from the base nextjs template apply (page-props-factory, componentBuilder, layout-service-factory, middleware matcher, rewrites, etc.). See `packages/create-sitecore-jss/src/templates/nextjs/AGENTS.md` in the JSS repo for full base guidance.

---

## References

- [Sitecore JSS Documentation](https://jss.sitecore.com/docs)
- [Sitecore XM Cloud](https://doc.sitecore.com/xmc)
- [Sitecore Components (FEAAS)](https://doc.sitecore.com/xmc/en/developers/xm-cloud/sitecore-components.html)
- **JSS monorepo root AGENTS.md** — For SDK package development.
- **JSS base nextjs template AGENTS.md** — For core app patterns (page-props-factory, layout service, component builder, etc.).

---

**Remember:** This app extends the base JSS Next.js template with XM Cloud features. Follow base patterns first; add-on logic builds on them. When in doubt, preserve FEAAS, BYOC, and Personalize integration and refer to JSS docs.
