import i18n from 'i18next';
import fetch from 'i18next-fetch-backend';
import { DEFAULT_LANGUAGE } from './constants';
import { parseRouteUrl } from './sitecoreRoutes';

const resolveLanguage = (currentPath, serverData) => {
  let lang = DEFAULT_LANGUAGE;
  if (serverData && serverData.language) {
    //use initial language from Sitecore -- might be cookie-based
    lang = serverData.language;
  }
  const routeParams = parseRouteUrl(currentPath);
  if (routeParams && routeParams.lang) {
    lang = routeParams.lang;
  }
  return lang;
}

const i18nInit = (language, isClient, dictionary) => {
  var options = {
    debug: true,
    lng: language,
    fallbackLng: false, //fallback to keys
    load: 'currentOnly', //e.g. don't load 'es' when requesting 'es-mx' -- Sitecore config should handle this

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    react: {
      wait: false, // setting to true breaks SSR and Experience Editor, would be nice to conditionally set to "true"
      nsMode: 'default' // set it to fallback to let passed namespaces to translated hoc act as fallbacks
    },

  };

  if (isClient) {
    options.backend = {
      loadPath: __SC_API_HOST__ + __TRANSLATION_PATH__, //webpack substitutes based on local dev or prod/integrated JSS service
      parse: (data) => {
        data = JSON.parse(data);
        if (data.phrases) {
          return data.phrases;
        }
        return data;
      }
    };
    i18n.use(fetch).init(options);
    if (dictionary) {
      //when using a back-end, need to add static resources after init
      i18n.addResources(language, 'translation', dictionary);
    }
  } else {
    if (dictionary) {
      //load dictionary statically from server
      options.resources = {};
      options.resources[language] = {
        translation: dictionary 
      }
    }
    i18n.init(options);
  }
}

export { i18n, resolveLanguage, i18nInit };