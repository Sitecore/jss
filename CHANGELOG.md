# Changelog
All notable changes to this project will be documented in this file. The format (starting with 18.0.0) is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

This project does NOT adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html), and major versions of this project denote compatibility with Sitecore Platform versions. Refer to the "Headless Services" section in the [Sitecore modules compatibility table](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB0541788) or the [Headless Rendering download page](https://dev.sitecore.net/Downloads/Sitecore_Headless_Rendering.aspx) for more details on versioning.

## Unreleased

### New Features & Improvements

`[sitecore-jss-*]` Consolidated tightly coupled packages together and refactored the sitecore base package into submodules.  ([#824](https://github.com/Sitecore/jss/pull/824))

`[samples/angular]` Language is now preserved when navigating to another page ([#793](https://github.com/Sitecore/jss/pull/793))

`[samples/nextjs][samples/react][samples/vue][samples/angular][sitecore-jss-cli]` Prefix added to templates which is replaced on jss create ([#800](https://github.com/Sitecore/jss/pull/800), [#811](https://github.com/Sitecore/jss/pull/811), [#813](https://github.com/Sitecore/jss/pull/813), [#814](https://github.com/Sitecore/jss/pull/814), [#816](https://github.com/Sitecore/jss/pull/816))

## 19.0.0

### New Features & Improvements

`[sitecore-jss-react]` `[sitecore-jss-nextjs]` Add `withDatasourceCheck` higher order component (HOC) to better handle renderings with missing datasources ([#723](https://github.com/Sitecore/jss/pull/723))

`[sitecore-jss-*]` Compile and publish all base package as ESM ([#758](https://github.com/Sitecore/jss/pull/758))

`[sitecore-jss]` `[sitecore-jss-nextjs]` [Dictionary Service] [Sitemap Service] Provide ability to customize jssAppTemplateId ([#763](https://github.com/Sitecore/jss/pull/763))

`[sitecore-jss]` Update editing functions for **Horizon** compatibility (backwards compatible) ([#712](https://github.com/Sitecore/jss/pull/712))

`[sitecore-jss-nextjs]`
* Upgrade to Next.js 11 ([#768](https://github.com/Sitecore/jss/pull/768))
* Utilize the `VERCEL_URL` env variable (if available) for generating public URLs ([#725](https://github.com/Sitecore/jss/pull/725))
* Enable dynamic component import ([#727](https://github.com/Sitecore/jss/pull/727))
* Prevent extraneous router.replace in Experience Editor when using SSG ([#736](https://github.com/Sitecore/jss/pull/736))

`[sitecore-jss-vue]`
* Upgrade version 2.x to 3.x ([#724](https://github.com/Sitecore/jss/pull/724))
* Use fragments by default with sc-placeholder ([#742](https://github.com/Sitecore/jss/pull/742))

`[samples/nextjs]` `[samples/react]` `[samples/angular]` `[samples/vue]`
* Remove usage of deprecated `dataApi`. Replaced by `RestLayoutService` and `RestDictionaryService` ([#744](https://github.com/Sitecore/jss/pull/744))
* More reliable detection of disconnected or connected mode ([#732](https://github.com/Sitecore/jss/pull/732))

`[samples/react]` `[samples/angular]` `[samples/vue]`  ([#773](https://github.com/Sitecore/jss/pull/773))
* Add support for the `--fetchWith` option for `jss create`, which selects REST or GraphQL APIs
* Update to use Edge schema for GraphQL by default
* Update Sitecore configuration patches with relevant Edge-specific definitions

`[samples/nextjs]`
* Upgrade to Next.js 11 ([#768](https://github.com/Sitecore/jss/pull/768))
* **Horizon** editor compatibility ([#712](https://github.com/Sitecore/jss/pull/712), [#723](https://github.com/Sitecore/jss/pull/723), [#752](https://github.com/Sitecore/jss/pull/752))
* Enable creating a new app without boilerplate with the `--empty` flag for `jss create` ([#754](https://github.com/Sitecore/jss/pull/754))
* Enable dynamic component import in sample ([#727](https://github.com/Sitecore/jss/pull/727), [#730](https://github.com/Sitecore/jss/pull/730))

`[samples/vue]` Upgrade version 2.x to 3.x. Simplify dependencies; remove dependency on **i18n** ([#724](https://github.com/Sitecore/jss/pull/724))

`[samples/embedded-app]` Remove dependency on StepZilla ([#747](https://github.com/Sitecore/jss/pull/747))

`[samples/node-headless-ssr-proxy]` Remove '/dist' path from pathRewriteExcludeRoutes ([#756](https://github.com/Sitecore/jss/pull/756))

### Bug Fixes

`[sitecore-jss-react]` `[samples/nextjs]` `[samples/react]` Fix double rendering ([#775](https://github.com/Sitecore/jss/pull/775))

`[sitecore-jss-react]` Error rendering raw self-closing tag elements in placeholders ([#745](https://github.com/Sitecore/jss/pull/745))

`[sitecore-jss-react-forms]` Experience Forms JSS React implementation doesn't use CSS class applied to entire form ([#771](https://github.com/Sitecore/jss/pull/771))

`[samples/angular]` Fix issue where dk-DA language is not rendered in connected and disconnected mode ([#734](https://github.com/Sitecore/jss/pull/734))

`[samples/react]` Fix 504 (Gateway Timeout) errors for proxied Sitecore requests (visitor identification, media, etc) when running in connected mode ([#808](https://github.com/Sitecore/jss/pull/808))

### Breaking Changes

`[sitecore-jss]` `[sitecore-jss-vue]` `[sitecore-jss-react-native]` `[sitecore-jss-react]` `[sitecore-jss-nextjs]` `[sitecore-jss-angular]` Remove deprecated `dataApi` ([#744](https://github.com/Sitecore/jss/pull/744))

`[sitecore-jss-*]` `[samples/*]` Avoid use of 'any' for TypeScript definitions ([#759](https://github.com/Sitecore/jss/pull/759))


## 18.0.0

### New Features
All JSS services have been upgraded to support [**Sitecore Experience Edge** GraphQL schema](https://doc.sitecore.com/developers/101/developer-tools/en/the-experience-edge-schema.html).

`[sitecore-jss]`
* We added [API reference docs for the package](https://github.com/Sitecore/jss/tree/release/18.0.0/ref-docs/sitecore-jss).

`[sitecore-jss-nextjs]`
* We added [API reference docs for the package](https://github.com/Sitecore/jss/tree/release/18.0.0/ref-docs/sitecore-jss-nextjs).

`[samples/nextjs]`
* Update Sitecore configuration patches with relevant Edge-specific definitions.
* The sample uses Edge schema by default.
* [#695](https://github.com/Sitecore/jss/pull/695) Add settings for language fallback with Experience Edge.
* [#696](https://github.com/Sitecore/jss/pull/696) Add `IncludeServerUrlInMediaUrls` "default" configuration to avoid exposing the Sitecore server publicly when using Experience Edge.

`[samples/react]` `[samples/angular]` `[samples/vue]` The samples can also utilize Sitecore Experience Edge. A new sample `[samples/node-headless-ssr-experience-edge]` has been adeded to demonstrate how to configure this. [Read docs](/docs/techniques/ssr/sitecore-experience-edge).

### New & Improved Service Classes

`[sitecore-jss]`
* `GraphQLDictionaryService` is a new service for fetching dictionary data using GraphQL [Read docs](https://jss.sitecore.com/docs/fundamentals/services/dictionary/jss-dictionary-api).
* `GraphQLLayoutService` is a new service for fetching layout data using GraphQL [Read docs](https://jss.sitecore.com/docs/fundamentals/services/layout/jss-layout-api).
* [#716](https://github.com/Sitecore/jss/pull/716) Allow overriding which "named" Layout Service configuration (from Sitecore config) is used by JSS.
* Allow overriding 3rd party dependencies in JSS services that depend on 3rd party functionality (GraphQLLayoutService, RestDictionaryService, GraphQLDictionaryService, GraphQLSitemapService).

`[sitecore-jss-nextjs]`
* Make `GraphQLSitemapService` easier to customize by allowing overrides of default options. ([#682](https://github.com/Sitecore/jss/pull/682), [#705](https://github.com/Sitecore/jss/pull/705)) 

### Other Notable Improvements

* `[sitecore-jss]` Enable **debug logging** for JSS services using the [debug](https://www.npmjs.com/package/debug) module. [Read docs](/docs/fundamentals/troubleshooting/debug-logging).
* New options in `jss create` command. [Read docs](https://jss.sitecore.com/docs/fundamentals/cli#jss-create).

`[samples/react-native]` (#624)
* Add shared `<Layout/>` component in order to have shared navigation panel.
* Make Sitecore logo in header is touchable and will navigate to Home page when click on it.
* Remove usage of `dataConversation`.

### Bug Fixes

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


### Breaking Changes

`[sitecore-jss-react-native]` Removed `dataConversation`, since `editable` property not used in `disconnected` mode. (#624)

`[samples/angular]` Upgrade `angular` to v11. (#635)

`[samples/nextjs]` Change how a custom query can be used in GraphQLSitemapService. Previous way: pass a `formatSearchQuery` function to `fetchExportSitemap` or `fetchSSGSitemap`. New way: extend the `GraphQLSitemapService` class and override the `fetchSitemap` method. (#638)

* As part of adding support for Experience Edge, Sitecore XM's graphQL API was updated to mirror Experience Edge's schema. The following updates in JSS
  * [sitecore-jss-nextjs] Update sitemap query to comply with changes to the GraphQL API
  * [samples/nextjs] Update generated TypeScript models for GraphQL components to comply with changes to the GraphQL API

With the added support of GraphQL endpoints, the API surface area of JSS has essentially doubled. As a result, some reorganizing was done in the base packages, which causes breaking changes for how some services, classes and functions are exported. If you have imports from JSS base packages in your project, they may need to be updated per the [migration guide table](https://jss.sitecore.com/upgrade-guides/18.0).

## Sitecore JSS 16.0 for Sitecore 10.1

### Upgrading

There are [migration instructions](https://jss.sitecore.com/upgrade-guides/16.0) from JSS 15-based applications.

### Breaking changes
* [PR #485](https://github.com/Sitecore/jss/pull/485) [JSS CLI] Add --config argument to specify the path to `scjssconfig.json` file. `resolveScJssConfig` now accepts arguments as an object instead of using individual arguments.
* [PR #460](https://github.com/Sitecore/jss/pull/460) [sitecore-jss-react] Fix return type of `ComponentFactory` to allow a component definition instead of an instantiated component. `ComponentFactory` returns `ComponentType | null` instead of `Component`.
* [PR #459](https://github.com/Sitecore/jss/pull/459) [sitecore-jss-react] Change propType of `missingComponentComponent` from `React.SFC` (deprecated) to `React.FC`.
* [PR #538](https://github.com/Sitecore/jss/pull/538) [sitecore-jss-react] Change propType of `errorComponent` from `React.SFC` (deprecated) to `React.FC`.
* [PR #517](https://github.com/Sitecore/jss/pull/517) [packages/samples] Migrate TSLint (deprecated) to ESLint.

### New Features & Improvements
* [Documentation](https://jss.sitecore.com/docs/nextjs/introduction/why-nextjs) Add support for Next.js framework. 🎉🎉🎉
* [Commit](https://github.com/Sitecore/jss/commit/8f5966703d11c2ded3f86017942f31a6dbb5a0da) [sitecore-jss] Add `RestDictionaryService` to fetch dictionary data using the Sitecore Dictionary Service REST API, and `RestLayoutService` to fetch layout data using the Sitecore Layout Service REST API.
* [PR #511](https://github.com/Sitecore/jss/pull/511) [sitecore-jss] Add `AxiosDataFetcher` to provide a default data fetcher implementation which can be used in sample apps.
* [PR #530](https://github.com/Sitecore/jss/pull/530) [sitecore-jss] Add `GraphQLRequestClient` to provide the ability to execute GraphQL queries.
* [PR #525](https://github.com/Sitecore/jss/pull/525) [sitecore-jss-react] Enable `SitecoreContext` to support TypeScript generics.
* [PR #508](https://github.com/Sitecore/jss/pull/508) [sitecore-jss-react] Add the `useSitecoreContext` hook.
* [PR #542](https://github.com/Sitecore/jss/pull/542) Add environment variable support via an `.env` file to the CLI.


### Bug Fixes
* [PR #548](https://github.com/Sitecore/jss/pull/548) [sitecore-jss-dev-tools] `jss deploy` doesn't exit on success.
* [PR #541](https://github.com/Sitecore/jss/pull/541) [sitecore-jss-dev-tools][sitecore-jss-cli] Replace old and security vulnerable `request` and `axios` NPM packages with latest version of `axios` (>=0.21.1).
* [PR #506](https://github.com/Sitecore/jss/pull/506) [React sample] `Cannot read property 'sitecore' of null`, when 404 and routeData is null.
* [PR #575](https://github.com/Sitecore/jss/pull/575) [sitecore-jss-react] Specifying a custom error component via the Placeholder's `errorComponent` prop caused an "Invalid prop" error.
* [PR #477](https://github.com/Sitecore/jss/pull/477) [sitecore-jss-proxy] Prevent passing 'qs' as 'undefined' in `rewriteRequestPath`.
* [PR #459](https://github.com/Sitecore/jss/pull/459) [sitecore-jss-react] Fix propType of `missingComponentComponent`, resolving an issue with custom "Missing Component" components not working.
* [PR #538](https://github.com/Sitecore/jss/pull/538) [sitecore-jss-react] Fix propType of `errorComponent`, resolving an issue with custom "Error" components not working.
* [PR #521](https://github.com/Sitecore/jss/pull/521) [packages/samples] Upgrade react, react-dom.

## Sitecore JSS 15.0.1

### Bug Fixes

* [PR #487](https://github.com/Sitecore/jss/pull/487) [sitecore-jss-proxy][#CS0195052] changes to HEAD request handling
* [PR #486](https://github.com/Sitecore/jss/pull/486) [sitecore-jss][mediaApi] Prevent editing of original query/params
* [PR #483](https://github.com/Sitecore/jss/pull/483) [sitecore-jss-manifest] Process media field with single item recursively
* [PR #484](https://github.com/Sitecore/jss/pull/484) [sitecore-jss-angular] Fix ngcc.config.js incorrect structure

## Sitecore JSS 15.0 for Sitecore 10

### Upgrading

There are [migration instructions](https://jss.sitecore.com/upgrade-guides/15.0) from JSS 14-based applications.

### Breaking changes

* [PR #414](https://github.com/Sitecore/jss/pull/414), [PR #456](https://github.com/Sitecore/jss/pull/456) React:
    * SitecoreContextFactory class was removed. Subscribers were removed, so context value now stored in SitecoreContext state.
    * SitecoreContext accepts `context` value instead of `contextFactory` SitecoreContextFactory instance.

* [PR #440](https://github.com/Sitecore/jss/pull/440) [Angular sample] Upgrade angular to v10

### New Features & Improvements

* [PR #466](https://github.com/Sitecore/jss/pull/466) [sitecore-embedded-jss-app] Remove usage of SitecoreContextFactory
* [PR #463](https://github.com/Sitecore/jss/pull/463) [React][Vue][Angular] Use keep-alive agent throughout sample apps for server-side web requests
* [PR #430](https://github.com/Sitecore/jss/pull/430) [node-headless-proxy] Connection pooling to layout service
* [PR #429](https://github.com/Sitecore/jss/pull/429) [node-headless-proxy] Output caching
* [PR #386](https://github.com/Sitecore/jss/pull/386) [Forms] Assign contextItemId in Forms submit actions on a JSS Forms submit
* [PR #390](https://github.com/Sitecore/jss/pull/390) [sitecore-jss-react] Replace line breaks with `<br/>` in the `<Text>` component
* [PR #407](https://github.com/Sitecore/jss/pull/407) [React sample] enable eslint
* [PR #413](https://github.com/Sitecore/jss/pull/413) [All samples] Add yaml-lint
* [PR #419](https://github.com/Sitecore/jss/pull/419) [sitecore-jss-angular][sitecore-jss-react][sitecore-jss-vue] Provide ability to configure mediaUrlPrefix in mediaApi using `<Image />` component

### Bug Fixes
* [PR #478](https://github.com/Sitecore/jss/pull/478) [sitecore-jss] Merge specific params from layout service into query string
* [Issue #326](https://github.com/Sitecore/jss/issues/326) [Angular sample] en.yml changes in Angular JSS app giving error: Duplicate function implementation
* [PR #471](https://github.com/Sitecore/jss/pull/471) [node-headless-proxy] Upgrade lodash, node-fetch libraries
* [PR #461](https://github.com/Sitecore/jss/pull/461) [node-headless-proxy] Remove use of onProxyReq event in sample proxy options
* [Issue #452](https://github.com/Sitecore/jss/issues/452) [sitecore-jss-angular] ngcc config not correctly implemented
* [PR #464](https://github.com/Sitecore/jss/pull/464) [Security] Review and resolve security vulnerabilities
* [PR #456](https://github.com/Sitecore/jss/pull/456) [React sample] Race condition, under load React app may render HTML from a different route
* [Issue #428](https://github.com/Sitecore/jss/issues/428) imageParams on Image react component don't play nice with allowedMediaParams
* [PR #448](https://github.com/Sitecore/jss/pull/448) [node-headless-proxy] Extend headers handling and remove content-security-policy header 
* [PR #444](https://github.com/Sitecore/jss/pull/444) [Vue sample] Fix i18n memory leak
* [PR #414](https://github.com/Sitecore/jss/pull/414) [sitecore-jss-react] Memory leak in SitecoreContext
* [Commit](https://github.com/Sitecore/jss/commit/88eb05ec0288c82bd8d4f24a647b8d5ba82b8ead) [Forms] Number Forms field has incorrect model and step attribute
* [Issue #140](https://github.com/Sitecore/jss/issues/140) [sitecore-jss-proxy] query string values aren't transferred properly
* [PR #391](https://github.com/Sitecore/jss/pull/391) [Angular sample] Component factory match first occurrence of Component name
* [PR #379](https://github.com/Sitecore/jss/pull/379) [sitecore-jss-angular] Prevent existing anchor element classes from being wiped out by the link directive
* [PR #395](https://github.com/Sitecore/jss/pull/395) [React sample] Retrieving language from ssrInitialState is incorrect
* [PR #400](https://github.com/Sitecore/jss/pull/400) [sitecore-jss-proxy] Percentage symbol in query string breaks in SSR
* [PR #401](https://github.com/Sitecore/jss/pull/401) [React sample] Application is broken when visit from /graphql to / in disconnected mode
* [PR #403](https://github.com/Sitecore/jss/pull/403) [React sample] Doesn't work with url ip:port
* [PR #404](https://github.com/Sitecore/jss/pull/404) [sitecore-jss-react][React sample] Fix invalid types, fix invalid type in data/*.yml
* [PR #406](https://github.com/Sitecore/jss/pull/406) [sitecore-jss-angular] Prevent the Angular scLink directive from adding an empty href attribute
* [PR #409](https://github.com/Sitecore/jss/pull/409) [sitecore-jss-angular] Prevent the Angular scLink directive from adding an href attribute, when href is equal to `http://` or `https://`

SXA and Sitecore Forms compatibility table
| Sitecore  | JSS      | SXA   | Forms
| --------- | -------- |------ | ------
| 10        | 15.0     | 10    | Yes
| 10        | 14.0     | 10    | Yes
| 9.3       | 13.1     | 9.3   | Yes
| 9.3       | 13.0     | 9.3   | Yes
| 9.2       | 12.0     | 1.9   | Yes
| 9.1.1     | 11.1     | 1.9   | No
| 9.1       | 11.0     | No    | No
| 9.0       | 11.0     | No    | No

## Sitecore JSS 14.0.4

### Bug Fixes

* [Commit](https://github.com/Sitecore/jss/commit/af1cd33170ca87b8c1e2b2ccfd520e720452983d) [sitecore-jss-rendering-host] Upgrade security vulnerable "yargs-parser"

## Sitecore JSS 14.0.3

### Bug Fixes

* [PR #471](https://github.com/Sitecore/jss/pull/471) [node-headless-proxy] Upgrade lodash, node-fetch libraries

## Sitecore JSS 14.0.2

### Bug Fixes

* [PR #455](https://github.com/Sitecore/jss/pull/455) [React sample] Race condition, under load React app may render HTML from a different route

## Sitecore JSS 14.0.1

### Bug Fixes

* [Commit](https://github.com/Sitecore/jss/commit/a79edbadd04d50cf4ba88ac62836b26be90c8ac0) [Doc] Describe that global styles, scripts can't be inserted when a component is added to a route in Experience Editor
* [PR #396](https://github.com/Sitecore/jss/pull/396) [Doc] Update tracking doc as it had a link that 404'ed
* [PR #355](https://github.com/Sitecore/jss/pull/355) [Doc] Add rendering host documentation
* [PR #394](https://github.com/Sitecore/jss/pull/394) [React sample rendering-host] Setup in order to run rendering host script
* [Commit](https://github.com/Sitecore/jss/commit/64545fa7537ab1d84b60cdfb4a77130c248d9ed7) [React sample] Cannot read property 'fields' of undefined
* [Commit](https://github.com/Sitecore/jss/commit/c28df0d5623bc00a037e52a13fbff86a67bf497e) [React sample] Fix dev dependencies versions

## Sitecore JSS 14.0 for Sitecore 10

### Upgrading

There are [migration instructions](https://jss.sitecore.com/upgrade-guides/14.0) from JSS 13-based applications.

### New Features & Improvements

* [PR #347](https://github.com/Sitecore/jss/pull/347) Fixes withSitecoreContext typescript definition
* [PR #350](https://github.com/Sitecore/jss/pull/350) The types of the render functions in the Placeholder component props are not correct or missing

SXA and Sitecore Forms compatibility table
| Sitecore  | JSS      | SXA   | Forms
| --------- | -------- |------ | ------
| 10        | 14.0     | 10    | Yes
| 9.3       | 13.1     | 9.3   | Yes
| 9.3       | 13.0     | 9.3   | Yes
| 9.2       | 12.0     | 1.9   | Yes
| 9.1.1     | 11.1     | 1.9   | No
| 9.1       | 11.0     | No    | No
| 9.0       | 11.0     | No    | No

## Sitecore JSS 13.2 for Sitecore 9.3

### New Features & Improvements

* [PR #357](https://github.com/Sitecore/jss/pull/392) [Forms] Implement FileUpload field
* [Commit](https://github.com/Sitecore/jss/commit/097f734568bc81585c3c9612b571c83165614442) [Doc][Form] Document how to customize FormFetcher of the <Form> component

### Bug Fixes

* [PR #381](https://github.com/Sitecore/jss/pull/381) [Doc] Minor formatting fix in JSS Server Setup documentation
* [PR #388](https://github.com/Sitecore/jss/pull/388) [Doc][node-headless-ssr-proxy sample] - Fix broken Headless SSR mode link

## Sitecore JSS 13.1 for Sitecore 9.3

### New Features & Improvements

* [PR #357](https://github.com/Sitecore/jss/pull/357) [Doc] Updated context extension docs around caching
* [Commit](https://github.com/Sitecore/jss/commit/b0415c08f469a8dface7f43e2b24e53dd35f3577) [Doc] Extend JSS Forms documentation regarding customizing labels of different field types
* [Commit](https://github.com/Sitecore/jss/commit/749d836291ffaaff9631596e3e2dd37361918bd6) Add --skipValidation for `jss setup` command
* [PR #338](https://github.com/Sitecore/jss/pull/338) Section field template can use FormFieldSection in order to pass cssClass to the fieldset element and be able to customize the styles for it.
* [PR #346](https://github.com/Sitecore/jss/pull/346) Responsive image srcset fallback with src output
* [PR #303](https://github.com/Sitecore/jss/pull/303) [React-Native sample] documentation is improved and extended.

### Bug Fixes

* [PR #373](https://github.com/Sitecore/jss/pull/373) [Vue Sample] Fix route changes with path and a hash
* [Bug #141](https://github.com/Sitecore/jss/issues/141) Cannot add components to placeholder without saving first
* [PR #374](https://github.com/Sitecore/jss/pull/374) [React sample] Fixed start:connected-ssr npm script
* [Commit](https://github.com/Sitecore/jss/commit/d6a5431ebaa4a2c288db83a986b069710a353b83) [Doc] Sitecore Forms + JSS article doesn't mention that the provided sample doesn't work for Headless mode
* [Bug #348](https://github.com/Sitecore/jss/issues/348) Publishing configuration for sitecore-jss-angular gives errors for Angular 9 ngcc
* [Commit](https://github.com/Sitecore/jss/commit/a1f323768506ccf1ec92d7c6bb6f2990c2de0ae7) [React sample] 'deploy template' does not accept --acceptCertificate
* [Bug #358](https://github.com/Sitecore/jss/pull/358) [Vue sample] SSR - fixed hydration bailouts
* [Bug #360](https://github.com/Sitecore/jss/issues/360) Quick Start with vue is failing
* [Bug #363](https://github.com/Sitecore/jss/issues/363) Wrong Type Definition for ItemLink
* [Bug #328](https://github.com/Sitecore/jss/issues/328) Item Links failing to find reference with disconnected mode
* [PR #341](https://github.com/Sitecore/jss/issues/341) `jss setup` does not work with Sitecore Docker
* [PR #359](https://github.com/Sitecore/jss/pull/359) Add description of import service URL question
* [PR #356](https://github.com/Sitecore/jss/pull/356) [Doc] Fix broken react-native link on homepage
* [Bug #299](https://github.com/Sitecore/jss/issues/299) SitecoreContextReactContext.Provider is not working properly, because value never changes as it is always same class instance
* [Bug #333](https://github.com/Sitecore/jss/issues/333) [Doc] Document addPlaceholder function
* [PR #353](https://github.com/Sitecore/jss/pull/353) [Doc] Move Forms installation documentation section above sample implementation
* [PR #351](https://github.com/Sitecore/jss/pull/351) [React sample] Include polyfills for IE11
* [Bug #257](https://github.com/Sitecore/jss/issues/257) [Doc] Add doc for `--acceptCertificate` param
* [Bug #336](https://github.com/Sitecore/jss/issues/336) [Vue sample] CLI deploy options do not trigger build step
* [PR #337](https://github.com/Sitecore/jss/pull/337) [Vue sample] set i18n initial language based on SSR language
* [PR #335](https://github.com/Sitecore/jss/pull/335) Vue sample Specimen component updated with correct implementation path
* [Bug #287](https://github.com/Sitecore/jss/issues/287) Potential memory leak in React SitecoreContextFactory
* [PR #300](https://github.com/Sitecore/jss/pull/330) [React sample] set i18n init lang to prevent SSR hydration from re-rendering app
* [Commit](https://github.com/Sitecore/jss/commit/6ee8a40c3979408032c0de3fa16bb9cae55037e4) react app - Cannot read property 'forEach' of undefined
* [Bug #314](https://github.com/Sitecore/jss/issues/314) Angular scaffolding has error in polyfill.ts
* [Bug #311](https://github.com/Sitecore/jss/issues/311) [React sample] npm run eject throws error
* [PR #281](https://github.com/Sitecore/jss/pull/281) Wrong GraphQLEndpoint assembly name
* [PR #302](https://github.com/Sitecore/jss/pull/302) Correctly evaluates the value of `SITECORE_ENABLE_DEBUG` variable
* [PR #285](https://github.com/Sitecore/jss/pull/285) [Commit](https://github.com/Sitecore/jss/commit/4385791240447ad3cbf8582ca7ace76e7dfcb241) Include media from Droptree and Multilist content
* [PR #306](https://github.com/Sitecore/jss/pull/306) [Doc] Docs missing configuration of fetcher

SXA and Sitecore Forms compatibility table
| Sitecore  | JSS      | SXA   | Forms
| --------- | -------- |------ | ------
| 9.3       | 13.1     | 9.3   | Yes
| 9.3       | 13.0     | 9.3   | Yes
| 9.2       | 12.0     | 1.9   | Yes
| 9.1.1     | 11.1     | 1.9   | No
| 9.1       | 11.0     | No    | No
| 9.0       | 11.0     | No    | No

## Sitecore JSS 13.0 for Sitecore 9.3

### Upgrading

There are [migration instructions](https://jss.sitecore.com/upgrade-guides/13.0) from JSS 12-based applications.

### New Features & Improvements

* JSS Rendering host
* 
    Updated:
    * React: from 16.3.0 to 16.12.0,
    * Angular: from 7.0 to 8.2.8,
    * Vue: from 2.5.17 to 2.6.10
    * React-Native: 0.55.4 to 0.60.5

    and all their dependencies has been updated to their latest versions ([#252](https://github.com/Sitecore/jss/pull/252), [#255](https://github.com/Sitecore/jss/pull/255), [#256](https://github.com/Sitecore/jss/pull/256), [#266](https://github.com/Sitecore/jss/pull/266), [#269](https://github.com/Sitecore/jss/pull/269), [#282](https://github.com/Sitecore/jss/pull/282))
* New React Native sample app added (implemented similarly to existing Styleguide sample apps)
* Documentation updates

### Bug Fixes
* [Bug #224](https://github.com/Sitecore/jss/issues/224) Export SitecoreContextReactContext
* [Pull #223](https://github.com/Sitecore/jss/pull/223) Allow lazy loaded components to show a loading state
* [Pull #224](https://github.com/Sitecore/jss/pull/191) Allow Scoped Styles to Work With Child Components
* [Bug #61](https://github.com/Sitecore/jss/issues/61) Nested component definitions via Item Link returns only IDs
* [Pull #146](https://github.com/Sitecore/jss/pull/146) Added support for TypeScript when jss build'ing
* [Bug #267](https://github.com/Sitecore/jss/issues/267) Error in description of one of methods of Manifest interface
* [Bug #220](https://github.com/Sitecore/jss/issues/220) Use Object.entries instead of Object.keys
* [Bug #172](https://github.com/Sitecore/jss/issues/172) mediaApi.updateImageUrl loses revision querystring
* [Bug #189](https://github.com/Sitecore/jss/issues/189) DevTools loading hidden files and crashing
* [Bug #160](https://github.com/Sitecore/jss/issues/160) Node Proxy: CURL URL -IL returns 500 OK

### Breaking Changes

* React sample
	* Upgraded react-i18next: Migration guide https://react.i18next.com/latest/migrating-v9-to-v10
* React-Native sample
	* `getRouteData` function interface is changed. Now it accepts two params: `(route, { options, language })`
* Angular sample
	* Lazy loading syntax is changed: https://angular.io/guide/deprecations#loadchildren-string-syntax
	* tsconfig.app.json and tsconfig.json: set "module": "commonjs", because `dynamic import` approach requires this module type
	* Typescript 3.5 breaking changes: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#typescript-35
* sitecore-jss-angular package
	* ng-packagr: option workingDirectory is removed, removed corresponding getter from NgPackage class. (https://github.com/ng-packagr/ng-packagr/blob/master/CHANGELOG.md#breaking-changes-5)
	* Setting ngPackage.src has no effect any more. The source directory (base path) is equivalent to the location of the (primary) ng-package.json, package.json, or ng-package.js. (https://github.com/ng-packagr/ng-packagr/blob/master/CHANGELOG.md#breaking-changes-6)
	* The setting for external dependencies (lib.externals) has been removed in favour of lib.umdModuleIds which is now just used to provide the UMD module identifiers of external dependencies. (https://github.com/ng-packagr/ng-packagr/blob/master/CHANGELOG.md#migrating-from-v1-breaking-changes-from-v160-to-v200)
	* @angular/core: Default setting for @ViewChild and @ContentChild queries is changed (https://angular.io/guide/static-query-migration#should-i-use-static-true) ComponentNameAndModule interface is changed accordingly to new lazy loading syntax: https://angular.io/guide/deprecations#loadchildren-string-syntax 
* sitecore-jss-cli package
	yargs: CommandModule interface is changed https://github.com/Sitecore/jss/pull/272/files#diff-e0b90a991107a0e06b6fa1bb626b6d5eR25

SXA and Sitecore Forms compatibility table
| Sitecore  | JSS      | SXA   | Forms
| --------- | -------- |------ | ------ 
| 9.3       | 13.0     | 9.3   | Yes
| 9.2       | 12.0     | 1.9   | Yes
| 9.1.1     | 11.1     | 1.9   | No
| 9.1       | 11.0     | No    | No
| 9.0       | 11.0     | No    | No

## Sitecore JSS 12.0.1 for Sitecore 9.2

### Upgrading

No special upgrade steps needed, it's safe to promote to newer version.

### Bug Fixes
* [Bug #324](https://github.com/Sitecore/jss/issues/324) Sitecore jss + proxy has degrading performance in amount of requests served per second

## Sitecore JSS 12.0 for Sitecore 9.2

### Upgrading

No special upgrade steps needed, it's safe to promote to newer version.

### New Features & Improvements

* JSS now supports Sitecore Forms. This means several things:
    * JSS now provides a special content resolver for form components, which enables the Layout Service to send complete serialized form data
    * A new framework-agnostic npm package is available (`sitecore-jss-forms`), which defines data types and components for forms.
    * A React implementation of forms is also available via the new `sitecore-jss-react-forms` package (this package extends `sitecore-jss-forms`)
    * Read about the [Forms Service here](/docs/fundamentals/services/forms-service)
    * Read [forms documentation here](/docs/techniques/forms)

> Note: JSS 12.0 includes all the features of JSS 11.1

SXA and Sitecore Forms compatibility table
| Sitecore  | JSS      | SXA   | Forms
| --------- | -------- |------ | ------ 
| 9.2       | 12.0     | 1.9   | Yes
| 9.1.1     | 11.1     | 1.9   | No
| 9.1       | 11.0     | No    | No
| 9.0       | 11.0     | No    | No

## Sitecore JSS 11.0.4

### Bug Fixes
* [PR #453](https://github.com/Sitecore/jss/pull/453) [React sample] Race condition, under load React app may render HTML from a different route

## Sitecore JSS 11.0.3 for Sitecore 9.1.1

### Upgrading

No special upgrade steps needed, it's safe to promote to newer version.

### Bug Fixes
* [Bug #324](https://github.com/Sitecore/jss/issues/324) Sitecore jss + proxy has degrading performance in amount of requests served per second

## Sitecore JSS 11.1 for Sitecore 9.1.1

### Upgrading

No special upgrade steps needed, it's safe to promote to newer version.

### New Features & Improvements

* JSS now integrates with SXA. When SXA is installed, it's possible to create JSS tenants and sites that make it easier to scale JSS apps. Additional benefits:
    * SXA site management for JSS apps.
    * Cross-site presentation sharing using page designs and partial designs.
    * Cross-site content sharing.
    * Cross-site reusability of renderings.
    * Cross-site linking.
    * More info available on the [SXA documentation site](https://doc.sitecore.com/developers/sxa/19/sitecore-experience-accelerator/en/managing-jss-apps-with-sxa.html)
* Angular projects can now take advantage of the new `*scRouterLink` component which creates a link that uses Angular routing from a Sitecore link field, instead of refreshing the page.
* Angular placeholders now expose a `loaded` event that can be hooked for apps that need to know when a placeholder is done loading, i.e. `<sc-placeholder [...] (loaded)="onPlaceholderLoaded($event)"></sc-placeholder>`
* [PR #214](https://github.com/Sitecore/jss/pull/214) Pass through component props types when using `withSitecoreContext`
* [PR #213](https://github.com/Sitecore/jss/pull/213) Add angular directive for general links that can be both internal and external.
This allows Content Editors to not be limited to one type of predefined linkfield while maintaining angular routerlinks
* The documentation site now has an initial draft of a new "guided learning" area for the JSS Developer Trial: [https://jss.sitecore.com/connected-demo](https://jss.sitecore.com/connected-demo)


### Bug Fixes
* [PR #211](https://github.com/Sitecore/jss/pull/211) Fix the case when working on a mac or linux with git config for autocrlf all the line endings in the repo are set to lf which fails eslint
* [Bug #194](https://github.com/Sitecore/jss/issues/194) Implement `acceptCertificate` parameter in `jss deploy component/template`
* [Bug #174](https://github.com/Sitecore/jss/issues/174) Resolve inherited templates/fields when building media output for the manifest
* [PR #170](https://github.com/Sitecore/jss/pull/170) Changed proptypes of missingComponentComponent and errorComponent to PropTypes.func in
packages/sitecore-jss-react/src/components/PlaceholderCommon.tsx to prevent console warning "Warning: Failed prop type: Invalid prop `missingComponentComponent` of type `function` supplied to `PlaceholderComponent`, expected `object`."
* [PR #151](https://github.com/Sitecore/jss/pull/151) Re-add `!noDebug` to `jss-proxy` console logging to allow disabling of logging.
* Various fixes to docs (**Thank you, community!!**)

## Sitecore JSS 11.0 for Sitecore 9.0 and 9.1

### New Features & Improvements

* JSS Import is now Helix-compatible. This means several things:
    * JSS' templates now reside in `/sitecore/templates/Foundation` instead of `/sitecore/templates`
    * Imported apps will by default import into a Project-layer module (i.e. `/sitecore/templates/Project/MyAppName`)
    * See the [upgrade guide](/upgrade-guides/11.0) if updating from a technical preview; it is possible to retain the TP-style import paths.
* JSS now ships with a [tracking API](/docs/fundamentals/services/tracking) that enables JSS apps to push Sitecore analytics events (events, goals, outcomes, campaigns, page views) back to xConnect from the client-side. The JSS React styleguide has an interactive example of using the tracking API.
* JSS apps support Sitecore's robot detection algorithms, enabling collection of analytics traffic without disabling robot detection. Apps must use a `VisitorIdentification` component placed on their main route shell to enable this support.
* The `sitecore-jss` package no longer depends on `axios` for making Layout Service requests. This gives consumers flexibility to provide their own HTTP implementations. The [migration instructions](/upgrade-guides/11.0) detail how to handle this for upgraders.
* JSS Angular now ships with [built-in component lazy loading support](/docs/client-frameworks/angular/angular-tips).
* GraphQL API now supports paginating item children using the `first` and `after` cursor pagination parameters.
* GraphQL API can filter out non-local template fields on the `Item`'s `fields` property via the new `ownFields` parameter.
* GraphQL now supports HTTP `GET` for [Automated Persisted Queries](https://blog.apollographql.com/improve-graphql-performance-with-automatic-persisted-queries-c31d27b8e6ea). This enables some CDN cacheability scenarios.
* JSS apps' GraphQL endpoints are configured to automatically lock down schema introspection on Content Delivery servers.
* [JavaScript renderings](/docs/techniques/mvc-integration/javascript-rendering) now support pooled Node SSR. See the JS rendering sample `/sitecore/config` for details.
* Rendering Parameters Templates will now be created during import when a disconnected manifest defines rendering parameters on a component. This enables editors to have explicit fields to edit each parameter.
* Layout Service will now return the Sitecore Context JSON data even if a route item is not resolved. This means that apps' 404 routes will have access to LS context data, such as the site name and language, as well as any [context extensions](/docs/techniques/extending-layout-service/layoutservice-extending-context) that may have been added - such as global navigation data. LS will still return HTTP 404 in these cases; just now with extra context data. Sample apps' 404 routes demonstrate using this pattern. Also applies to disconnected mode.
* It is now possible to specify icons for routes and content items in disconnected data, for example `icon: Network/16x16/home.png` at the root of the YAML.
* Installing the JSS Server Sitecore package now automatically adds the JSS media handler to the `web.config` file, so this installation step is no longer required.
* JSS react sample will treat `.jsx` files as components when generating the component factory, in addition to `.js`
* Layout Service can now accept item IDs or short IDs in addition to paths when fetching layout data.
* The JSS CLI now supports a `--proxy` option when deploying items or creating new apps. This enables JSS to deploy items in environments that use HTTP proxies. It is also possible to configure [the proxy using envionment variables](https://www.npmjs.com/package/request#proxies).
* The path to the Node executable to use in integrated mode can now be set on the View Engine instance config (see `Sitecore.JavaScriptServices.ViewEngine.Node.config`, `NodePath`), instead of always using `node` on the system `PATH`. This enables different node versions per site.
* JSS services (LS, GraphQL, tracker, dictionary) can now accept JWT tokens returned by the [SSC auth service](http://www.coreblimeysitecore.com/blog/token-based-authentication-with-sitecore-services-client/), instead of only cookie-based authentication. Both bearer tokens and the `token` header are allowed to pass the JWT payload.
* Sitecore 9.1 XM-only mode is supported. XM-only installs must use the XM server components package to avoid installing any XP dependencies. Behavioural personalization and tracker APIs are not available in XM mode.
* The `node-headless-ssr-proxy` example can now accept common proxy configuration variables from environment variables, in addition to `config.js` settings. This makes it easier to share proxy code in containers and PaaS hosts where environment variables are commonly used. See the [README](https://github.com/Sitecore/jss/blob/master/samples/node-headless-ssr-proxy/README.md) for details.
* `jss setup` can now help setup connections to remote Sitecore installations, not just local Sitecores. In addition, `setup` will read any existing configuration and use those values as defaults if it is run on an already setup site.
* `jss deploy items` (and `deploy app`) can now accept a `--acceptCertificate` parameter that whitelists a SSL certificate by thumbprint (certificate pinning). Because Node does not respect Windows trusted root certificates, this enables deploying items to local Sitecore instances that use self-signed certificates without disabling SSL validation entirely.
* The `onError` and `createViewBag` hooks in `sitecore-jss-proxy` can now return promises, allowing for async processing during headless SSR
* The disconnected mode layout service now supports a `customizeRendering` hook in addition to `customizeRoute` and `customizeContext`. This hook function allows you to customize the JSON returned for specific components in disconnected mode - enabling advanced data mocking scenarios and the ability to replicate layout service customizations while disconnected.

### Important Changes

* JSS no longer supports using [yarn](https://yarnpkg.com) with its sample applications. Yarn will also no longer be used by the JSS CLI if it is installed.
  * Existing `yarn` users: ok to keep using it. We no longer support it to enable shipping a consistent set of dependency versions with the starter apps, not because it cannot work.
* GraphQL endpoints must now be individually whitelisted using SSC API keys' `Allowed Controllers` field. `*` still whitelists everything, but when specifying allowed controllers you must whitelist the `Sitecore.Services.GraphQL.Hosting.Mvc.GraphQLController` as well as each GraphQL endpoint using `GraphQL:/url/to/endpoint` syntax instead of a C# type name. For example: `Other.Controller, Other.Assembly;Sitecore.Services.GraphQL.Hosting.Mvc.GraphQLController;GraphQL:/api/jssreactweb`
* The location of SSC API key items has changed in Sitecore 9.1. They now reside in the `master` database, not the `core` database. You can transfer existing API keys by using the _Transfer_ option in content editor.
* Insert options are no longer magically added to route templates during import. Control over route insert options is now given to the manifest author. The [migration instructions](/upgrade-guides/11.0) detail how to handle this.
* The behaviour of `Link`-rendering JSS helper components has been changed to match with normal Sitecore link rendering. Previously if no `text` (or `description` in Sitecore) was set for an external link, the link would render blank. In JSS 11.0, the link will use the `href` value like the Sitecore MVC link renderer will (for all supported languages).
* The configuration scheme of the `node-headless-ssr-proxy` example has been refactored, and all configuration is now contained within `config.js` instead of both `index.js` and `config.js`. Making this refactor to existing usages of this example is optional.
* Behavior of the proxy ignore list for `sitecore-jss-proxy` has been modified. It is no longer required to URL-encode (i.e. `%20`) ignored paths that contain characters that need encoding in URL strings. This does not affect the default configuration, but would affect custom configurations such as `/sitecore%20modules` that would now need only be `/sitecore modules`.

### Bug Fixes

* Importing a JSS application that has no version in the Sitecore default language will work correctly
* Enabling Node debugging on an integrated mode JSS app with a Node pool size greater than 1 will now reduce the pool size to 1 instead of causing port conflicts
* JSS apps will support Content Testing via workflow correctly when using the JSS Default Workflow
* Layout Service will no longer return HTTP 401 in some cases when it should return HTTP 404
* `jss setup --nonInteractive` requires fewer arguments to succeed, for CI scenarios that do not need the complete set of JSS CLI capabilities.
* JSS rendering insert options are now managed by a global insert option rule, which ensures the option is always available for easier Sitecore-first development.
* Missing `insertOptions` property has been added to the template definition TypeScript typings.
* Imported content items will no longer have insert options explicitly set on each item, and will use standard values instead.
* It is now possible to use Experience Editor on route template standard values by explicitly specifying the JSS app name to render with the `sc_jssapp` query parameter.
* GraphQL will return the correct URL when querying media items' `url` field directly (creating the URL with `MediaManager`)
* GraphQL will return proper error messages when IIS custom errors are enabled, instead of HTTP 400 with no explanation (i.e. for missing API keys)
* Setting a `defaultWorkflow` during app import is correctly optional
* Error messages from JSS services are better when IIS custom errors are enabled
* The `node-headless-ssr-proxy` example will correctly perform `startsWith()` instead of `indexOf()` matching on proxy-excluded paths. This prevents excluding `/foo` from also excluding `/bar/foo`. Path matching is also now case-insensitive to match Sitecore convention.
* SSL certificate validation is no longer disabled by default in `node-headless-ssr-proxy`, which is a security issue.
* The `node-headless-ssr-proxy` example will server-side render dictionaries correctly.
* The `sitecore-jss-proxy` library will no longer double-encode incoming URLs that contain encoded characters, such as spaces (`%20`), when proxying to the Layout Service.
