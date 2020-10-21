---
name: release-notes
routeTemplate: ./data/component-templates/full-page.yml
title: Release Notes
---
# Release Notes

## Sitecore JSS 15.0 for Sitecore 10

### Upgrading

There are [migration instructions](/upgrade-guides/15.0) from JSS 14-based applications.

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

There are [migration instructions](/upgrade-guides/14.0) from JSS 13-based applications.

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

There are [migration instructions](/upgrade-guides/13.0) from JSS 12-based applications.

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

### Upgrading

There are [migration instructions](/upgrade-guides/11.0) from JSS 9-based (Technical Preview 4) applications.

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

## Sitecore JSS 9.0 for Sitecore 9.0 (Tech Preview 4)

### Upgrading

There are [migration instructions](/upgrade-guides/manifest-packages) from JSS 8.x-based (Technical Preview 3) applications.

### New Features & Improvements

#### Improved Deployment Methodology

We've replaced Sitecore.Ship with a _manifest package_ deployment system that uses a more secure system to import JSS apps. A shared secret known to the deployer and server is used to deploy signed packages using HMAC, significantly increasing the security of the default setup. `jss setup` will offer to automatically create and configure a random shared secret for you.

This change has also enabled improved code-first deployment experience. Logs are now sent in real-time, and the import process is run as a background job meaning that it can continue to completion even if a network level error interrupts the client. The import process also scales better to larger numbers of imported items, and is more cloud friendly. The server component installation experience is also now simpler, with a single Sitecore package for JSS server components. The import service endpoint is automatically disabled on CD servers, so no config transformation is required.

Existing JSS servers and apps running JSS 8 or earlier can follow [migration instructions](/upgrade-guides/manifest-packages) to upgrade to the JSS 9 manifest package endpoint for deployment.

This does change the JSS CLI a bit: build artifacts (JS, CSS, static assets) are _not deployed in manifest packages_. Manifest packages only contain Sitecore items, routes, and media items. Build artifact deployment beyond local development is intended to be accomplished by a Sitecore deployment process, which should deploy the artifacts to the Sitecore server as part of a backend deployment pipeline. Local artifact deployment is available with `jss deploy files` for development purposes, or to get the artifacts into the Sitecore deployment pipeline.

> To better reflect its purpose, `jss deploy package --noFiles` is now `jss deploy items` in JSS 9's CLI. The functionality to deploy both build artifacts and items at once, like JSS 8's `jss deploy package` did, is bundled into the new `jss deploy app` command.

#### Unified App Templates with Styleguides

We have completely refactored the React, Angular, and Vue sample apps. The new sample apps:

* Are focused around the most popular starter kit for their framework (`create-react-app`, `vue-cli`, and `angular-cli` respectively). This makes maintaining your app easier.
* The content of the sample app has been refactored into a JSS-specific Styleguide, demonstrating how to work with all kinds of Sitecore data types, placeholder nesting and wrapping techniques, and other helpful JSS patterns. The samples come with instructions to remove them, for starting work on real apps from a clean slate.
* There is no longer a 'basic' and 'advanced' sample app. The single sample apps are in between the former basic and advanced app; they all support out of the box Sitecore functionalities (i18n, routing, GraphQL, set `<title>` tags) and have identical content and feature sets.
* The sample app code has been heavily documented for your learning pleasure.

#### Universal GraphQL support

All sample apps now support Sitecore GraphQL out of the box, not just a specific React sample as in JSS 8.0. JSS GraphQL support includes full Experience Editor and server-side rendering support!

#### Developer Experience Improvements

We've added a new npm script, `jss scaffold <componentName>` (React, Angular, Vue). This script will automatically scaffold a JSS component, and when working in code-first mode a manifest declaration for it as well. The scaffold script is completely customizable (or removable) to accommodate different development conventions.

The Component Factory file is now automatically generated at build time, so adding a new component to a JSS site is now simpler and requires no explicit registration step. The script to generate the factory is completely customizable, or removable, to accommodate different development conventions.

#### Command-line Config Specification

To support CI scenarios, there are now switches that can be passed to `jss setup` to specify Sitecore connection information to use. This is useful to configure a JSS app for deployment at CI time using server-provided Sitecore connection information. Here's an example of what can be done:

```cmd
jss setup --outputFile scjssconfig.json --instancePath C:\inetpub\wwwroot\siteco.re --deployUrl http://siteco.re --layoutServiceHost http://siteco.re --apiKey CAFED00D-20F1-D00D-D00D-BD8B7EA1E42C --deploySecret AFBD4D89-7FFE-4BFD-97B9-BD8B7EA1E42C
```

#### Render Link Fields With Children

The JSS link field helper component now accepts child elements (React: `<Link>`, Angular: `<a *scLink>`, Vue: `<sc-link>`). This enables rendering link fields with JSS that are not just simple text-bodied anchor tags.

The `File` field helper also supports link bodies when it renders links to files the same way.

> Note: due to Experience Editor limitations, rendering links with children will result in the children being rendered as _siblings_ to the `<a>` tag in Experience Editor mode. The HTML hierarchy is unaffected outside of Experience Editor, and will nest correctly.

#### Date helper components

There are now React, Vue, and Angular helper components to render Sitecore `Date` and `DateTime` fields. These fields are documented in detail in the new sample apps' Styleguide pages.

#### Better performance!

JSS is now twice as scalable. No kidding!

* Layout service scales much better, and sees higher efficiency gains from enabling output caching on renderings. (Yes, you can "output cache" renderings to JSON just like renderings to HTML!)
* Editable data is not returned from layout service unless in experience editor. This saves large amounts of bandwidth and improves scaling, especially on content-heavy pages.
* Integrated mode rendering now supports pooled rendering, meaning multiple Node.exe worker processes can perform parallel rendering. This significantly improves (2-3x) the scaling of integrated mode.

#### DevOps Guide

There's now a [DevOps guide](/docs/techniques/devops) to help you plan deployment of your JSS site.

#### Simplified Disconnected Content Definition

Writing disconnected content is now simpler.

* The `name` is now optional in route definitions, defaulting to the name of the parent folder (i.e. `routes/hello/en.yml` defaults to `hello`)
* When defining field values, the `value` node is now optional, reducing nesting and improving readability. Using the `value` node is allowed, so this is not a breaking change.

Before:
```
fields:
  fieldName:
    value: My field
  image:
    value:
      src: /assets/image.png
```

After:
```
fields:
  fieldName: My field
  image:
    src: /assets/image.png
```

### Important Changes

* JSS 9 requires a new JSS-specific `license.xml` file. Partners will need to re-generate a license on SPN to get the correct `Sitecore.JSS` endorsement, and subscription customers will need to contact their account representatives for an appropriate license.
* Using JSS 9 with React requires React 16.3 or later. This is because it uses [the new context API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html) introduced in 16.3. This API deprecates the old context API, so in order to ensure the longevity of JSS sites it is using the latest official API.
* JSS 9 with Angular ships with Angular 7, and requires Angular 6 or later. Any users on Angular 5.x can continue to use JSS 8 npm packages. Due to breaking dependency changes in Angular 6 it is not possible to continue supporting Angular 5.
* The Layout Service will no longer return `editable` values for fields unless Sitecore is actually in Experience Editor mode editing the page. This is a non-breaking change for anyone using field helpers to render field values (i.e. `<Image>`)
* Disconnected-mode Layout Service will no longer return `editable` values for fields, since that matches the Layout Service outside of Experience Editor
* Root placeholders for JSS apps are now configured in `package.json` config and deployed via import, instead of configured on Sitecore config patches. This change allows the app to own its layout roots without needing Sitecore config changes.
* Import with full wipe of existing items has been changed. Previously full wipe was a config setting on the Sitecore end; now full wipe is a deployment parameter (`jss deploy items --wipe`) to give the app control over whether a wipe should occur. The `SitecoreJSS.WipeAllowed` setting must still be enabled on Sitecore to allow any wipe deployment; this setting now defaults to `true` for **Standalone** role deployments and `false` for any other role, which enables developers to use `--wipe` out of the box.
* The JSS Content Service has been removed in JSS 9.0 (it was previously deprecated). Non-route content can be retrieved using GraphQL (preferred), SSC, or OData APIs.
* The `node-express-ssr` sample has been renamed `node-headless-ssr-proxy` to better reflect its purpose.
* Usage of placeholder names that conflict with SXA or other Sitecore system placeholders has been disallowed at manifest time. **Notably, this means the `main` root placeholder used in previous JSS previews' sample apps is now disallowed due to conflicts with SXA.** See the [upgrade guide](/upgrade-guides/manifest-packages) for migration directions.
* The `--manifestCompilers` option on `jss manifest` (and related commands that use the same args like `jss deploy items`) has been removed and replaced with a more flexible system using `--require`. The compiler for your manifest is now defined in `/sitecore/definitions/config.js` in each app, enabling the capability to directly choose the transpiler as well as apply configurations - or other non-compiler customizations - to your manifest runs.

### Bug Fixes

* General cleanup, normalization, and improvements.
* Embedded wizard sample app is now improved and uses Integrated GraphQL to fetch its data.
* `jss setup` now has an improved experience, with better clarity, validations, and the ability to auto-configure a deployment secret.
* Angular basic app no longer has confusing default content
* React advanced app HOCs have proper display names for better debuggability
* Missing peer dependencies in `npm` packages have been fixed
* Route not found handling has been improved across all sample apps, especially for server-side rendering
* The `node-headless-ssr-proxy` example and `sitecore-jss-proxy` have been improved, and now scale better, handle 404/500 better, are more extensible, and compress responses out of the box
* Returning `status` and `redirect` keys in the `renderView()` SSR function success result works correctly, e.g. `renderView(null, { status: 302, redirect: 'http://google.com', html: '' })` for both `jss-proxy` and integrated mode. This enables custom handling of 404s and JS-controlled redirections from within SSR.
* Importing empty field values on code-first route data will now import the blank value to Sitecore instead of skipping the value
* The Sitecore context language is now respected in all cases when using the React Advanced app in integrated mode, and it will no longer have a flash of untranslated text on load in integrated mode
* Setting an `id` when registering a component with the code-first manifest will now cause an error, as `templateId` and `renderingId` are expected to be used there instead
* Installing update packages caused the creation of a backup of the whole Sitecore site's `/bin` folder, about 175MB per installation. During active JSS dev, this would add up quickly to used space in `/temp` for package history. This has been resolved by moving to manifest packages, but it's a good idea to clear your `/temp` if earlier versions of JSS have done many deployments.
* Referring to a nonexistant image or file `src` in the disconnected manifest is now a terminating error, instead of a warning
* Rendering parameters' values are now consistently returned as string values in connected and disconnected modes
* Email links (`mailto:`) are imported correctly to General Link fields
* Angular field rendering directives (e.g. `*scText`) now emit the field contents using `textContent` instead of `innerText`. This improves Jest compatibility.
* JSS import now supports importing layout to the Final Layout (multilingual) as an option. This aligns well with how disconnected multilingual content is defined (with a layout for each language), and it has been enabled for the new sample apps. This setting, `useLanguageSpecificLayout`, can be disabled on the JSS app config (`/sitecore/config`).
* Improved TypeScript typings for route data in the `sitecore-jss` and `sitecore-jss-angular` packages. Some errors and missing properties that are returned in route data have been added.
* The Angular sample app now supports hot-reloading when in disconnected mode and route data (yaml/json) is updated. Previously, only React did this.
* Inconsistencies in output when in disconnected and connected modes have been fixed.
* React `Text` helper will render the value with no wrapping tag by default. The `tag` attribute is allowed if a wrapper is desired.
* An [XSS vulnerability](https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0) in the way server-side rendering was being performed has been patched for React and Vue apps.
* Handling of 404 and 500 errors from Layout Service is consistent and works in a SEO and SSR-friendly way in all sample apps.
* The `node-headless-ssr-proxy` sample has been cleaned up and optimized for best practices (i.e. gzipping), and is much more flexible to extend. Documentation can be found in the code.
* Adding child items with an explicit ID to another item with an explicit ID will no longer break manifest generation with a duplicate ID error when the parent ID is referenced elsewhere.
* Using multiple route templates within an app has been fixed.
* Route templates added with `manifest.AddRouteTemplate()` are always flagged as route templates, even if no route data uses that route type.
* The default route type for an app can be configured using `manifest.SetDefaultRouteTemplate()`. This is useful for adding global route-level fields such as page title and SEO metas.
* Importing a reference to a manifest item ID that will be imported to Sitecore later in the import process than the reference will no longer require manually executing a second import process to complete the reference correctly.

## Sitecore JSS 8.0 for Sitecore 9.0 (Tech Preview 3)

1. Sitecore XP 9.0 Update-1 is highly recommended for this update.

> Please note that applications developed for JSS 7.0 should be compatible with JSS 8.0 server components.

### New Features and Improvements

#### Vue support

* Supporting libraries and a sample app for Vue are now implemented.

#### JavaScript Renderings

* In addition to application-level JavaScript rendering, JSS now supports rendering-level approach allowing front-end developers to create JavaScript components and render those server-side within Sitecore environment side-by-side with .NET MVC renderings and other types of renderings. Learn more [here](/docs/techniques/mvc-integration/javascript-rendering).

#### Expanded Code-first capabilities

* Imported items now have predictable, stable item IDs if imported to multiple environments. [Docs](/docs/techniques/working-disconnected/import-process). (7.x apps will not see any ID changes unless deleted and re-imported)
* Ability to explicitly specify item IDs for import, via string or GUID identifier. [Docs](/docs/techniques/working-disconnected/import-process)
* Ability to create child items of a datasource item using the manifest (example of powering a pie chart using this technique in the GraphQL react sample app)
* Insert options may now be defined on templates and components with the `insertOptions` array property
* Custom experience buttons can be attached to components by name or ID with the `customExperienceButtons` array property
* Aliases added for `jss deploy package` and `jss manifest` for `--includeContent` (`-c`) and `--includeDictionary` (`-d`).

#### Improved Disconnected Development

* Sharing content between two components in code-first is now supported by using _ID references_ in your disconnected content.
* Within shared content, you can share the content but import it as copies - good for repeating lorem ipsum/FPO content, but importing it as discrete content items which will have different content in production.
* Sharing items linked in a multilist field is supported by using _ID references_.
* Disconnected development is now powered by disconnected versions of the Sitecore Layout, Dictionary, and Content services. This simplifies applications, which only need to maintain a single data access pattern.
* Link fields that point to route URLs or IDs are imported as internal links to Sitecore

For more on these changes, check out the Portfolio page of the React or Angular advanced sample apps, or [read the docs]()

#### Flexible React Placeholder Rendering

React placeholders now have flexible options to render their child components. This improves support for component hierarchy based React libraries. See [the docs](/docs/client-frameworks/react/react-placeholders).

### Important changes

* The default names of imported component datasource items that are in child placeholders has changed. This was necessary to ensure that duplicately named datasource items were not created in certain situations. If a JSS 7.0 app upgrades to JSS 8.0 and re-imports content, copies of some datasource items with new names will be created unless the `name` is explicitly specified on the component in route data, or the component is in a root placeholder. Should you wish to preserve legacy datasource naming behaviour, [it is possible using manifest pipeline patching](/docs/techniques/working-disconnected/legacy-datasource-naming).

* Placeholder settings items created during import are now set on the layout standard values for the default route template. _Existing apps will be converted to use layout-based placeholder settings when imported with JSS 8.0._
* `jss pull` and `jss pull-all-route-data` have been removed. In lieu of these options, using Connected Mode is recommended.
* Static build has been removed from sample apps.

### Bug Fixes

* Renderings added to the root route template are no longer removed when importing
* Route items now inherit layout from the route template correctly (layout deltas are applied)

## Sitecore JSS 7.0 for Sitecore 9.0 (Tech Preview 2)

1. Sitecore XP 9.0 Update-1 is highly recommended for this update.

> Please note that upgrades from this Tech Preview release to General Availability will not be provided or officially supported.

### New Features and Improvements

#### Expanded SDK support coverage
1. Full support for Angular 5 along with the advanced sample.
1. Initial (read: experimental) support for GraphQL - use all the power of GraphQL to query data from Sitecore and connect it to your UI. [Check out the sample app](https://github.com/Sitecore/jss/tree/master/samples/react) that is wired up via Apollo Client.
1. Initial (read: experimental) support for React Native!
1. Typings for core JSS SDK components (`Placeholder` and various field helpers).
1. Bundle analyzer plugin were added to webpack config in sample apps.

#### New JSS CLI:
1. Much more flexible deployment system than `npm` scripts alone. See the [dev workflow scripts](/docs/fundamentals/cli) page for details, or just run `npm install -g @sitecore-jss/sitecore-jss-cli` then `jss --help` in a JSS 7+ sample app.
1. Create a new JSS app with a single console command: `jss create <appname> react`
1. Sitecore-first/connected mode component scaffolding via `jss deploy component --help`.

#### Sample apps
1. All apps updated to use the new CLI and streamlined build configuration.
1. [New sample app](https://github.com/Sitecore/jss/tree/master/samples/angular) for Angular 5 showcasing advanced features such as routing, translation, authentication etc. (feature parity with the advanced app for React).
1. [New sample app](https://github.com/Sitecore/jss/tree/master/samples/react) showcasing powerful GraphQL capabilities.
1. [New sample app for React Native](https://github.com/Sitecore/jss/tree/master/samples/react-native) showcasing initial React Native capabilities (with personalization).

#### Expanded Code-first capabilities:
1. Additional [field metadata](/docs/techniques/working-disconnected/manifest-api) is now available, including field sharing, validation and standard values.
1. Dictionary data can now be imported via the manifest's `addDictionary()` method, and JSS apps will receive a dictionary domain by default.
    > See Advanced Sample App for React as a reference.
1. Ability to store route data in YAML files in addition to JSON.
    > To see how it is implemented, get the latest Advanced Sample App for React.
1. Route template and component inheritance is now supported in the manifest, e.g. `inherits: ['OtherTemplateName']`

#### Important changes

1. Content Service is deprecated.
    > Please use SSC or Sitecore.GraphQL service depending on the requirements.

### Bugfixes
1. Pulling route data with media and subsequent code-first deploy would fail with "Empty strings are not allowed" message.
    > 🙏 Nick Hills for the reproducible scenario.

1. host name input wasn't validated during `setup` phase.
    > 🙏 Himadri Chakrabarti for reporting the issue.

1. Route-level image field with empty object value breaks manifest generation.

1. Some generated packages were not recognized as valid Sitecore update packages and could not be installed.

    > 🙏 Petr Kasparek for reporting the issue.

1. Import process does not error for undefined languages.

1. Empty multilist field value is returned as empty string and may break the app.

1. Advanced app links don't work in multisite config with CM on a different host.

### Breaking Changes

1. The names of most operational scripts have changed to be using JSS CLI, with the exception of the build-related scripts. See the [dev workflow scripts](/docs/fundamentals/cli) page for details; as an example `npm run deploy-codefirst` is now `jss deploy package`. The CLI can run package scripts as well, so `jss build` is equivalent to `npm run build`.

1. Deploying an update package (`jss deploy package`, formerly `npm run deploy-codefirst`) _no longer includes content or dictionary items by default_ and requires additional arguments (`--includeContent`, `--includeDictionary`) to import that data.

1. AppNavigationProcessor responsible for getting all items from context site root to be used for nav rendering moved from default config to the Advanced Sample App configs.

1. `sitecore\JSS Import Service User` role renamed to `sitecore\JSS Import Service Users` (plural).

1. Data conversion moved from `sitecore-jss` library to server side.

### Docs
1. New recipe that demonstrates [extending code-first import pipelines](/docs/techniques/working-disconnected/extending-import)

### Upgrade?

Sorry, no upgrade path from the previous release is provided. If you are looking to upgrade, contact the dev team for advice.


## Sitecore JSS 6.0 for Sitecore 9.0 (Tech Preview 1)

> Please note that upgrades from this Tech Preview release to General Availability will not be provided or officially supported.

### New Features and Improvements

1. Support for Sitecore XP 9.0 Update-1, which is highly recommended for this update.

1. Support for Sitecore Services Client API Keys. Read more [here](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/sitecoreservicesclient/api_keys_for_the_odata_item_service).

	> It is now required to configure SSC API key for your JSS apps.
	> This gives ability to control CORS and impersonation for all the JSS services.

1. Open source JavaScriptViewEngine replaced to allow for easier installation of JSS Server package and remove dependencies on ASP.NET Node Services.

    An out-of-process node.js instance is still used for server-side rendering of your JSS app(s), but without any 3rd-party .NET dependencies involved and no more assembly redirects.

1. Core capabilities for Angular 5 (**still in experimental stage**):
    - Angular directives for `Text`, `RichText`, `Image`, `File` and `Link` field types.
	- Updated Angular-CLI to 1.6
	- SSR support updated.
	- [Basic app sample updated](https://github.com/Sitecore/jss/tree/master/samples/angular).

1. More out of the box Rendering Contents Resolvers available as configurable items under `/sitecore/system/Modules/Layout Service/Rendering Contents Resolvers`

    [Read more about this feature](/docs/techniques/extending-layout-service/layoutservice-rendering-contents).

1. Ability to specify width and height params for `Image` component `editable` value.
   This give developers more control over the image sizing.

1. Support for responsive images with `srcset`.

1. Server-side whitelisting of allowed image sizes for security purposes.

1. Added more built-in field serializers for various field types: `checkbox`, `date`, `file`, `general link`, `internal link`, `rich text`.

1. Scalability improved by **40-60%**.

1. LayoutService now returns more data in context payload: current item's template id and template name, context database and context language name.

1. `npm` script names have been [refactored](/docs/fundamentals/cli) to make them more easily understood, and several new scripts are available in addition to renamed existing ones:
    * `watch-sitecorefirst` - deploys files to Sitecore as they are changed; useful for development and testing with server-side rendering and real content
    * `build:static` - creates a disconnected, static build suitable to be deployed to a static file host. Includes an `index.html` and client-side JS only; does not pull data from Sitecore at all.

1. Added an [Embedded Wizard sample](https://github.com/Sitecore/jss/tree/master/samples/sitecore-embedded-jss-app) that shows how to embed client-side application inside an existing Sitecore MVC app.

1. Allow specifying language as part of import package
	- `npm config set sitecore-jss-advancedapp:language es-MX` and `npm config delete sitecore-jss-advancedapp:language` can change language for manifest generation dynamically now
	- import now honors manifest language

1. Field editor buttons are now automatically generated for every rendering during import.

1. Added support for Display Name on Placeholder in manifest and import for enhanced Experience Editor support.

1. Added proxy headers including `X-Forwarded-For` for Sitecore analytics.

### Bugfixes

1. Security restrictions cause Layout Service to 404 instead of 401.

1. Not all the log messages are not pumped into the dev console during app deployment.

1. The "default" datasource for was not returned during `npm run pull`.

1. Indexing of datasource item names can cause duplicated content on subsequent import

1. "__OnSave" displaying in default EE workflow notification

1. Custom notification with "The current item is allowed to be overwritten during next import." is not visible on Sitecore 9 any more.

### Breaking Changes

1. SSC API keys are required to be created prior to JSS app integration. Read more [here](https://doc.sitecore.net/sitecore_experience_platform/developing/developing_with_sitecore/sitecoreservicesclient/api_keys_for_the_odata_item_service).

1. Almost all `npm` scripts have been [renamed](/docs/fundamentals/cli).

1. `React Rendering` and `JavaScript Rendering` templates consolidated into `JsonRendering` template.

1.  The `ViewEngine` section was removed.

1. `Rendering Contents Resolver` field is now droptree referencing items under `/sitecore/system/Modules/Layout Service/Rendering Contents Resolvers`.

1. The experiemental support for Angular 5 replaced Angular 4 implementation in initial Tech Preview Release.

1. Angular 5 implementation of field helper components changed to using structural directives (from ``<jss-image>` to `<img *scImage= />`).

### Upgrade?

Sorry, no upgrade path from the previous release is provided. If you are looking to upgrade, contact the dev team for advice.

## Sitecore JSS 5.0 for Sitecore 9.0 (Tech Preview)

> Please note that upgrades from this Tech Preview release to General Availability will not be provided or officially supported.

### New Features and Improvements

* **Sitecore 9**
    * Sitecore JSS server-side components are now built for Sitecore 9.0.
    * Sitecore JSS now utilizes built-in Dynamic Placeholders functionality of Sitecore 9.0.
    * Role-based configuration is enabled for JSS Server components.
        * Import Service is enabled on `Standalone` and `ContentManagement`.
        * View Engine, Content Service, and Dictionary Service are enabled for `Standalone`, `ContentManagement`, and `ContentDelivery`.

* **React 16**
    * The `sitecore-jss-react` module and sample apps have been upgraded to React 16. React 16 is required for use with `sitecore-jss-react`.
    * The `Placeholder` component has benefitted from the upgrade to React 16. [Custom attributes will now be retained](https://facebook.github.io/react/blog/2017/09/08/dom-attributes-in-react-16.html), a wrapper `<span>` is no longer necessary for placeholders, and additional [error handling](https://facebook.github.io/react/blog/2017/07/26/error-handling-in-react-16.html) has been introduced for `Placeholder`-managed components.

* **Connected Mode in Advanced App**
    * You can now more easily launch the Advanced App sample in "Connected" mode, wherein your locally running application uses the Layout Service remotely for route data. This can be launched using `npm run start:connected`.

* **New Proxy Module for Headless Execution**
    * A new `sitecore-jss-proxy` module has been introduced which encapsulates helpful functionality for proxying Layout Service requests from a nodejs-based environment to Sitecore in "Headless" mode configurations.
    * See the sample app scaffolding for the Basic and Advanced apps for examples of usage.

* **Support for More Sitecore Field Types**
    * Layout Service serialization, import support, and React helper components have been created/updated for a number of Sitecore field types.
    * Rich Text
        * A new `RichText` helper component has been introduced in `sitecore-jss-react`.
    * Date
        * The Layout Service will now output ISO 8601 compliant date values.
        * The Import Service will now recognize ISO 8601 dates and convert them to the Sitecore date format on import.
    * General Link
        * The Layout Service will now output General Link fields with their "friendly" URL (`href`), and all field attribute values.
        * The Import Service will now import General Link fields with all out of the box attributes. Note that all links are treated as "external" at this time.
        * A new `Link` helper component has been introduced in `sitecore-jss-react`.
    * Droplink / Droptree
        * The Layout Service will now output internal link fields by serializing the linked item.
        * The Import Service will now import internal link fields by creating the provided item (similar to existing Multilist behavior).
    * Checkbox
        * The Layout Service will now output a `true`/`false` boolean value for Checkbox fields.
        * The Import Service will now recognize `true`, "0", and "true" as true values when importing Checkbox fields.
    * File
        * The Layout Service will now output a media URL and a number of media item metadata fields when serializing File fields.
        * The Import Service will now import media items for File fields, and will set additional metadata fields on the media item if provided.
        * A new `File` helper component has been introduced in `sitecore-jss-react`.

* **Improved "Pull All" for Route Data**
    * `npm pullall` will now pull all known and unknown routes. It will merge all routes from Sitecore (using  `navigation` from Layout Service `context`) with any known local routes (file-based).
    * You can pull just "known" local routes (file-based), by appending `--excludeSitecoreRoutes`.
    * You can pull only Sitecore routes (i.e. routes defined in `route.context.navigation`) by appending `--excludeLocalRoutes`.

* **Support for HTML Cache in Layout Service**
    * The Layout Service will now honor HTML caching settings configured on `JavaScript Rendering` and `React JavaScript Rendering`.

* **Improvements for Sitecore-first Development**
    * An Insert Option has been adding for manually creating *JavaScript Main Layout*.
    * The Component Name field for *React JavaScript Rendering* will now default to the item name (`$name`).

* **Patching of Manifest Generation Pipelines**
    * The pre-import manifest generation process (which defines the templates, layout items, and content items to be created) can now be enhanced / modified by patching its manifest generation pipelines.
    * You can find an example under `internals` in both sample apps.

### Bugfixes

* Resolved an issue which broke the Experience Editor when a single rendering personalization variant was hidden.
* An override for the Device Editor dialog is now included which allows selecting instances of *JavaScript Main Layout*.
* Resolved an issue with installing JSS import packages via the Update Installation Wizard wherein failures would not be evident during package install.
* Removed a bad main layout reference in the standard values of the *Route* template.

### Breaking Changes

* Sitecore 8 is no longer supported in the Tech Preview.
* JSS now uses the Sitecore 9.0 dynamic placeholder format. You will need to re-import your application and/or convert the placeholder keys with a custom script.
* React libraries and samples now use React 16. You will need to upgrade your application to React 16.
* Use of the Technical Preview requires a Sitecore license file which has been authorized for `Sitecore.Visit`, i.e. consumption licensing. Partners may utilize SPN to request a an updated partner license with this permission. Customers should contact their account representative.

## Sitecore JSS 4.0 (beta2)

> Please note that upgrades from this Tech Preview release to General Availability will not be provided or officially supported.

### New Features and Improvements

* **Manifest Generation**
    * The process of manifest generation has been dramatically reworked for better cross-library/framework compatibility (with an eye on future Angular usage, specifically) and is therefore no longer dependent on react.js specifics. This also means your react.js components are much less cluttered with Sitecore-only metadata. such as `FieldPropTypes` and `ParamPropTypes`, which were deprecated. We also factored in the feedback from the Program participants. The new approach is more extensible and explicit.

* **Translation and dictionaries**
    * New features and examples to enable full app language translation.
    * JSS Server install now includes a REST service for retrieving an application's translation dictionary.
    * The context language and application dictionary are also included by default in the view bag for server rendering, to allow dictionary initialization from your server bundle.
    * The Advanced App demo now includes examples of implementing a fully translatable app, including:
        * Use of the `i18next` translation module with the dictionary service.
        * Using language state with the `DataProvider` to request the correct language from the Layout Service.
        * Dev/disconnected route data is mocked in multiple languages.
        * URL-based language routing which mimicks the default URL structure from Sitecore.

* **Fields and Params**
    * What used to be a single `props` object is now split into `fields` and `params`, allowing developers to have more explicit control of how component data is received from Sitecore: as user-controlled fields in Sitecore (`fields`) or as a power-user/developer rendering parameter (`params`).
    * A `field` defined in the `fields` data is now always an `object` with `value` and `editable`.
    * In contrast, `params` always contain primitive values.

* **Editable fields**
    * Developers now have the ability to explicitly control whether to render a raw field value (ex: `fields.title.value`) or the result of Sitecore's `renderField` pipeline (ex: `fields.title.editable`).

* **View bag extensibility**
    * The view bag is now extensible via the `getRenderingEngineViewBag` pipeline.

* **Context data extensibility**
    * The `context` object coming from the Layout Service can now be extended via the `getLayoutServiceContext` pipeline.
    * This is useful for extending data returned by the Layout Service for an entire app or a group of routes.
    * The JSS configuration for Layout Service now includes app navigation data out of the box in the context.
    * The Advanced App demo now includes an example of mocking context data in the dev `DataProvider`, and uses the navigation data to make the `MainNav` component dynamic.

* **Route-level fields**
    * Item templates can now be extended with route-level fields, so data can be stored and accessed on the route rather than datasource items exclusively.
    * The Layout Service already had the capability of outputting any route-level fields.
    * The Advanced App has been extended with examples of using route fields for page metadata, and within components.

* **Image field support during import**
    * The meta-data specified on the image field level (`alt`, `width` and `height`) will be imported into Sitecore.

* The `sitecore\JssImport` user installed by the JSS server package is now disabled by default, to ensure it
cannot be used for login to Sitecore.

* **New docs**
* `npm run pull` has been slightly optimized in AdvancedApp configuration.

* The LayoutService now supports `tracking=false` parameter that disables tracking for a given request.

### Bugfixes

* JSS Ship configuration (`Sitecore.JavaScriptServices.Ship.config`) is now in the appropriate JSS config folder.
* Content service requests are no longer tracked as pages in analytics.
* Updated documentation on running the Advanced App in "connected" mode.
* An incorrect component name, or one which is not found in the component factory, would result in an unhelpful error message. These components are now gracefully skipped and a helpful error message is printed in the console.
* Rendering parameters utilizing `PascalCase` would be serialized in `camelCase` due to JSON serialization settings used by Layout Service and Microsoft JavaScriptServices. This has been resolved by updating the Layout Service serialization format for JSS to exclude any `IDictionary` properties from property name changes, and "double encoding" values sent to `renderView` during Universal Rendering to avoid JSON serialization by MS JSS. More details on this breaking change below.

### Breaking Changes

* some `npm` script names were changed for simplification.
* `FieldPropTypes` and `ParamPropTypes` are deprecated.
* Components that are rendered via `Placeholder` or reference via route data formerly used a single `props` object to define their data. This is now explicitly split into `fields` and `params` depending on the desired usage - developers can make a choice.
* Depending on the field type (`image` for example), `value` can also be an `object`.
* The `withSitecoreContext` HOC has been removed, as it was not possible to update its data on subsequent route changes due to use of React Context. In its place we recommend mapping `props` to state or passing the context object via `Placeholder` props. The Advanced App includes an example of this in the `Tabs` component.
* JSS now encodes route and view bag data before sending it through the Microsoft JavaScriptServices invocation of the `renderView` function in your server bundle. MS JSS encodes that data again, so in your `renderView` you **must** utilize `JSON.parse()` on the `data` and `viewBag` arguments. This double-encoding is necessary to allow JSS to control the JSON serialization (and to allow customization of that serialization if desired).
* Route and content data structure within Advanced App has been changed to allow language-specific content files, and the app has been upgraded to utilize `react-router` v4, which significantly changes routing configuration.

## Sitecore JSS 3.0 (beta1)

> Please note that upgrades from this Tech Preview release to General Availability will not be provided or officially supported.

### New Features and Improvements

* Content ownership control via Sitecore workflow and security

    Now content users have to explicitly allow developer overwrites via workflow.
    This prevents unexpected overwrites when content is changed in CMS by authors/editors.

* New app packaging & deployment and npm scripts scripts.

    File watcher is gone!
    JSS app is now deployed via generated `.update` package through Ship.

    You can now see the logging messages coming from Ship right in the console!

* Improved app import:
    * configurable datasource location placement strategies
    * full wipe mode for dev/CI environments
    * more configurability
    * developer artifacts are now protected after import.
    * route templates are created for each app.
    * layouts are generated for each app during import and assigned on __StandardValues of the route data template.
    * placeholder settings are now generated and the Allowed Controls list populated.
    * better logging

* Improved bi-directional sync:

    The `pull` npm script that fetches route data from Sitecore was improved.

* Support for rendering parameters.

    `SitecorePropTypes` are replaced with `FieldPropTypes` and `ParamPropTypes`.

* Layout Service got some love:
    * reworked placeholder logic
    * pluggable dynamic placeholder key format
    * updated json/rendered serialization behavior
    * context language support
    * more extensibility

* Basic multi-lingual support

    While you can only develop in single selected language, the app can render in multiple languages by respecting `sc_lang` query string in both headless and integrated modes.

* Reworked "mixed-mode" rendering using new embedded app approach.

### Bugfixes

* Sitecore doesn't error out anymore after server package installation.
* Datasource templates created for renderings with no props
* Using `.isRequired` with `SitecorePropTypes` produced wrong Sitecore field types in manifest.
* "Add here" anchor wasn't shown in Experience Editor unless there is at least one rendering on the layout.
* "Final Layout" is not cleared during 2nd import producing "left-over" renderings.
* The headless middleware now supports IIS instances that are configured with compression (gzip).
* Using Hide option in personalization breaks React rendering.
* Sample apps:
    * AdvancedApp's navigation now supports server-side routing when running in Experience Editor mode.
    * AdvancedApp's image reference cleanup.
    * Fixes for "React.PropTypes are being deprecated" warning.

### Breaking Changes
* LayoutService output format has been changed significantly.
* `SitecorePropTypes` renamed to `FieldPropTypes`.
* The `Placeholder` component has been changed significantly.
* Updated import process generates new artifacts (layout items and placeholder settings) which makes a previously imported app using Alpha import process incompatible.
* Major changes in `npm` scripts.

## Sitecore JSS 2.0 (alpha2)

> Please note that upgrades from this Tech Preview release to General Availability will not be provided or officially supported.

### New Features and Improvements
* Route layout now supports dynamic placeholders via a new, nested object shape.
The JSS server package now contains DynamicPlaceholder component from [Jason Bert](https://www.nuget.org/packages/DynamicPlaceholders/).
* Multi-app support via Sitecore configuration.
Apps can now be configured differently and executed in node.js process-level isolation.
* Additional import and integrated mode configuration options on a global or per-app basis.
* Import now supports react renderings without `SitecoreProps` ( via `.sitecore = true`).
* Demo apps include `package.json` settings for easier build configuration.
* Added a `verify:setup` task to demo apps to ensure setup prior to deploy.
* All pipelines moved to a "javaScriptServices" pipeline group.
* Misc bugfixes
* More unit tests

### Breaking Changes
* The `PlaceholderProvider` component has been renamed `SitecoreContext` to reflect its expanded role.
* The required props of the `Placeholder` component have changed, refer to documentation for details.
* The object shape expected by the `Placeholder` component and manifest import has changed in order to support dynamic placeholders. Reference example data in the Advanced demo application for details.

## Sitecore JSS 1.0 (alpha1)
> Please note that upgrades from this Tech Preview release to General Availability will not be provided or officially supported.

* Initial Release
