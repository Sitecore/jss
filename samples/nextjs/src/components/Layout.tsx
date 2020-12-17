import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from 'next-localization';
import { getPublicUrl } from 'lib/util';
import { Placeholder, RouteData, VisitorIdentification } from '@sitecore-jss/sitecore-jss-nextjs';

const LOGO_SIZE = { WIDTH: 221, HEIGHT: 48 };

// This is boilerplate navigation for sample purposes. Most apps should throw this away and use their own navigation implementation.
// Most apps may also wish to use GraphQL for their navigation construction; this sample does not simply to support disconnected mode.
const Navigation = () => {
  const { t } = useI18n();
  // Prefix next/link paths with a publicUrl to disable Next.js prefetching in the Sitecore Experience Editor.
  // If you're not supporting the Experience Editor, you can remove this.
  const publicUrl = getPublicUrl();

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link href={`${publicUrl}/`}>
          <a className="text-dark">
            <Image
              src="/sc_logo.svg"
              alt="Sitecore"
              width={LOGO_SIZE.WIDTH}
              height={LOGO_SIZE.HEIGHT}
            />
          </a>
        </Link>
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a
          className="p-2 text-dark"
          href="https://jss.sitecore.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Documentation')}
        </a>
        <Link href={`${publicUrl}/styleguide`}>
          <a className="p-2 text-dark">{t('Styleguide')}</a>
        </Link>
        <Link href={`${publicUrl}/graphql`}>
          <a className="p-2 text-dark">{t('GraphQL')}</a>
        </Link>
      </nav>
    </div>
  );
};

type LayoutProps = {
  route: RouteData;
};

const Layout = ({ route }: LayoutProps): JSX.Element => {
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
      <VisitorIdentification />

      <Navigation />

      {/* root placeholder for the app, which we add components to using route data */}
      <div className="container">
        <Placeholder name="jss-main" rendering={route} />
      </div>
    </>
  );
};

export default Layout;
