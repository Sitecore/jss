import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// import 'assets/main.scss';

const DynamicStyles = dynamic(
  ({ projectName }: {projectName: string}) => import(`../assets/projects/${projectName}/main.scss`),
  { ssr: false }
);

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, site, ...rest } = pageProps;
  const projectName = site?.project;

  // Solution-1 import css files dynamically based on the project name
  useEffect(() => {
    DynamicStyles(projectName);
  }, [projectName]);

  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // Note Next.js does not (currently) provide anything for translation, only i18n routing.
    // If your app is not multilingual, next-localization and references to it can be removed.
    <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
      <Component {...rest} />
    </I18nProvider>
  );
}

export default App;

// function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
//   const { dictionary, site, ...rest } = pageProps;
//   const projectName = site?.project;

// Solution-2 import css files dynamically based on the project name
// useEffect(() => {
//   (async () => {
//     await import(`../assets/projects/${projectName}/main.scss`);
//     // : await import(`assets/main.scss`);
//   })();
// }, [projectName]);

//   return (
//     // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
//     // Note Next.js does not (currently) provide anything for translation, only i18n routing.
//     // If your app is not multilingual, next-localization and references to it can be removed.
//     <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
//       <Component {...rest} />
//     </I18nProvider>
//   );
// }

// export default App;
