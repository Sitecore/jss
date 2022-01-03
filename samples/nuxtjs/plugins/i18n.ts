import { defineNuxtPlugin } from '#app';
import { createI18n } from 'vue-i18n';
import config from '../temp/config';
import { dictionaryServiceFactory } from '../lib/dictionary-service-factory';

function i18nInit(language, dictionary = null): Promise<any> {
  return new Promise((resolve) => {
    // We are in SSR, dictionary is preloaded. Iniitialize it
    if (dictionary) {
      const i18n = createI18n({
        fallbackLocale: false,
        messages: {
          [language]: dictionary,
        },
        locale: language,
      });

      resolve(i18n);
    } else {
      // initialize an instance of the dictionary service
      const dictionaryServiceInstance = dictionaryServiceFactory.create();

      dictionaryServiceInstance.fetchDictionaryData(language).then((phrases) => {
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

const IS_ASSET_URL = /^\/.*\..*$/g;

export const extractLocaleFromUrl = (url) => {
  if (url === '/') return config.defaultLanguage;

  const result = url.match(/^\/([a-z]{2}-[A-Z]{2}|[a-z]{2})$|([a-z]{2}-[A-Z]{2}|[a-z]{2})\//g);

  return result ? result[0].replaceAll(/\//g, '') : config.defaultLanguage;
};

export default defineNuxtPlugin(async (nuxtApp) => {
  let language = nuxtApp.payload.state.language || 'en';

  if (nuxtApp.ssrContext) {
    if (nuxtApp.ssrContext.req.originalUrl.match(IS_ASSET_URL)) {
      return;
    }


    language = extractLocaleFromUrl(nuxtApp.ssrContext.req.originalUrl);

    debugger;

    if (language) {
      nuxtApp.payload.state.language = language;
    }
  }

  const i18n = await i18nInit(language);
  nuxtApp.vueApp.use(i18n);
});
