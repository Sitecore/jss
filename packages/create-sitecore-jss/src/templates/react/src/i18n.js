import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { dictionaryServiceFactory } from './lib/dictionary-service-factory';

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
        escapeValue: false, // not needed for react
      },
    };

    if (dictionary) {
      // if we got dictionary passed, that means we're in a SSR context with a server-provided dictionary
      // so we do not want a backend, because we already know all possible keys

      if (!i18n.isInitialized) {
        i18n.use(initReactI18next).init(options, (error) => {
          if (error) reject(error);

          i18n.addResourceBundle(language, 'translation', dictionary, true, true);

          resolve();
        });
      } else {
        i18n.changeLanguage(language).then(() => {
          i18n.addResourceBundle(language, 'translation', dictionary, true, true);

          resolve();
        });
      }
    } else {
      // We're running client-side, so we get translation data from the Sitecore dictionary API using fetch backend
      // For higher performance (but less simplicity), consider adding the i18n chained backend to a local cache option like the local storage backend.

      // instantiate the dictionary service.
      const dictionaryServiceInstance = dictionaryServiceFactory.create();

      i18n
        .use({
          type: 'backend',
          read(language, _namespace, callback) {
            dictionaryServiceInstance
              .fetchDictionaryData(language)
              .then((phrases) => {
                callback(null, phrases);
              })
              .catch((err) => callback(err, false));
          },
        })
        .use(initReactI18next)
        .init(options, (error) => {
          if (error) reject(error);

          resolve();
        });
    }
  });
}
