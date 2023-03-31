export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'da-DK'],
};

export type Locale = (typeof i18n)['locales'][number];
