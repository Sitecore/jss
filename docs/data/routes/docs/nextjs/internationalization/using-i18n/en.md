---
name: using-i18n
routeTemplate: ./data/component-templates/article.yml
title: Using Next.js i18n
---
# Using Next.js i18n with JSS

Next.js provides a way to use [Internationalized Routing](https://nextjs.org/docs/advanced-features/i18n-routing).
The sample app is using [Sub-path Routing](https://nextjs.org/docs/advanced-features/i18n-routing#sub-path-routing).
Let's dive into details on how the sample app enables `i18n`.

> `jss export` doesn't support multilingual apps, in this case you should disable localization. Refer to [page](/docs/nextjs/deploying-to-production/export).

### Initialization

The file `next.config.js` contains definitions for `locales` and `defaultLocale`:
* `locales` are all the locales you want to support in your application and should generally match (at least be a subset of) those in Sitecore.
* `defaultLocale` is the locale used when visiting a non-locale prefixed path, such as `/styleguide`.

```js
i18n: {
	locales: ['en', 'da-DK'],
	defaultLocale: packageConfig.language,
}
```

To enable localization, the sample app uses the [next-localization](https://github.com/StarpTech/next-localization) library.

> NOTE: If your app is not multilingual, you can remove `next-localization` and references to it.

In `src/pages/_app.tsx`, the `App` initializes using `I18nProvider` with the properties:
* `pageProps.locale` - provided by nextjs.
* `dictionary` - fetched from dictionary service.

The `DictionaryService` fetches translations in `src/lib/page-props-factory.ts`.

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

If you have dynamic pages, you should return the `locale` field in [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation). Read more about [Dynamic getStaticProps Pages](https://nextjs.org/docs/advanced-features/i18n-routing#dynamic-getstaticprops-pages).
By default, `SitecoreSitemapFetcher` handles this case.

### Translation

To use translation, you need to leverage the `useI18n` hook:
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

To transition between locales, you can use `Link` or `useRouter`. Read more about it [here](https://nextjs.org/docs/advanced-features/i18n-routing#transition-between-locales).

Look at the component [Styleguide-Multilingual](https://github.com/Sitecore/jss/blob/master/samples/nextjs/src/components/styleguide/Styleguide-Multilingual.tsx) for an example of using `next-localization`.
