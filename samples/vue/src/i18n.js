import 'cross-fetch/polyfill';
import { createI18n } from 'vue-i18n';
import config from './temp/config';

/**
 * Fetch dictionary data using specified language
 * @param {string} language
 * @returns dictionary
 */
export const fetchDictionary = (language) => {
  const dictionaryServicePath = `${config.sitecoreApiHost}/sitecore/api/jss/dictionary/${config.jssAppName}/${language}?sc_apikey=${config.sitecoreApiKey}`;

  return fetch(dictionaryServicePath)
    .then((res) => res.json())
    .then((data) => data.phrases);
};

/**
 * Initializes the vue-i18n library to provide a translation dictionary to the app.
 * If your app is not multilingual, this file and references to it can be removed.
 * Elsewhere in the app to use the dictionary `{{ $t('styleguide-sample') }}`
 * If you want to use translation inside the function use:
 * ```
 * import { useI18n } from 'vue-i18n';
 * const { t } = useI18n();
 * const text = t('page-not-found');
 * ```
 * @param {string} language Optional, the initial language. Only used for SSR; otherwise language set in RouteHandler.
 * @param {*} dictionary Optional, the dictionary to load. Only used for SSR; otherwise, the dictionary is loaded via JSS dictionary service.
 */
export default function i18nInit(language, dictionary) {
  return new Promise((resolve) => {
    // We are in SSR, dictionary is preloaded. Iniitialize it
    if (dictionary) {
      const i18n = createI18n({
        fallbackLocale: false,
        messages: dictionary,
        locale: language,
      });

      resolve(i18n);
    } else {
      fetchDictionary(language).then((phrases) => {
        resolve(
          createI18n({
            fallbackLocale: false,
            messages: {
              [language]: phrases,
            },
            locale: language,
          })
        );
      });
    }
  });
}
