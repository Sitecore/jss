# Changelog
All notable changes to this project will be documented in this file. The format (starting with 18.0.0) is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

This project does NOT strictly adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Major versions of this project may include breaking changes in core packages but also denote compatibility with Sitecore Platform versions. Refer to the "Headless Services" section in the Sitecore modules compatibility table ([Sitecore XP 7.5 - 9.3](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB0541788), [Sitecore XP 10.0 and later](https://support.sitecore.com/kb?id=kb_article_view&sysparm_article=KB1000576)) or the [Headless Rendering download page](https://dev.sitecore.net/Downloads/Sitecore_Headless_Rendering.aspx) for details. Minor versions may also include breaking changes in framework packages.

Our versioning strategy is as follows:

- Patch: no breaking changes (e.g. bug fixes, minor improvements)
- Minor: may include breaking changes in framework packages (e.g. framework upgrades, new features, improvements)
- Major: may include breaking changes in core packages (e.g. major architectural changes, major features)

## Unreleased

### 🛠 Breaking Changes

* `[sitecore-jss-react]` `[sitecore-jss-nextjs]` FEaaS component is now server rendered. Prop type used FEaaSWrapper has been modified alongside with FEaaSWrapper implementation. Make sure you use the updated type and the updated wrapper. ([#1413](https://github.com/Sitecore/jss/pull/1413))
* `[sitecore-jss-rendering-host]` `startDevServer` is retired. `startRenderingHostServer` is the only way to start the rendering host from now on. ([#1426](https://github.com/Sitecore/jss/pull/1426))
* `[sitecore-jss-nextjs]` Some imports have been moved to avoid accidentally importing nextjs server logic inside client componenents([#1430](https://github.com/Sitecore/jss/pull/1430/)):
  * SiteInfo and SiteResolver imports have been moved from '@sitecore-jss/sitecore-jss-nextjs/middleware' module to '@sitecore-jss/sitecore-jss-nextjs/site'
  * tryParseEnvValue import has been moved from '@sitecore-jss/sitecore-jss-nextjs/middleware' module to '@sitecore-jss/sitecore-jss-nextjs/utils'
  * exports for isEditorActive, resetEditorChromes, resolveUrl, tryParseEnvValue, handleEditorFastRefresh, getPublicUrl from '@sitecore-jss/sitecore-jss-nextjs' are depreceated. '@sitecore-jss/sitecore-jss-nextjs/utils' module should be used for them instead. 

### 🎉 New Features & Improvements

* `[templates/nextjs-personalize]` Disable page view tracking event in development ([#1414](https://github.com/Sitecore/jss/pull/1414))
* `[templates/nextjs-sxa]` Add custom template for _jss scaffold_ ([#1420](https://github.com/Sitecore/jss/pull/1420))
* `[sitecore-jss-react]` `[sitecore-jss-nextjs]` FEaaS component will render 'staged' variant for editing and preview and 'published' variant for live site by default, unless variant is overriden via rendering parameters. ([#1433](https://github.com/Sitecore/jss/pull/1433))
* `[templates/nextjs]` `[templates/angular]` `[templates/react]` `[templates/vue]` Pre-push hook for lint check ([#1427](https://github.com/Sitecore/jss/pull/1427))
([#1442](https://github.com/Sitecore/jss/pull/1442)) ([#1444](https://github.com/Sitecore/jss/pull/1444))

### 🧹 Chores

* Configure the recommended VSCode extensions for the starters ([#1437](https://github.com/Sitecore/jss/pull/1437))
* `[templates/nextjs]` `[templates/nextjs-styleguide-tracking]` Move remaining Styleguide-Tracking artifacts from the base template ([#1422](https://github.com/Sitecore/jss/pull/1422))

### 🐛 Bug Fixes

* `[templates/nextjs]` Healthz shows page not found for multisite setup ([#1443](https://github.com/Sitecore/jss/pull/1443))
* `[sitecore-jss-react]` Hydration error when render Link in Edit mode ([#1432](https://github.com/Sitecore/jss/pull/1432))
* `[sitecore-jss-nextjs]` Fix for Link component which throws error if field is undefined ([#1425](https://github.com/Sitecore/jss/pull/1425))
* `[templates/react]` Fix compilation error when developing react template in monorepo ([#1428](https://github.com/Sitecore/jss/pull/1428))
* `[sitecore-jss-nextjs]` Fix regex for middleware redirects ([#1431](https://github.com/Sitecore/jss/pull/1431))
* `[sitecore-jss-angular]` Fix memory leak in image and link components ([#1435](https://github.com/Sitecore/jss/pull/1435))
* `[templates/nextjs-multisite]` Fix skipped site info fetch ([#1434](https://github.com/Sitecore/jss/pull/1434))
* `[angular]` Fix app build errors. Webpack version is locked at 5.78 due to https://github.com/webpack/webpack/issues/16981 ([#1448](https://github.com/Sitecore/jss/pull/1448))
* `[sitecore-jss-nextjs]` Fix middleware redirect when the target use regexp with querystring ([#1449](https://github.com/Sitecore/jss/pull/1449))

## 21.1.1

### 🐛 Bug Fixes

* `[sitecore-jss-nextjs]` [SXA] fixed middleware redirects ([#1431](https://github.com/Sitecore/jss/pull/1431))

## 21.1.0

### 🎉 New Features & Improvements

* `[create-sitecore-jss]` `[sitecore-jss-nextjs]` `[templates/nextjs]` `[templates/nextjs-multisite]` New `nextjs-multisite` initializer add-on. Allows a single JSS Next.js app to serve multiple Sitecore sites. ([#1248](https://github.com/Sitecore/jss/pull/1248)) ([#1288](https://github.com/Sitecore/jss/pull/1288)) ([#1264](https://github.com/Sitecore/jss/pull/1264)) ([#1271](https://github.com/Sitecore/jss/pull/1271)) ([#1275](https://github.com/Sitecore/jss/pull/1275)) ([#1277](https://github.com/Sitecore/jss/pull/1277)) ([#1279](https://github.com/Sitecore/jss/pull/1279)) ([#1281](https://github.com/Sitecore/jss/pull/1281)) ([#1283](https://github.com/Sitecore/jss/pull/1283)) ([#1284](https://github.com/Sitecore/jss/pull/1284)) ([#1286](https://github.com/Sitecore/jss/pull/1286)) ([#1306](https://github.com/Sitecore/jss/pull/1306)) ([#1290](https://github.com/Sitecore/jss/pull/1290)) ([#1294](https://github.com/Sitecore/jss/pull/1294)) ([#1302](https://github.com/Sitecore/jss/pull/1302)) ([#1339](https://github.com/Sitecore/jss/pull/1339)) ([#1360](https://github.com/Sitecore/jss/pull/1360)) ([#1365](https://github.com/Sitecore/jss/pull/1365)) ([#1303](https://github.com/Sitecore/jss/pull/1303)) ([#1304](https://github.com/Sitecore/jss/pull/1304)) ([#1299](https://github.com/Sitecore/jss/pull/1299)) ([#1322](https://github.com/Sitecore/jss/pull/1322)) ([#1361](https://github.com/Sitecore/jss/pull/1361)) ([#1296](https://github.com/Sitecore/jss/pull/1296))
* `[templates/nextjs]` `[sitecore-jss-nextjs]` Upgrade Next.js to version 13 ([#1324](https://github.com/Sitecore/jss/pull/1324))
* `[templates/angular]` `[sitecore-jss-angular]` Upgrade Angular to version 14 ([#1285](https://github.com/Sitecore/jss/pull/1285)) ([#1300](https://github.com/Sitecore/jss/pull/1300)) ([#1300](https://github.com/Sitecore/jss/pull/1300)) ([#1307](https://github.com/Sitecore/jss/pull/1307))
* `[templates/nextjs]` Finalize @sitecore/engage version upgrade ([#1317](https://github.com/Sitecore/jss/pull/1317))
* `[templates/nextjs]` Add healthz check ([#1207](https://github.com/Sitecore/jss/pull/1207))
* `[sitecore-jss]` `[sitecore-jss-nextjs]` Performance improvements for personalize service and middleware ([#1218](https://github.com/Sitecore/jss/pull/1218))
* `[sitecore-jss]` `[sitecore-jss-nextjs]` Update models: Add url and id property to item type ([#1219](https://github.com/Sitecore/jss/pull/1219))
* `[sitecore-jss-nextjs]` Add async to editing data cache ([#1223](https://github.com/Sitecore/jss/pull/1223))
* `[templates/nextjs]` `[sitecore-jss]` `[sitecore-jss-nextjs]` Performance improvement for site redirects service ([#1225](https://github.com/Sitecore/jss/pull/1225))
* `[sitecore-jss-angular]` Add canActivate and resolve functionality ([#1246](https://github.com/Sitecore/jss/pull/1246))
* `[templates/react]` `[templates/nextjs]` `[templates/vue]` `[sitecore-jss-nextjs]` `[sitecore-jss-react]` `[sitecore-jss-vue]` Upgrade 3rd party dependencies ([#1250](https://github.com/Sitecore/jss/pull/1250)) ([#1301](https://github.com/Sitecore/jss/pull/1301)) ([#1305](https://github.com/Sitecore/jss/pull/1305)) ([#1321](https://github.com/Sitecore/jss/pull/1321)) ([#1352](https://github.com/Sitecore/jss/pull/1352)) ([#1362](https://github.com/Sitecore/jss/pull/1362)) ([#1327](https://github.com/Sitecore/jss/pull/1327)) ([#1313](https://github.com/Sitecore/jss/pull/1313)) ([#1329](https://github.com/Sitecore/jss/pull/1329)) ([#1338](https://github.com/Sitecore/jss/pull/1338))
* `[templates/angular]` Upgrade bootstrap in sample app ([#1308](https://github.com/Sitecore/jss/pull/1308))
* `[templates/angular]` `[templates/react]` `[templates/vue]` `[templates/nextjs-styleguide]` `[sitecore-jss-nextjs]` `[sitecore-jss-react]` `[sitecore-jss-angular]` `[sitecore-jss-vue]` Edit frame component implementation ([#1342](https://github.com/Sitecore/jss/pull/1342))
* `[sitecore-jss-react]` Export DateFieldProps ([#1216](https://github.com/Sitecore/jss/pull/1216))

### 🧹 Chores

* `[sitecore-jss-vue]` Suppress unit test warnings ([#1335](https://github.com/Sitecore/jss/pull/1335))
* Add test-packages npm command ([#1233](https://github.com/Sitecore/jss/pull/1233)) 
* `[create-sitecore-jss]` `[sitecore-jss-nextjs]` `[sitecore-jss-react]` `[sitecore-jss-cli]` `[sitecore-jss]` `[sitecore-jss-dev-tools]` Increase unit test coverage ([#1258](https://github.com/Sitecore/jss/pull/1258)) ([#1259](https://github.com/Sitecore/jss/pull/1259)) ([#1260](https://github.com/Sitecore/jss/pull/1260)) ([#1262](https://github.com/Sitecore/jss/pull/1262)) ([#1263](https://github.com/Sitecore/jss/pull/1263)) ([#1265](https://github.com/Sitecore/jss/pull/1265)) ([#1256](https://github.com/Sitecore/jss/pull/1256))
* Improve unit test coverage reporting ([#1202](https://github.com/Sitecore/jss/pull/1202))
* Update CHANGELOG with updated version strategy ([#1330](https://github.com/Sitecore/jss/pull/1330))
* PR template refresh ([#1351](https://github.com/Sitecore/jss/pull/1351))

### 🐛 Bug Fixes

* `[templates/nextjs]` Additional middleware default exclusions ([#1230](https://github.com/Sitecore/jss/pull/1230))
* `[sitecore-jss]` rootItemId not resolvable for different language versions ([#1196](https://github.com/Sitecore/jss/pull/1196))
* `[sitecore-jss-forms]` File upload validation error ([#1213](https://github.com/Sitecore/jss/pull/1213))
* `[sitecore-jss-react]` `[sitecore-jss-nextjs]` Link component does not add anchor to the internal links ([#1226](https://github.com/Sitecore/jss/pull/1226)) ([#1375](https://github.com/Sitecore/jss/pull/1375))
* `[sitecore-jss-proxy]` Disable websocket processing by default in proxy ([#1311](https://github.com/Sitecore/jss/pull/1311))
* `[create-sitecore-jss]` Incompatibility message when installing sxa and styleguide ([#1315](https://github.com/Sitecore/jss/pull/1315))
* `[templates/angular]` The data "This page does not exist" is displayed during loading the page of angular app in EE ([#1331](https://github.com/Sitecore/jss/pull/1331))
* `[sitecore-jss-dev-tools]` After upgrade deploy throws 'Cannot calculate proper length in synchronous way.' ([#1332](https://github.com/Sitecore/jss/pull/1332))
* `[templates/nextjs]` Sample in Docker env references linked packages using lowercase path ([#1334](https://github.com/Sitecore/jss/pull/1334))
* `[templates/nextjs]` `[sitecore-jss-nextjs]` In Image component exclude width/height when fill prop is provided ([#1336](https://github.com/Sitecore/jss/pull/1336))
* `[sitecore-jss-rendering-host]` Fix react rendering host ESM error ([#1337](https://github.com/Sitecore/jss/pull/1337))
* `[templates/nextjs]` Nextjs Upgrade bug fixes ([#1340](https://github.com/Sitecore/jss/pull/1340)) ([#1341](https://github.com/Sitecore/jss/pull/1341)) ([#1346](https://github.com/Sitecore/jss/pull/1346))
* `[templates/nextjs]` Add rewrite for Sitecore's default 404 prefix ([#1345](https://github.com/Sitecore/jss/pull/1345))
* `[sitecore-jss-react]` Fix rendering issue in components using withPlaceholder ([#1349](https://github.com/Sitecore/jss/pull/1349))
* `[sitecore-jss-react-forms]` The language of the form is changed after clicking the submit button ([#1261](https://github.com/Sitecore/jss/pull/1261))
* `[templates/nextjs-sxa]` Cumulative SXA bug fixes ([#1319](https://github.com/Sitecore/jss/pull/1319)) ([#1292](https://github.com/Sitecore/jss/pull/1292)) ([#1165](https://github.com/Sitecore/jss/pull/1165)) ([#1245](https://github.com/Sitecore/jss/pull/1245)) ([#1268](https://github.com/Sitecore/jss/pull/1268)) ([#1269](https://github.com/Sitecore/jss/pull/1269)) ([#1272](https://github.com/Sitecore/jss/pull/1272)) ([#1278](https://github.com/Sitecore/jss/pull/1278)) ([#1333](https://github.com/Sitecore/jss/pull/1333)) ([#1185](https://github.com/Sitecore/jss/pull/1185)) ([#1172](https://github.com/Sitecore/jss/pull/1172)) ([#1255](https://github.com/Sitecore/jss/pull/1255))
* `[templates/nextjs-personalize]` `[sitecore-jss-nextjs]` Add support for fallback point of sale ([#1367](https://github.com/Sitecore/jss/pull/1367))
* `[templates/vue]` Fix local dev server launch error ([#1368](https://github.com/Sitecore/jss/pull/1368))
* `[sitecore-jss-nextjs]` Implemented MiddlewareBase abstraction. Skip Redirects middleware during editing ([#1370](https://github.com/Sitecore/jss/pull/1370))
* `[sitecore-jss-nextjs]` Redirects middleware should debug log start/end ([#1372](https://github.com/Sitecore/jss/pull/1372))

### 🛠 Breaking Changes

* `[sitecore-jss-nextjs]` `[templates/nextjs]` `[templates/nextjs-personalize]` `[templates/nextjs-sxa]` Middleware configuration for multiple sites ([#1288](https://github.com/Sitecore/jss/pull/1288)) ([#1350](https://github.com/Sitecore/jss/pull/1350)) ([#1367](https://github.com/Sitecore/jss/pull/1367))
  * SiteResolver implementation must be passed into redirects middleware
  * SiteResolver implementation must be passed into personalize middleware
  * getPointOfSale function passed into personalize middleware now accepts two parameters: site and language. Personalize middleware will use base PosResolver if no function is passed.

* `[sitecore-jss-angular][templates/angular]` jss-angular package and sample has been updated to version 14. ([#1285](https://github.com/Sitecore/jss/pull/1285)) ([#1300](https://github.com/Sitecore/jss/pull/1300))
  * JSS Angular sample is now using Ivy
  * IE11 no longer supported by JSS Angular
  * _sitecore-jss-angular_ package does not output UMD package anymore - only ESM. We created a '@sitecore-jss/sitecore-jss-angular/cjs' sub-module to have CJS imports still available i.e. in angular sample app's scripts. Right now the submodule re-exports '@sitecore-jss/sitecore-jss' modules.
  * _componentFactory_ is no longer present in ComponentFactoryResult interface, due to _createComponent_ changes and deprecations introduced in Angular 13.
  * More details on changes in Angular can be found in the below links:
  https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296
  https://angular.io/guide/deprecations
  https://update.angular.io/?l=3&v=11.0-14.0

* `[sitecore-jss-angular]` Due to the Angular version upgrade and the change in _sitecore-jss-angular_ package output format  _sitecore-jss_ exports are not available in angular app scripts (src/scripts) via '@sitecore-jss/sitecore-jss-angular'. Please use '@sitecore-jss/sitecore-jss-angular/cjs' import instead. Check bootstrap.ts scripts as for a usage example.

## 21.0.8

### 🐛 Bug Fixes

`[React]` `[Nextjs]` `[FEaaSComponent]` Avoid FEAAS Stylesheets parsing multiple times ([#1320](https://github.com/Sitecore/jss/pull/1320))

## 21.0.7

### 🎉 New Features & Improvements

`[sitecore-jss-react]` `[sitecore-jss-nextjs]` Added exports for FEaaSComponent ([#1316](https://github.com/Sitecore/jss/pull/1316))

## 21.0.6

### 🎉 New Features & Improvements

* `[sitecore-jss-react]` FEaaS Component implementation ([#1297](https://github.com/Sitecore/jss/pull/1297))
* `[templates/nextjs-sxa]` FEaaSWrapper Component implementation ([#1318](https://github.com/Sitecore/jss/pull/1318))

## 21.0.5

### 🐛 Bug Fixes

* `[templates/nextjs-sxa]` Fixed rendering dynamic placeholders filter. ([#1292](https://github.com/Sitecore/jss/pull/1292))

## 21.0.4

### 🐛 Bug Fixes

* `[templates/nextjs-sxa]` Fixed rendering dynamic placeholders for splitter components. ([#1292](https://github.com/Sitecore/jss/pull/1292))

## 21.0.3

### 🐛 Bug Fixes

* `[templates/nextjs-sxa]` Fixed rendering dynamic placeholders for splitter components. Added pattern and checking for rendering Dynamic placeholders. ([#1278](https://github.com/Sitecore/jss/pull/1278))([#1292](https://github.com/Sitecore/jss/pull/1292))

## 21.0.2

### 🧹 Chores

* `[template/nextjs-sxa]` Removed _XM Cloud only_ limitation from `nextjs-sxa` initializer add-on. This is now compatible with SXP with the release of Sitecore Experience Platform 10.3.

### 🐛 Bug Fixes

* `[templates/nextjs]` `[sitecore-jss-nextjs]` Upgrade Next.js version to 12.3.x ([#1238](https://github.com/Sitecore/jss/pull/1238))
* `[templates]` Rename "Page" back to "AppRoute" ([#1249](https://github.com/Sitecore/jss/pull/1249))
* `[templates/nextjs-sxa]` Cummulative fixes to `nextjs-sxa` initializer add-on ([#1206](https://github.com/Sitecore/jss/pull/1206))([#1215](https://github.com/Sitecore/jss/pull/1215))([#1241](https://github.com/Sitecore/jss/pull/1241))([#1232](https://github.com/Sitecore/jss/pull/1232))([#1229](https://github.com/Sitecore/jss/pull/1229))([#1221](https://github.com/Sitecore/jss/pull/1221))([#1254](https://github.com/Sitecore/jss/pull/1254))

## 21.0.1

### 🐛 Bug Fixes

* `[sitecore-jss]` Add sitemap.xml for result of sitemap service ([#1217](https://github.com/Sitecore/jss/pull/1217))


## 21.0.0

> Note: JSS 21 is currently compatible with _XM Cloud (XMC) only_. The release of Sitecore Experience Platform 10.3 will bring compatibility to SXP.

### 🎉 New Features & Improvements

* `[templates/nextjs]` `[sitecore-jss-nextjs]` Upgrade Next.js to 12.3.x
* `[create-sitecore-jss]` Personalize Initializer Add-on  ([#939](https://github.com/Sitecore/jss/pull/939))
* `[templates/react]` `[templates/nextjs]` `[templates/nextjs-styleguide]` `[sitecore-jss-nextjs]` `[sitecore-jss-react]` Upgrade react to version 18 ([#1055](https://github.com/Sitecore/jss/pull/1055))
* `[templates]` Rename "App Route" to "Page" ([#1159](https://github.com/Sitecore/jss/pull/1159))
* `[templates/nextjs]` `[sitecore-jss-nextjs]` `[sitecore-jss]` [Editing] Partial rendering implementation ([#1169](https://github.com/Sitecore/jss/pull/1169))
* `[templates/nextjs]` Add environment variable to allow disable of sitemap fetch in getStaticPaths ([#1149](https://github.com/Sitecore/jss/pull/1149))
* `[sitecore-jss-react]` Allow defer prop on VisitorIdentification component ([#1090](https://github.com/Sitecore/jss/pull/1090))
* `[sitecore-jss]` Introduce timeouts ([#1057](https://github.com/Sitecore/jss/pull/1057))([#1084](https://github.com/Sitecore/jss/pull/1084))
* `[sitecore-jss-angular]` Extend richText directive to render internal routerlinks ([#1050](https://github.com/Sitecore/jss/pull/1050))
* `[sitecore-jss-nextjs]` `[sitecore-jss-react]` Export more types from jss-nextjs & jss-react ([#1043](https://github.com/Sitecore/jss/pull/1043))
* `[sitecore-jss-vue]` RichText support for router links ([#1037](https://github.com/Sitecore/jss/pull/1037))
* `[sitecore-jss]` `[sitecore-jss-nextjs]` `[templates/nextjs]` Personalize Middleware ([#1008](https://github.com/Sitecore/jss/pull/1008))
* `[sitecore-jss-nextjs]` GraphQL sitemap now parses personalize data from site queries ([#1005](https://github.com/Sitecore/jss/pull/1005))
* `[templates/node-headless-ssr-proxy]` `[templates/node-headless-ssr-exp-edge]` `[sitecore-jss-proxy]` Add typescript to the sample ([#1013](https://github.com/Sitecore/jss/pull/1013))
* `[create-sitecore-jss]` Add script to restore yarn.lock ([#1004](https://github.com/Sitecore/jss/pull/1004))
* `[sitecore-jss-nextjs]` GraphQL sitemap now parses personalize data from site queries and adds it into returned paths ([commit](https://github.com/Sitecore/jss/commit/b6826dca5d96a4ead812a3f423022cafd317e799#diff-e94446b7fba4f602db7dd3427fe015d571b90b11f7e748d1ea94d6f0cd06e5cf))
* `[templates/react]` `[templates/angular]` `[templates/vue]` Support .env file ([#999](https://github.com/Sitecore/jss/pull/999))
* `[templates/nextjs]` `[templates/nextjs-styleguide]` Move XP tracking API examples to separate add-on initializer ([#980](https://github.com/Sitecore/jss/pull/980))
* `[templates/node-headless-ssr-proxy]` `[templates/node-headless-ssr-experience-edge]` Provide ability to use .env ([#977](https://github.com/Sitecore/jss/pull/977))
* `[templates/nextjs]` Make `extractPath` shared and remove duplicate `page-props-factory/plugins/normalMode` for `personalize` addon ([#954](https://github.com/Sitecore/jss/pull/954))
* `[create-sitecore-jss]` Add merge (concatenate) functionality for .env files ([#952](https://github.com/Sitecore/jss/pull/952)) ([#959](https://github.com/Sitecore/jss/pull/959))
* `[templates/nextjs]` Create plugins approach for the nextjs middleware ([#945](https://github.com/Sitecore/jss/pull/945))
* `[templates/nextjs]` Bump @sitecore/engage to latest version ([#1198](https://github.com/Sitecore/jss/pull/1198))
* `[sitecore-jss-react-forms]` Upgrade sitecore-jss-react-forms to React 18 ([#1199](https://github.com/Sitecore/jss/pull/1199))

### 🧹 Chores

* Fix Security Vulnerabilities ([#986](https://github.com/Sitecore/jss/pull/986))([#997](https://github.com/Sitecore/jss/pull/997))([#1114](https://github.com/Sitecore/jss/pull/1114))([commit](https://github.com/Sitecore/jss/commit/6de526dad45964e7b8eb410489ad0e027cf4e62e))
* `[sitecore-jss]` Make it clear that isEditorActive only works in browser ([#1089](https://github.com/Sitecore/jss/pull/1089))
* `[sitecore-jss-angular]` Cover `class overwrite` for scGenericLink and scRouterLink by unit test ([#1074](https://github.com/Sitecore/jss/pull/1074))
* `[sitecore-jss]` Audit API reference description for accuracy and completeness ([#1031](https://github.com/Sitecore/jss/pull/1031))
* `[sitecore-jss-angular]` Include all files from the dist ([#1049](https://github.com/Sitecore/jss/pull/1049))
* Resolve .npmingore discrepancies between packages ([#1032](https://github.com/Sitecore/jss/pull/1032))([#1034](https://github.com/Sitecore/jss/pull/1034))
* Create shared tsconfig.json for the monorepo ([#1000](https://github.com/Sitecore/jss/pull/1000))
* Add missing doc generation for sitecore-jss-nextjs/middleware ([#commit](https://github.com/Sitecore/jss/commit/e79efc581d70ed0378502703e5f14f26729dff38))
* Updated slack channel in SUPPORT.md ([commit](https://github.com/Sitecore/jss/commit/ea72bc4faf0500f066192dee3426a60f62b42fa3))
* `[create-sitecore-jss]` Restore sub-command (npm install / lint) console output ([#933](https://github.com/Sitecore/jss/pull/933))

### 🐛 Bug Fixes

* `[sitecore-jss-react]` Resolve hydration errors for nextjs pages in EE ([#1161](https://github.com/Sitecore/jss/pull/1161))
* `[templates/nextjs]` `[templates/nextjs-styleguide]` `[templates/nextjs-sxa]` Specify AppProps generic type in _app.tsx to align with latest changes from Next 12.3.0 ([#1154](https://github.com/Sitecore/jss/pull/1154))
* `[sitecore-jss-nextjs]` Build error when null values received in graphql-sitemap-service.js ([#1150](https://github.com/Sitecore/jss/pull/1150))
* `[templates/react]` App in monorepo fails to open in Experience Editor/Headless ssr proxy ([#1136](https://github.com/Sitecore/jss/pull/1136))
* `[sitecore-jss-nextjs]` handle _blank target on links in RichText ([#1135](https://github.com/Sitecore/jss/pull/1135))
* `[templates/nextjs]` Timeout error on CM when calling Next.js rendering host ([#1134](https://github.com/Sitecore/jss/pull/1134))
* `[templates/nextjs]` Updating next to 12.2.4 - and reintroducing babel to avoid swc errors ([#1124](https://github.com/Sitecore/jss/pull/1124))
* `[templates/vue]` Fix compilers proxy options in template ([#1107](https://github.com/Sitecore/jss/pull/1107))
* `[templates/react]` Module parse failed: Unexpected token, htmlparser2 ([#1115](https://github.com/Sitecore/jss/pull/1115))
* `[sitecore-jss-nextjs]` Fix paginated results retrieval in sitemap paths service ([#1112](https://github.com/Sitecore/jss/pull/1112))
* `[sitecore-jss-react]` Can't render Link component when Editable and Children are provided ([#1095](https://github.com/Sitecore/jss/pull/1095))
* `[templates/react]` Resolve duplicate react instances issue ([#1091](https://github.com/Sitecore/jss/pull/1091))
* `[sitecore-jss-react]` Refactored withComponentFactory HOC ([#1086](https://github.com/Sitecore/jss/pull/1086))
* `[sitecore-jss-proxy]` Provide headers to response when config.onError is called ([#1087](https://github.com/Sitecore/jss/pull/1087))
* `[sitecore-jss-nextjs]` Proper building of query string inside EditingRenderMiddleware ([#1071](https://github.com/Sitecore/jss/pull/1071))
* `[templates/angular]` Fix RouteData fields type mismatch ([#1067](https://github.com/Sitecore/jss/pull/1067))
* `[templates/nextjs]` `[sitecore-jss-nextjs]` Add a friendly message when building nextjs app and site items are missing ([#1066](https://github.com/Sitecore/jss/pull/1066))
* `[sitecore-jss]` RouteData type doesn't support ContentList/MultiList/DropTree fields ([#1061](https://github.com/Sitecore/jss/pull/1061))
* `[templates/angular]` `[sitecore-jss-angular]` Expose tracking functionality and remove direct usage of sitecore-jss module ([#1048](https://github.com/Sitecore/jss/pull/1048))
* `[sitecore-jss-react]` Allow to register custom field components ([#1047](https://github.com/Sitecore/jss/pull/1047))
* `[sitecore-jss-react]` VisitorIdentification component now uses sitecore context hook ([#1041](https://github.com/Sitecore/jss/pull/1041))
* `[sitecore-jss-react]` Fix misprint in comment ([#1028](https://github.com/Sitecore/jss/pull/1028))
* `[templates/node-headless-ssr-exp-edge]` Headless SSR Experience Edge returns 200 for page not found ([#1033](https://github.com/Sitecore/jss/pull/1033))
* `[templates/nextjs]` Dynamic components markup is missing in Experience Editor after adding new rendering ([#1019](https://github.com/Sitecore/jss/pull/1019))
* `[templates/node-headless-ssr-proxy]` `[templates/node-headless-ssr-exp-edge]` Fix invalid default bundle path ([#1027](https://github.com/Sitecore/jss/pull/1027))
* `[templates/react]`` [templates/angular]` `[templates/vue]` Remove scjssconfig verification, as .env is used ([commit](https://github.com/Sitecore/jss/commit/3ce391cecacc900de64b10e2489879d8124358a0))
* `[sitecore-jss-nextjs]` RichText component not forwarding query params ([#1015](https://github.com/Sitecore/jss/pull/1015))
* `[templates/nextjs-styleguide]` Update `jss create` related info on the home page ([#1009](https://github.com/Sitecore/jss/pull/1009))
* `[templates/angular]` `[node-headless-ssr-exp-edge]` Danish language is not rendered when refresh the page ([#1003](https://github.com/Sitecore/jss/pull/1003))
* `[templates/nextjs-styleguide]` `[templates/angular]` `[templates/react]` `[templates/vue]` Fix Styleguide comment path reference ([#956](https://github.com/Sitecore/jss/pull/956))
* `[templates/nextjs]` Fix missing null type for nextjs/Scripts.tsx ([commit](https://github.com/Sitecore/jss/commit/ea52127edf45e5a886f46071928d292b37c143d1))
* `[sitecore-jss-dev-tools]` [Manifest] Fix duplicate enum definition ([#996](https://github.com/Sitecore/jss/pull/996))
* `[template/nextjs-styleguide]` Add gitignore ([#993](https://github.com/Sitecore/jss/pull/993))
* `[templates/node-headless-ssr-proxy]` Fix shape of config object ([#979](https://github.com/Sitecore/jss/pull/979))([#992](https://github.com/Sitecore/jss/pull/992))
* `[sitecore-jss-vue]` Fix Sitecore querystring property in Link component ([#974](https://github.com/Sitecore/jss/pull/974))
* `[sitecore-jss-react]` Make Image handle 'class' prop when it's passed down ([#971](https://github.com/Sitecore/jss/pull/971))
* `[sitecore-jss-react]` [EE] Placeholder key is not defined ([#970](https://github.com/Sitecore/jss/pull/970))
* `[templates/nexts]` `[templates/nextjs-styleguide]` Use `kebab case` for plugins, instead of `camelCase` ([#961](https://github.com/Sitecore/jss/pull/961))
* `[sitecore-jss-vue]` Experience Editor controls does not work until hard reload is done ([#951](https://github.com/Sitecore/jss/pull/951))
* `[create-sitecore-jss]` graphql-let error when bootstrapping empty Nextjs app ([#941](https://github.com/Sitecore/jss/pull/941))
* `[sitecore-jss]` `[Angular]` "Edit related item" button redirects to home ([#943](https://github.com/Sitecore/jss/pull/943))
* `[sitecore-jss-vue]` Styleguide-Layout-Reuse breaks EE ([#937](https://github.com/Sitecore/jss/pull/937))
* `[sitecore-jss]` Replace abortController.signal with promises timeout in native and graphql fetchers ([#1191](https://github.com/Sitecore/jss/pull/1191))
* `[sitecore-jss]` Error message related to timeout is not intuitive ([#1197](https://github.com/Sitecore/jss/pull/1197))
* `[sitecore-jss-nextjs]` Ensure headers from middleare are passed into NativeFetcher ([#1177](https://github.com/Sitecore/jss/pull/1177))
* `[templates/nextjs-sxa]` Cumulative SXA bug fixes ([#1168](https://github.com/Sitecore/jss/pull/1168)) ([#1181](https://github.com/Sitecore/jss/pull/1181)) ([#1184](https://github.com/Sitecore/jss/pull/1184)) ([#1187](https://github.com/Sitecore/jss/pull/1187)) ([#1189](https://github.com/Sitecore/jss/pull/1189)) ([#1190](https://github.com/Sitecore/jss/pull/1190)) ([#1193](https://github.com/Sitecore/jss/pull/1193)) ([#1194](https://github.com/Sitecore/jss/pull/1194)) ([#1195](https://github.com/Sitecore/jss/pull/1195)) ([#1200](https://github.com/Sitecore/jss/pull/1200)) ([#1203](https://github.com/Sitecore/jss/pull/1203))

### 🛠 Breaking Changes

* Remove deprecated features ([#1088](https://github.com/Sitecore/jss/pull/1088))
* `[sitecore-jss-react]` `[sitecore-jss-nextjs]` Link component should forward ref ([#1080](https://github.com/Sitecore/jss/pull/1080))
* `[sitecore-jss-nextjs]` `[sitecore-jss]` graphql nextjs sitemap update ([#1002](https://github.com/Sitecore/jss/pull/1002))([#1007](https://github.com/Sitecore/jss/pull/1007))([#1026](https://github.com/Sitecore/jss/pull/1026))
  * Updated GraphQLSitemapService will only work with Sitecore versions that have 'site' query present in edge schema.
* `[sitecore-jss-nextjs]` Performance improvements for editing integration ([#1140](https://github.com/Sitecore/jss/pull/1140))
  * `[sitecore-jss-nextjs]` All editing-related types have moved to a dedicated `editing` submodule. Imports must be updated to use this submodule. e.g.
    * `import { editingDataService } from '@sitecore-jss/sitecore-jss-nextjs/editing';`
    * `import { EditingRenderMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/editing';`

## 20.1.0

### 🎉 New Features & Improvements

* `[template/nextjs]` `[sitecore-jss-nextjs]`  New `NextImage` component, a Sitecore `Image` field helper component for `next/image` ([#978](https://github.com/Sitecore/jss/pull/978))
* `[template/nextjs-sxa]` New `nextjs` initializer add-on `nextjs-sxa` for SXA Headless support (currently compatible with _XM Cloud only_)
* `[template/nextjs]` `[sitecore-jss-nextjs]` Upgrade to Next.js 12.2 ([#1093](https://github.com/Sitecore/jss/pull/1093))
* `[sitecore-jss-react]` Support SXA Rendering Variants inside the React `Placeholder` component ([#931](https://github.com/Sitecore/jss/pull/931))
* `[template/nextjs]` Add a friendly message when building nextjs app and site items are missing ([#1066](https://github.com/Sitecore/jss/pull/1066))
* `[create-sitecore-jss]` Add descriptions to add-on list ([#935](https://github.com/Sitecore/jss/pull/935))
* `[template/nextjs]` Introduced plugins approach for Next.js Middleware ([#945](https://github.com/Sitecore/jss/pull/945))
* `[sitecore-jss]` Make it clear that `isEditorActive` only works in browser ([#1089](https://github.com/Sitecore/jss/pull/1089))
* `[template/nextjs]` `[template/nextjs-styleguide]` `[template/nextjs-sxa]` Specify AppProps generic type in _app.tsx to align with latest changes from Next 12.3.0 ([#1155](https://github.com/Sitecore/jss/pull/1155))

### 🧹 Chores

* `[template/nextjs]` Update obsolete `jss create` related info on the home page ([#1009](https://github.com/Sitecore/jss/pull/1009))

### 🐛 Bug Fixes

* `[sitecore-jss-react]` Refactored withComponentFactory ([#1086](https://github.com/Sitecore/jss/pull/1086)) and withSitecoreContext ([#1100](https://github.com/Sitecore/jss/pull/1100)) HOCs to fix Next.js SSR production issue on React 17
* `[sitecore-jss-react]` Fix Placeholder key is not defined error in Sitecore editors ([#970](https://github.com/Sitecore/jss/pull/970))
* `[sitecore-jss-react]` Make Image handle 'class' prop when it's passed down ([#971](https://github.com/Sitecore/jss/pull/971))
* `[template/nextjs]` Dynamic components markup is missing in Experience Editor after adding new rendering ([#1019](https://github.com/Sitecore/jss/pull/1019))
* `[sitecore-jss-vue]` Fix Sitecore querystring property in Link component ([#974](https://github.com/Sitecore/jss/pull/974))
* `[node-headless-ssr-exp-edge]` `[sitecore-jss-angular]` Danish language is not rendered when refreshing the page ([#1003](https://github.com/Sitecore/jss/pull/1003))
* `[sitecore-jss-nextjs]` RichText component not forwarding query params ([#1015](https://github.com/Sitecore/jss/pull/1015))

## 20.0.0

### New Features & Improvements

`[create-sitecore-jss]` New package containing initializers / templates for JSS sample applications. This replaces `jss create` with initializer of choice (`npx create-sitecore-jss`, `npm init sitecore-jss`) ([#881](https://github.com/Sitecore/jss/pull/881)), ([#883](https://github.com/Sitecore/jss/pull/883)), ([#882](https://github.com/Sitecore/jss/pull/882)), ([#880](https://github.com/Sitecore/jss/pull/880)), ([#879](https://github.com/Sitecore/jss/pull/879)), ([#878](https://github.com/Sitecore/jss/pull/878)), ([#876](https://github.com/Sitecore/jss/pull/876))

`[template/nextjs]`
* Remove `withSitecoreContext` HOC from Layout.tsx ([#887](https://github.com/Sitecore/jss/pull/887))
* Component props auto-injection by Placeholder ([#884](https://github.com/Sitecore/jss/pull/884))
* Plugins for next.config.js ([#867](https://github.com/Sitecore/jss/pull/867))
* Refactor `sitemap-fetcher` to make it extendable ([#865](https://github.com/Sitecore/jss/pull/865))
* Upgrade to Next.js 12 ([#860](https://github.com/Sitecore/jss/pull/860)), ([#948](https://github.com/Sitecore/jss/pull/948))
* Refactor `PagePropsFactory` to make it extendable ([#857](https://github.com/Sitecore/jss/pull/857))
* Remove locale variants from default rewrites ([#832](https://github.com/Sitecore/jss/pull/832))

`[template/angular]` Language is not preserved when navigating to another page ([#793](https://github.com/Sitecore/jss/pull/793))

`[template/nextjs]` `[template/react]` `[template/angular]` `[template/vue]` 
* Use the app name as the prefix value for templates ([#800](https://github.com/Sitecore/jss/pull/800)), ([#811](https://github.com/Sitecore/jss/pull/811)), ([#813](https://github.com/Sitecore/jss/pull/813)), ([#814](https://github.com/Sitecore/jss/pull/814))
* Throw error when run jss start using `FETCH_WITH=GraphQL` ([#920](https://github.com/Sitecore/jss/pull/920))
* Bring environment variable support to config generation ([#911](https://github.com/Sitecore/jss/pull/911), [#commit](https://github.com/Sitecore/jss/commit/dcacaccccc77add195458a552f0b061d381e29ef))
* Change the classname of `ContentBlock` from display-4 to contentTitle ([#908](https://github.com/Sitecore/jss/pull/908))
* Hidden renderings do not have implementation and result in console error message ([#834](https://github.com/Sitecore/jss/pull/834))
* Use the app name as the prefix value for placeholders ([#830](https://github.com/Sitecore/jss/pull/830))

`[sitecore-jss-nextjs]` `[sitecore-jss-react]` Handle Sitecore querystring property in Link component ([#929](https://github.com/Sitecore/jss/pull/929))

`[Maintenance]` Generate API reference docs ([#840](https://github.com/Sitecore/jss/pull/840))

`[sitecore-jss-manifest]` `[template/nextjs]` Allow component manifest definitions to define a template name ([#810](https://github.com/Sitecore/jss/pull/810))

### Bug Fixes

`[template/*]`
* Highlight error message for fetchWith=GraphQL ([#930](https://github.com/Sitecore/jss/pull/930))
* Fix peer dependency errors ([#910](https://github.com/Sitecore/jss/pull/910))

`[template/nextjs]`
* graphql-let error when bootstrapping empty Nextjs app ([#942](https://github.com/Sitecore/jss/pull/942))
* Use more focused paths for Sitecore rewrites ([#921](https://github.com/Sitecore/jss/pull/921)
* Add .babelrc to Next.js template to disable SWC compilation ([#918](https://github.com/Sitecore/jss/pull/918))
* Can't start app in disconnected mode, throws webpack fallback option error ([#913](https://github.com/Sitecore/jss/pull/913))
* Add .gitattributes to Next.js sample app with CRLF line endings ([#855](https://github.com/Sitecore/jss/pull/855))
* `[Horizon]` Custom components cannot be added ([#807](https://github.com/Sitecore/jss/pull/807))
* Add gitignore ([#993](https://github.com/Sitecore/jss/pull/993))

`[template/angular]`
* [10.3] "Edit related item" button redirects to home ([#944](https://github.com/Sitecore/jss/pull/944))
* Update angular-devkit/build-angular to fix deprecation error ([#917](https://github.com/Sitecore/jss/pull/917))
* Convert language to the sitecore compatible format ([#906](https://github.com/Sitecore/jss/pull/906))
* Fix issues with Angular in disconnected mode (incorrect componentName + reverts changes ([#commit](https://github.com/Sitecore/jss/commit/4698d9735cf4062e8208d399146b927b1496d811))
* Opt out of angular telemetry by default ([#commit](https://github.com/Sitecore/jss/commit/d37f651cb872cd71bdb3e067f804d022a9b99ff8))
* Fix handling of not found layout service requests in Angular sample ([#809](https://github.com/Sitecore/jss/pull/809))
* Console error when /graphql requested in EE, localhost or horizon ([#803](https://github.com/Sitecore/jss/pull/803))

`[template/vue]`
* The page is redirected to the home page of the website after clicking the "Change associated content" button in the Experience Editor ([#907](https://github.com/Sitecore/jss/pull/907))
* Cannot add a new rendering to the newly created ([#903](https://github.com/Sitecore/jss/pull/903))
* `[Horizon]` Cannot add a new rendering or highlight existing ([#895](https://github.com/Sitecore/jss/pull/895))
* `[Authoring]` 'Add here' modal does not show allowed items on placeholder ([#859](https://github.com/Sitecore/jss/pull/859))
* Server error for Vue + --fetchWith GraphQL + node-headless-SSR-Experience-Edge ([#812](https://github.com/Sitecore/jss/pull/812))
* Fix Vue sample RestLayoutService config (use 'apiHost', not 'endpoint') ([#804](https://github.com/Sitecore/jss/pull/804))

`[template/react]` Set _changeOrigin: true_ for proxied Sitecore requests in connected mode ([#808](https://github.com/Sitecore/jss/pull/808))

`[template/vue]` `[template/react]` Exception while rendering GraphQL page ([#900](https://github.com/Sitecore/jss/pull/900))

`[template/react]` `[template/angular]` `[template/vue]` Fix Template id for styleguide-explanatory-component-template & vue graphql fragment data ([#816](https://github.com/Sitecore/jss/pull/816))

`[template/react]` `[template/angular]` `[template/vue]` jss graphql:update throws errors ([#806](https://github.com/Sitecore/jss/pull/806))

`[template/react]` `[template/angular]` `[template/vue]` Include Sitecore server URL in media URLs by default ([#802](https://github.com/Sitecore/jss/pull/802))

`[sitecore-jss]`
* TypeError: Only absolute URLs are supported ([#826](https://github.com/Sitecore/jss/pull/826))

`[sitecore-jss-vue]`
* Experience Editor controls does not work until hard reload is done ([#950](https://github.com/Sitecore/jss/pull/950))
* Styleguide-Layout-Reuse breaks EE ([#938](https://github.com/Sitecore/jss/pull/938))

`[sitecore-jss-nextjs]`
* Prevent passing internalLinkMatcher prop ([#847](https://github.com/Sitecore/jss/pull/847))
* Preview Mode doesn't work with _fallback: false_ on Vercel ([#846](https://github.com/Sitecore/jss/pull/846))
* `[caching]` Make _tmpDir_ a configurable parameter ([#839](https://github.com/Sitecore/jss/pull/839))

`[sitecore-jss-cli]`
* Ignore pdf and images when replacing or stripping prefix ([#818](https://github.com/Sitecore/jss/pull/818))
* Handle underscores in app name when replacing prefix ([#817](https://github.com/Sitecore/jss/pull/817))

`[node-headless-ssr-proxy]` `[node-headless-ssr-experience-edge]` Added submodules import ([#916](https://github.com/Sitecore/jss/pull/916))

`[sitecore-jss-nextjs]` `[sitecore-jss-react]` Attributes of an empty placeholder are applied to the next sibling `<div>` tag in Experience Editor of JSS item ([#833](https://github.com/Sitecore/jss/pull/833))

`[sitecore-jss-dev-tools]` Fix circular dependencies ([#843](https://github.com/Sitecore/jss/pull/843))


`[Maintenance]`
* Upgrade security vulnerable packages ([#866](https://github.com/Sitecore/jss/pull/866))
* Node 16 upgrade ([#863](https://github.com/Sitecore/jss/pull/863))
* Resolve deprecated dependencies in sitecore-jss-cli package ([#864](https://github.com/Sitecore/jss/pull/864))
* The page is redirected to the home page of the website after clicking the "Change associated content" button in the Experience Editor in angular application ([#835](https://github.com/Sitecore/jss/pull/835))
* *scRouterLink breaks link generation ([#815](https://github.com/Sitecore/jss/pull/815))

### Breaking Changes

`[Maintenance]`
* Removed sitecore-embedded-jss-app (migrated to https://github.com/Sitecore/headless-examples) and sitecore-javascript-renderings (deprecated) ([#commit](https://github.com/Sitecore/jss/commit/09656bea220166669e781f16c95d823caddb928d))
* Consolidated tightly coupled packages together and refactored the sitecore base package into submodules. ([#824](https://github.com/Sitecore/jss/pull/824), [#commit](https://github.com/Sitecore/jss/commit/6fed8cc044c2ef21905c776ce213dbac8ae6ac66), [#commit](https://github.com/Sitecore/jss/commit/ae33d336de817211e5ec2005b0364f9f69d9ca21))

`[sitecore-jss-cli]` Error handling for someone trying to run _jss create_ ([#893](https://github.com/Sitecore/jss/pull/893))

`[samples]` Retire samples ([#891](https://github.com/Sitecore/jss/pull/891))

`[template/nextjs]` `[template/react]` Strongly typed SitecoreContext value ([#841](https://github.com/Sitecore/jss/pull/841))


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

## Sitecore JSS 15.0.3

### Bug Fixes

* [PR #1309](https://github.com/Sitecore/jss/pull/1309) [sitecore-jss-react-forms] The language of the form is changed after clicking the submit button 

## Sitecore JSS 15.0.2

### Bug Fixes

* [PR #815](https://github.com/sitecore/jss/pull/815) [sitecore-jss-angular] Fix issue where querystring parameters would break links generated with the `scRouterLink` component.

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
