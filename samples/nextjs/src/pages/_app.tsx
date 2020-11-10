import type { AppProps } from 'next/app';
import Router from 'next/router';
import { I18nProvider } from 'next-localization';
import NProgress from 'nprogress';

// Using bootstrap and nprogress are completely optional.
//  bootstrap is used here to provide a clean layout for samples, without needing extra CSS in the sample app
//  nprogress provides a loading indicator on page/route changes
// Remove these in package.json as well if removed here.
import 'bootstrap/dist/css/bootstrap.css';
import 'nprogress/nprogress.css';
import '../assets/app.css';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }: AppProps) {
  const { dictionary, ...rest } = pageProps;

  return (
    // Will be doing further evaluation on best i18n library to use for dictionary translation with Next.js.
    // 'i18next' and 'react-i18next' seem heavy-handed, 'next-localization' (used here) is promising ...
    <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
      <Component {...rest} />
    </I18nProvider>
  );
}

export default App;
