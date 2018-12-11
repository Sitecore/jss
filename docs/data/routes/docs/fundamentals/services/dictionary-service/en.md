---
name: dictionary-service
routeTemplate: ./data/component-templates/article.yml
title: Dictionary Service
---

# Dictionary Service

Often multilingual apps will need a dictionary of static phrases that require translation. Commonly this would be items such as form labels, global navigation items, footers, etc. Sitecore JSS provides an additional REST endpoint for retrieving an app-specific translation dictionary, backed by a Sitecore feature called *Dictionary Domains*. The URL format for this API is:

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

If you'd like to learn more about other translation techniques with JSS, see [Content Translation](/docs/techniques/content-translation)