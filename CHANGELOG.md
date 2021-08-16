# Changelog
All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

This project does NOT adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html), and major versions of this project denote compatibility with Sitecore Platform versions. Refer to the "Headless Services" section in the [Sitecore modules compatibility table](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB0541788) or the [Headless Rendering download page](https://dev.sitecore.net/Downloads/Sitecore_Headless_Rendering.aspx) for more details on versioning.

# Unreleased

## New Features and Notable Improvements
`[sitecore-jss-react]` `[sitecore-jss-nextjs]` Add `withDatasourceCheck` higher order component (HOC) to better error handling for renderings missing datasources (#723)

`[sitecore-jss-*]` Compile and publish all base package as ESM (#758)

`[sitecore-jss]` `[sitecore-jss-nextjs]` [Dictionary Service] [Sitemap Service] Provide ability to customize jssAppTemplateId (#763)

`[sitecore-jss]` `[sitecore-jss-nextjs]` `[sitecore-jss-react]` `[sitecore-jss-angular]` `[sitecore-jss-vue]` `[sitecore-jss-react-native]`
  Update editing functions for **Horizon** compatibility (backwards compatible) (#712)(#723)

`[sitecore-jss-nextjs]`
* Upgrade to Next.js 11 (#768)
* Utilize the `VERCEL_URL` env variable (if available) for generating public URLs (#725)
* Enable dynamic component import (#727)
* Prevent extraneous router.replace in Experience Editor when using SSG (#736)

`[sitecore-jss-vue]`
* Upgrade version 2.x to 3.x (#724)
* Use fragments by default with sc-placeholder (#742)

## Notable Improvements to Samples
* Remove usage deprecated dataApi (#744)
* Dependency upgrades

`[nextjs]` `[react]` `[angular]` `[vue]`
* More reliable detection of disconnected or connected mode (#732)
* **Horizon** compatibility (#712)(#752)

`[react]` `[angular]` `[vue]` Add support for the `fetchWith` create option, which selects REST or GraphQL APIs (#773)

`[nextjs]`
* Styleguide component datasource resiliency (#723)
* Enable creating a new app without boilerplate with the `--empty` flag (#754)
* Enable dynamic component import in sample (#727)(#730)

`[vue]` Upgrade version 2.x to 3.x. Simplify dependencies; remove dependency on **i18n** (#724)

`[angular]` dk-DA language is not rendered in connected and disconnected mode (#734)

`[embedded-app]` Remove dependency on StepZilla (#747)

`[node-headless-ssr-proxy]` Remove '/dist' path from pathRewriteExcludeRoutes (#756)

## Bug fixes
`[sitecore-jss-react]` Error rendering raw self-closing tag elements in placeholders (#745)

`[sitecore-jss-react-forms]` Experience Forms JSS React implementation doesn't use CSS class applied to entire form (#771)


## Maintenance
**Breaking change** `[sitecore-jss]` `[sitecore-jss-vue]` `[sitecore-jss-react-native]` `[sitecore-jss-react]` `[sitecore-jss-nextjs]` `[sitecore-jss-angular]` Remove deprecated dataApi (#744)

Dependency upgrades

.

.


# 18.0.0

## New Features
All JSS services have been upgraded to support [**Sitecore Experience Edge** GraphQL schema](https://doc.sitecore.com/developers/101/developer-tools/en/the-experience-edge-schema.html).

The `[nextjs]` sample uses Edge schema by default.

`[samples/nextjs]`
* Update Sitecore configuration patches with relevant Edge-specific definitions.
* [#695](https://github.com/Sitecore/jss/pull/695) Add settings for language fallback with Experience Edge.
* [#696](https://github.com/Sitecore/jss/pull/696) Add `IncludeServerUrlInMediaUrls` "default" configuration to avoid exposing the Sitecore server publicly when using Experience Edge.

`[react]` `[angular]` and `[vue]` samples can also utilize Sitecore Experience Edge. A new `[node-headless-ssr-experience-edge]` sample has been adeded to demonstrate how to configure this. [Read docs](/docs/techniques/ssr/sitecore-experience-edge).

## New & Improved Service Classes

`[sitecore-jss]`
* `GraphQLDictionaryService` is a new service for fetching dictionary data using GraphQL [Read docs](https://jss.sitecore.com/docs/fundamentals/services/dictionary/jss-dictionary-api).
* `GraphQLLayoutService` is a new service for fetching layout data using GraphQL [Read docs](https://jss.sitecore.com/docs/fundamentals/services/layout/jss-layout-api).
* [#716](https://github.com/Sitecore/jss/pull/716) Allow overriding which "named" Layout Service configuration (from Sitecore config) is used by JSS.
* Allow overriding 3rd party dependencies in JSS services that depend on 3rd party functionality (GraphQLLayoutService, RestDictionaryService, GraphQLDictionaryService, GraphQLSitemapService).

`[sitecore-jss-nextjs]`
* Make `GraphQLSitemapService` easier to customize by allowing overrides of default options. ([#682](https://github.com/Sitecore/jss/pull/682), [#705](https://github.com/Sitecore/jss/pull/705)) 

## Other Notable Improvements

* `[sitecore-jss]` Enable **debug logging** for JSS services using the [debug](https://www.npmjs.com/package/debug) module. [Read docs](/docs/fundamentals/troubleshooting/debug-logging).
* New options in `jss create` command. [Read docs](/TODO).

`[samples/react-native]` (#624)
* Add shared `<Layout/>` component in order to have shared navigation panel.
* Make Sitecore logo in header is touchable and will navigate to Home page when click on it.
* Remove usage of `dataConversation`.

## Bug Fixes

`[sitecore-jss]`
* Fix issue with dictionary phrases not being cached when caching is enabled (#639)
* `mediaApi.updateImageUrl` now *only* switches to JSS media handler prefix if `imageParams` are sent. Otherwise, the original media URL is returned. Fixes hash errors ("ERROR MediaRequestProtection: An invalid/missing hash value was encountered.") from appearing in Sitecore logs (#681)

`[samples/nextjs]` `[samples/react]` `[samples/vue]`
* Fix issue where using the `jss scaffold` generated files with inconsistent line endings (#684)
* Update Text components to accept number values (#713)

`[sitecore-jss-nextjs]`
* Fix issue with `getStaticPaths`only pre-rendering the first 10 pages (638)
* Fix issue where links inside RichText controls caused pages to load twice (659)

`[sitecore-jss-react]` Render value instead of array of single value when value doesn't contain line breaks (714)

`[sitecore-jss-react-native]` (#624)
* [Image] Pass Object `style` type for `SvgUrI` instead of Array.
* [Date] Always render `<HtmlView/>` if `editable` is provided.

`[samples/react-native]` (#624)
* Fix Styleguide-FieldUsage-Date not working in connected mode.
* **Styleguide-FieldUsage-Image**: Fix incorrect `src` prop type in disconnected mode. Fix 'Plain image' example in connected mode. Remove unsupported 'Srcset image' adaptive example.
* **Styleguide-ComponentParams**: fix incorrect `params` prop types in connected mode.
* Fix connected tunnel mode for secure (https) Sitecore endpoints.

`[samples/node-headless-ssr-proxy]` Fix how header value for 'accept-encoding' is set. This resolves an issue in the Angular sample where the /graphql page caused a console error (#680)

`[sitecore-jss-forms]` Fix issue where pre-filled (default) form data isn't removed for multi-valued fields when user de-selects values (#677)


## Breaking changes

`[sitecore-jss-react-native]` Removed `dataConversation`, since `editable` property not used in `disconnected` mode. (#624)

`[samples/angular]` Upgrade `angular` to v11. (#635)

`[samples/nextjs]` Change how a custom query can be used in GraphQLSitemapService. Previous way: pass a `formatSearchQuery` function to `fetchExportSitemap` or `fetchSSGSitemap`. New way: extend the `GraphQLSitemapService` class and override the `fetchSitemap` method. (#638)

* As part of adding support for Experience Edge, Sitecore XM's graphQL API was updated to mirror Experience Edge's schema. The following updates in JSS
  * [sitecore-jss-nextjs] Update sitemap query to comply with changes to the GraphQL API
  * [samples/nextjs] Update generated TypeScript models for GraphQL components to comply with changes to the GraphQL API

With the added support of GraphQL endpoints, the API surface area of JSS has essentially doubled. As a result, some reorganizing was done in the base packages, which causes breaking changes for how some services, classes and functions are exported. If you have imports from JSS base packages in your project, they may need to be updated per the [migration guide table](https://jss.sitecore.com/upgrade-guides/18.0).
