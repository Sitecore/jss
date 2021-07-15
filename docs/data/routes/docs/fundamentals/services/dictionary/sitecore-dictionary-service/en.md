---
name: sitecore-dictionary-service
routeTemplate: ./data/component-templates/article.yml
title: Sitecore Dictionary Service
---

# Sitecore Dictionary Service

Sitecore JSS provides an additional REST endpoint for retrieving an app-specific translation dictionary, backed by a Sitecore feature called *Dictionary Domains*. The URL format for this API is:

`/sitecore/api/jss/dictionary/<app>/<language>/`

For example:
http://JssReactWeb/sitecore/api/jss/dictionary/JssReactWeb/es-MX/

```json
{
    "lang": "es-MX",
    "app": "JssReactWeb",
    "phrases": {
        "Copyright": "{{year}} Inicio Bootstrap",
        "Home": "Inicio",
        "Start Bootstrap": "Inicio Bootstrap"
    }
}
```

It's up to you how you invoke and utilize this data. For example, the React App utilizes the `i18next` module with `i18next-fetch-backend`.

> Note for Sitecore devs and admins: By default all JSS apps have a dictionary domain configured for the app. You can alter the app's dictionary domain in the [App configuration](/docs/techniques/content-translation).

## 