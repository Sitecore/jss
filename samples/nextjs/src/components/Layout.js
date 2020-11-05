import Head from 'next/head';
import Link from 'next/link';
import { useI18n } from 'next-localization';
import { Placeholder, withSitecoreContext, VisitorIdentification } from '@sitecore-jss/sitecore-jss-nextjs';

// This is boilerplate navigation for sample purposes. Most apps should throw this away and use their own navigation implementation.
// Most apps may also wish to use GraphQL for their navigation construction; this sample does not simply to support disconnected mode.
const Navigation = () => {
  const i18n = useI18n();

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <a className="text-dark" href="/"><img src="/sc_logo.svg" alt="Sitecore" /></a>
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a
          className="p-2 text-dark"
          href="https://jss.sitecore.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          {i18n.t('Documentation')}
        </a>
        <Link href="/styleguide">
          <a className="p-2 text-dark">{i18n.t('Styleguide')}</a>
        </Link>
        <Link href="/graphql">
          <a className="p-2 text-dark">{i18n.t('GraphQL')}</a>
        </Link>
      </nav>
    </div>
  );
};

const Layout = ({ route, sitecoreContext }) => {

  return (
    <>
      <Head>
        <title>
          {(route.fields && route.fields.pageTitle && route.fields.pageTitle.value) || 'Page'}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.

        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
      {!sitecoreContext.pageEditing && <VisitorIdentification />}

      <Navigation />

      {/* root placeholder for the app, which we add components to using route data */}
      <div className="container">
        <Placeholder name="jss-main" rendering={route} />
      </div>
    </>
  );
};

export default withSitecoreContext()(Layout);