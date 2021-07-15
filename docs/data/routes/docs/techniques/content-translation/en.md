---
name: content-translation
routeTemplate: ./data/component-templates/article.yml
title: Content Translation
---

# Content Translation

Sitecore JSS has been built to allow you to take advantage of one of Sitecore's strongest WCM features -- content language versioning. Typically there are two concerns with translation: the primary page/route content, and "dictionary" items which may be used throughout an app/site for miscellaneous labels, button text, etc.

The sample apps shows one approach to using the tools provided by JSS to make your app fully translatable.

## Translation of Layout Service Content

The [Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service) will fully respect the Sitecore *Language Context* when fetching route and context data. This means that requests to the Layout Service can utilize the `sc_lang` param to request content in a specific language.

e.g. `http://JssReactWeb/sitecore/api/layout/render/jss?item=/Services&sc_lang=es-MX&sc_apikey={YOUR_API_KEY}`

It's up to you how the Layout Service is invoked in your app, and how language changes are handled. In the sample apps, the `SitecoreContentService` implementation accepts `language` as parameter when getting route data.

## Translated Route and Context Data in Dev/Disconnected Mode

In order to simulate translated content from the Layout Service, the Disconnected Layout Service mocks the interface of the Sitecore Layout Service including the language data. The Disconnected Layout Service is powered by the JSS Manifest data, which is single-language. However, DLS re-generates the manifest on the fly when a different language is requested by the app. Data needs to be available in multiple languages to support this use case; the sample apps have a default convention of using `lang.yml` (or JSON) files to enable definition of different languages' contents and layout.

![Translated Route Files](/assets/img/recipe-content-translation-dev-routes.png)

This is only the default convention for multilingual content for sample apps, defined in `/sitecore/definitions/routes.sitecore.js`. You can define your own conventions and ways to store multilingual data that matches your preferences and needs.

> Note: when operating in Sitecore-first development workflow, disconnected layout service is not used.

## Translation of Dictionary Items

Sitecore JSS provides an additional REST [Dictionary Service](/docs/fundamentals/services/dictionary-service) to support acquiring translated phrases in your app. The sample apps demonstrate using this service to translate static text.

## Language Routing / Language in URL

JSS does not dictate your route/URL structure, however it's much simpler to implement integrated mode (and thus allowing Sitecore authors to edit the content of the site) when the routing structure follows Sitecore's route item structure. All sample apps implement basic routing that follows the Sitecore route item hierarchy by default. The default router can be replaced at need; the sample apps are intended to be samples to take and modify.

The sample apps demonstrate routing using language prefixes (i.e. both `/about` and `/en/about` or `/es-MX/about` are supported formats).

## Translated Content and Integrated Rendering

In integrated mode, Sitecore handles language resolution and thus Layout Service content provided to the `renderView()` SSR function will be returned in the correct language for [server rendering](/docs/techniques/ssr/integrated-mode-ssr). In addition, by default JSS adds two properties to the `viewBag` argument to assist in language translation:

* `viewBag.language` - This is the language resolved by Sitecore, helpful for initializing app state to the correct language. Since Sitecore also uses a language cookie by default, a request without language in the URL can return content in the language last requested by the user.
* `viewBag.dictionary` - The dictionary phrases for the app in the current language, i.e. what would be the output of the Dictionary Service. This allows initializing the dictionary for server-side rendering. For an example of usage, see `i18nInit` in `i18n.js` and how it is invoked in both `client.js` and `server.js`.

## Translated Content and Disconnected Mode Import

In most cases, a [disconnected mode](/docs/fundamentals/application-modes) application will probably transition to being a Sitecore-based application (i.e. run in connected mode or integrated mode) before translation is a consideration. However, it is possible to develop disconnected multilingual content. This technique is demonstrated in the _advanced app_ samples, by defining routes using a file for each language, e.g. `en.yaml` and `es-mx.yaml`.

It's important to know that when doing multilingual disconnected mode applications:

* The app still has a single default language (defined in `package.json`). All sample apps default to `en`.
* When generating a [manifest](/docs/techniques/working-disconnected/disconnected-overview), the manifest contains _only one language at a time_
* When deploying an update package, similar to the manifest, only one language is included in the package at a time
* The default language when manifesting or packaging is the one defined in `package.json`

To deploy a multilingual disconnected application, each language's data must be separately deployed. 

> Note that if you are not deploying content/route data (e.g. not using the `--includeContent` or `--includeDictionary` arguments), there is no multilingual concern and deployment is a single-step process.

To deploy each language issue a deployment command using the `--language` parameter, like this:

```
jss deploy items --language=es-MX --includeContent --includeDictionary
```

> Note: `jss deploy items` does not deploy files. To deploy files use `jss deploy files`. To deploy items and files use `jss deploy app`.

## Headless Mode / Layout Service Proxying

The [headless server-side rendering](/application-modes#headless-server-side-rendering-mode) example included with JSS works in part by translating and proxying the initial route URL into a request to the Layout Service. This requires some intelligence on the structure of your route URLs, if they contain anything other than the Sitecore route path, or if you wish the proxy to append a language parameter. To faciliate this, the proxy function accepts an optional `parseRouteUrl` function, which it expects to return an object with `lang` and `sitecoreRoute` properties.

The example populates this function with a `parseRouteUrl` export from your app's server bundle. See the server file in your sample app (e.g. `/server/server.js` for React).