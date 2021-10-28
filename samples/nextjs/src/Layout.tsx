import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import deepEqual from 'deep-equal';
import { useI18n } from 'next-localization';
import {
  Placeholder,
  VisitorIdentification,
  withSitecoreContext,
  getPublicUrl,
  SitecoreContextValue,
} from '@sitecore-jss/sitecore-jss-nextjs';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

// This is boilerplate navigation for sample purposes. Most apps should throw this away and use their own navigation implementation.
// Most apps may also wish to use GraphQL for their navigation construction; this sample does not simply to support disconnected mode.
const Navigation = () => {
  const { t } = useI18n();

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link href="/">
          <a className="text-dark">
            <img src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" />
          </a>
        </Link>
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a
          className="p-2 text-dark"
          href="https://jss.sitecore.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Documentation')}
        </a>
        {/* #START_EMPTY */}
        <Link href="/styleguide">
          <a className="p-2 text-dark">{t('Styleguide')}</a>
        </Link>
        <Link href="/graphql">
          <a className="p-2 text-dark">{t('GraphQL')}</a>
        </Link>
        {/* #END_EMPTY */}
      </nav>
    </div>
  );
};

interface LayoutProps {
  sitecoreContext: SitecoreContextValue;
}

const Layout = ({ sitecoreContext: { route } }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{route?.fields?.pageTitle?.value || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      </Head>

      {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.

        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
      <VisitorIdentification />

      <Navigation />
      {/* root placeholder for the app, which we add components to using route data */}
      <div className="container">
        {route && <Placeholder name="JssNextWeb-jss-main" rendering={route} />}
      </div>
    </>
  );
};

// If you use:
// * SSG mode - it's required to use `React.memo`, Nextjs renders app twice on initial load and we don't need to render <Layout /> twice.
// * SSR mode - you can remove `React.memo`, Nextjs renders app once.
// Read more https://nextjs.org/docs/advanced-features/automatic-static-optimization#how-it-works
const propsAreEqual = (prevProps: LayoutProps, nextProps: LayoutProps) => {
  if (deepEqual(prevProps.sitecoreContext.route, nextProps.sitecoreContext.route)) return true;

  return false;
};

export default withSitecoreContext()(React.memo(Layout, propsAreEqual));
