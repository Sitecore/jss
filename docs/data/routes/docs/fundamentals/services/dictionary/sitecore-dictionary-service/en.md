---
name: sitecore-dictionary-service
routeTemplate: ./data/component-templates/article.yml
title: Sitecore Dictionary Service
---

# Sitecore Dictionary Service

Sitecore Headless Services provides a REST endpoint for retrieving an app-specific translation dictionary. 

> Note: If you provide the `sc_lang` parameter to [Layout Service](/docs/fundamentals/services/layout/sitecore-layout-service) requests, the service will return content in the specified language. The Dictionary Service returns translated phrases in your app.

The endpoint format for this API is `/sitecore/api/jss/dictionary/<app>/<language>/`.

For example, a request to `http://JssReactWeb.dev/sitecore/api/jss/dictionary/JssReactWeb/es-MX/` will return:

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