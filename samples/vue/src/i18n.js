import i18n from 'i18next';
import 'cross-fetch/polyfill';
import fetchBackend from 'i18next-fetch-backend';
import Vue from 'vue';
import VueI18n from '@panter/vue-i18next';
import config from './temp/config';

Vue.use(VueI18n);

// SSR i18n instance
let serverI18n = undefined;

/**
 * Initializes the i18next library to provide a translation dictionary to the app.
 * If your app is not multilingual, this file and references to it can be removed.
 * Elsewhere in the app to use the dictionary `import { t } from 'i18next'; ... t('key')`
 * @param {string} language Optional, the initial language. Only used for SSR; otherwise language set in RouteHandler.
 * @param {*} dictionary Optional, the dictionary to load. Only used for SSR; otherwise, the dictionary is loaded via JSS dictionary service.
 */
export default function i18nInit(language, dictionary) {
  return new Promise((resolve, reject) => {
    const options = {
      debug: false,
      lng: language,
      fallbackLng: false, // fallback to keys
      load: 'currentOnly', // e.g. don't load 'es' when requesting 'es-MX' -- Sitecore config should handle this
      useCookie: false, // using URLs and Sitecore to store language context, don't need a cookie

      interpolation: {
        escapeValue: false, // not needed for Vue
      },
    };

    if (dictionary) {
      // if we got dictionary passed, that means we're in a SSR context with a server-provided dictionary
      // so we do not want a backend, because we already know all possible keys

      const appendResource = () =>
        i18n.addResourceBundle(language, 'translation', dictionary, true, true);

      if (!i18n.isInitialized) {
        i18n.init(options, (error) => {
          if (error) reject(error);

          appendResource();

          serverI18n = new VueI18n(i18n);

          resolve(serverI18n);
        });
      } else {
        const resolveInstance = () => {
          appendResource();
          resolve(serverI18n);
        };

        if (i18n.language === language) {
          return resolveInstance();
        }

        i18n.changeLanguage(language).then(resolveInstance);
      }
    } else {
      // We're running client-side, so we get translation data from the Sitecore dictionary API using fetch backend
      // For higher performance (but less simplicity), consider adding the i18n chained backend to a local cache option like the local storage backend.

      // prettier-ignore
      const dictionaryServicePath = `${config.sitecoreApiHost}/sitecore/api/jss/dictionary/${config.jssAppName}/{{lng}}?sc_apikey=${config.sitecoreApiKey}`;

      options.backend = {
        loadPath: dictionaryServicePath,
        parse: (data) => {
          const parsedData = JSON.parse(data);
          if (parsedData.phrases) {
            return parsedData.phrases;
          }
          return parsedData;
        },
      };

      i18n.use(fetchBackend).init(options, (error) => {
        if (error) reject(error);

        resolve(new VueI18n(i18n));
      });
    }
  });
}
