import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  getPublicUrl,
  LayoutServiceData,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Navigation from 'src/Navigation';
import Scripts from 'src/Scripts';
import { SitecorePageProps } from 'lib/page-props';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps extends Pick<SitecorePageProps, 'headLinks'> {
  layoutData: LayoutServiceData;
}

interface RouteFields {
  [key: string]: unknown;
  pageTitle: Field;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;

  const fields = route?.fields as RouteFields;

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields.pageTitle.value.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks?.map(url => (
          <link rel="stylesheet" key={url} href={url} />
        ))}
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
