---
name: multi-language-support
routeTemplate: ./data/component-templates/guide.yml
title: Supporting Multiple Languages
---

## Utilize the i18next module
The JSS starters come preloaded with the `i18next` module, which is a powerful "localization as a service" library. The starters also provide a script that's essentially a wrapper around the `i18next` initialization code, to get you started quickly. But if you are implementing a multi-site, multi-lingual solution, we recommend reading the [i18next documentation](https://www.i18next.com/) to learn about all the available features and initialization options. This will help you add customizations to the wrapper to support things like debugging and components like language selector.


### Review other OOTB configuration options
The `i18next` module offers many [configuration options](https://www.i18next.com/overview/configuration-options) that may apply to your project's requirements.

For example
- Initializing in debug mode
- Specifying a list of languages to preload
- Using a cache plugin

### Specify a language on load
Explicitly specify the default language

For multi-language sites, ensure you are properly setting the current language upon initialization. This prevents route handlers from causing a "flicker" by attempting to change the current site language on initial page load. 

```javascript
let initLanguage = config.defaultLanguage;

if (__JSS_STATE__) {
  // set i18n language SSR state language instead of static config default language
  initLanguage = __JSS_STATE__.sitecore.context.language;
}

i18ninit(initLanguage).then(() => {
  const rootElement = document.getElementById('root');
  renderFunction(
    <AppRoot
      path={window.location.pathname}
      Router={BrowserRouter}
      graphQLClient={graphQLClient}
    />,
    rootElement
  );
});
```

### Debugging
https://www.i18next.com/overview/configuration-options#logging

---

## Specifying language in GraphQL queries
A way to do this is to set the Sitecore Context Language to de-DE for the GraphQL query. Just add &sc_lang=de-DE to the querystring of the URL from the GraphQL endpoint. An now you can also remove the language in your query. And in the result al items are in "de-DE" or the version that you provide in the sc_lang parameter.
```graphql
{
  item(path: "/sitecore/content/Global/Components/Navigation/CarsMenu") {
    children {
      ... on CarMenu {
        title {
          value
        }
        category {
          targetItems {
            ... on CarMenuCategory {
              language {
                name
              }
              title {
                value
              }
            }
          }
        }
      }
    }
  }
}
```

[Reference - Stack Exchange answer by Jan Bluemink](https://sitecore.stackexchange.com/a/22776/4949)

---

## Specifying language in Layout Service calls

Refer to [Customizing route handling: Using the `querystringParams` option](/guides/code-patterns/routing#customizing-route-handling)