export default defineI18nConfig(() => ({
  legacy: false,
  strategy: 'prefix_except_default',
  defaultLocale: 'en',
  locales: ['en', 'da-DK'],
}));
