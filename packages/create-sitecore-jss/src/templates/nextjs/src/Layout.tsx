import React from 'react';
import Head from 'next/head';
import { Placeholder, getPublicUrl, LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';
import Navigation from 'src/Navigation';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;

  return (
    <>
      <Head>
        <title>{route?.fields?.pageTitle?.value || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      </Head>

      <Navigation />
      {/* root placeholder for the app, which we add components to using route data */}
      <div className="container">
        {route && (
          <Placeholder
            name="<%- helper.getAppPrefix(appPrefix, appName) %>jss-main"
            rendering={route}
          />
        )}
      </div>
    </>
  );
};

export default Layout;
