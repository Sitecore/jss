---
name: dictionary-service
routeTemplate: ./data/component-templates/guide.yml
title: Dictionary & i18n
---

# Dictionary & i18n

## Recommendations
1. Remove unused dependencies

    For non-multi-language sites, remove any i18n scripts and initialization code (likely found in your main/app JavaScript file). Uninstall i18n npm packages from the app.

2. Explicitly specify the default language

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
