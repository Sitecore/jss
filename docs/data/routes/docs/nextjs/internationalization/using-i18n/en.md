---
name: using-i18n
routeTemplate: ./data/component-templates/article.yml
title: Using Next.js i18n
---
# Using Next.js i18n with JSS

Next.js provides a way to use [Internationalized Routing](https://nextjs.org/docs/advanced-features/i18n-routing).
The sample app is using [Sub-path Routing](https://nextjs.org/docs/advanced-features/i18n-routing#sub-path-routing).
Let's dive in details how sample app is configured to enable `i18n`.

> `jss export` doesn't support multilingual apps, in this case you should disable localization. Refer to [page](/docs/nextjs/deploying-to-production/export).

### Initialization

In `next.config.js` we have defined `locales` and `defaultLocale`:
* `locales` - These are all the locales you want to support in your application. These should generally match (or at least be a subset of) those in Sitecore.
* `defaultLocale` - This is the locale that will be used when visiting a non-locale prefixed path e.g. `/styleguide`.

```js
i18n: {
	locales: ['en', 'da-DK'],
	defaultLocale: packageConfig.language,
}
```

In order to enable localization we are using [next-localization](https://github.com/StarpTech/next-localization) library.

> NOTE: If your app is not multilingual, `next-localization` and references to it can be removed.

In `src/pages/_app.tsx` we should initialize it using `I18nProvider`:
* `pageProps.locale` - provided by nextjs.
* `dictionary` - fetched from dictionary service.

Translations fetched in `src/lib/page-props-factory.ts` using `DictionaryService`.

```tsx
function App({ Component, pageProps }: AppProps): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
      <Component {...rest} />
    </I18nProvider>
  );
}
```

Read more about [accessing locale information](https://nextjs.org/docs/advanced-features/i18n-routing#accessing-the-locale-information).

In case if you have dynamic pages you should return `locale` field in [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation). Read more about it [here](https://nextjs.org/docs/advanced-features/i18n-routing#dynamic-getstaticprops-pages).
By default `SitecoreSitemapFetcher` handles this case.

### Translation

In order to use translation you need to use `useI18n` hook:
* `t` - translation function.
* `locale` - current language.

```tsx
import { useI18n } from 'next-localization';

const MultilingualComponent = (): JSX.Element => {
  const { t, locale } = useI18n();

  return (
    <div>
      <p>Translated text: {t('custom-key')}</p>
      <p>The current language is: {locale()}</p>
    </div>
  );
};

export default MultilingualComponent;
```

In order to do transition between locales you can use `Link` or `useRouter`, read more about it [here](https://nextjs.org/docs/advanced-features/i18n-routing#transition-between-locales).

You can look at our example component [Styleguide-Multilingual](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/styleguide/Styleguide-Multilingual.tsx) which shows `next-localization` in use.
