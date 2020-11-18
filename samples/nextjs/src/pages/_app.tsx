import type { AppProps } from 'next/app';
import Router from 'next/router';
import { ApolloProvider } from 'react-apollo';
import { I18nProvider } from 'next-localization';
import NProgress from 'nprogress';

// Using bootstrap and nprogress are completely optional.
//  bootstrap is used here to provide a clean layout for samples, without needing extra CSS in the sample app
//  nprogress provides a loading indicator on page/route changes
// Remove these in package.json as well if removed here.
import 'bootstrap/dist/css/bootstrap.css';
import 'nprogress/nprogress.css';
import 'assets/app.css';
import { useApollo } from 'lib/GraphQLClientFactory';
import config from 'temp/config';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }: AppProps): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  const apolloClient = useApollo({ endpoint: config.graphQLEndpoint });

  return (
    // Will be doing further evaluation on best i18n library to use for dictionary translation with Next.js.
    // 'i18next' and 'react-i18next' seem heavy-handed, 'next-localization' (used here) is promising ...
    <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
      <ApolloProvider client={apolloClient}>
        <Component {...rest} />
      </ApolloProvider>
    </I18nProvider>
  );
}

export default App;
