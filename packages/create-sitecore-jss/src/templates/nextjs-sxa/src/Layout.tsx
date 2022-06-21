/**
 * This Layout needs for SXA example.
 */
import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  VisitorIdentification,
  getPublicUrl,
  LayoutServiceData,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;

  return (
    <>
      <Head>
        <title>{fields?.Title?.value.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      </Head>

      {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.

        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
      <VisitorIdentification />

      {/* root placeholder for the app, which we add components to using route data */}
      <div id="wrapper">
        <header>
          <div id="header" className="container">
            <div className="row">
              {route && <Placeholder name="headless-header" rendering={route} />}
            </div>
          </div>
        </header>
        <main>
          <div id="content" className="container">
            <div className="row">
              {route && <Placeholder name="headless-main" rendering={route} />}
            </div>
          </div>
        </main>
        <footer>
          <div id="footer" className="container">
            <div className="row">
              {route && <Placeholder name="headless-footer" rendering={route} />}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
