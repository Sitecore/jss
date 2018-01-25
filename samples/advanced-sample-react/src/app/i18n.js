import i18n from 'i18next';

import { DEFAULT_LANGUAGE } from './constants';
import { parseRouteUrl } from './sitecoreRoutes';
import DataProvider from '../dataProvider';

const resolveCurrentRoute = (currentPath, serverData) => {
  let lang = DEFAULT_LANGUAGE;
  let route = '/';
  if (serverData && serverData.language) {
    // use initial language from Sitecore -- might be cookie-based
    lang = serverData.language;
  }
  const routeParams = parseRouteUrl(currentPath);
  if (routeParams && routeParams.lang) {
    lang = routeParams.lang;
  }
  if (routeParams && routeParams.sitecoreRoute) {
    route = routeParams.sitecoreRoute;
  }
  return {
    currentLang: lang,
    currentRoute: route
  };
}

const i18nInit = (language, isClient, dictionary) => {
  const options = {
    debug: true,
    lng: language,
    fallbackLng: false, // fallback to keys
    load: 'currentOnly', // e.g. don't load 'es' when requesting 'es-mx' -- Sitecore config should handle this

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    react: {
      wait: false, // setting to true breaks SSR and Experience Editor, would be nice to conditionally set to "true"
      nsMode: 'default', // set it to fallback to let passed namespaces to translated hoc act as fallbacks
    },

  };

  if (isClient) {
    DataProvider.configurei18Next(i18n, options);
    if (dictionary) {
      // when using a back-end, need to add static resources after init
      i18n.addResources(language, 'translation', dictionary);
    }
  } else {
    if (dictionary) {
      // load dictionary statically from server
      options.resources = {};
      options.resources[language] = {
        translation: dictionary,
      };
    }

    i18n.init(options);
  }
};

export { i18n, resolveCurrentRoute, i18nInit };
