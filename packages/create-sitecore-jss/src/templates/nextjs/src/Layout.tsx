import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  getPublicUrl,
  LayoutServiceData,
  RouteData,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Navigation from 'src/Navigation';
import Scripts from 'src/Scripts';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = getPublicUrl();
import SafeHydrate from 'components/SafeHydrate';

interface LayoutProps {
  layoutData: LayoutServiceData;
}

interface RouteFields {
  [key: string]: unknown;
  pageTitle: Field;
}

const placeholder = (route: RouteData) => (
  <Placeholder name="<%- helper.getAppPrefix(appPrefix, appName) %>jss-main" rendering={route} />
);

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const { pageEditing } = layoutData.sitecore.context;
  const fields = route?.fields as RouteFields;

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields.pageTitle.value.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      </Head>

      <Navigation />
      {/* root placeholder for the app, which we add components to using route data */}
      <div className="container">
        {route &&
          (pageEditing ? (
            // SafeHydrate is a workaround for Next.js issue (after react 18 upgrade) with hydration on the server.
            // by dynamically importing the problematic component with no SSR would fix the hydration issue.
            <SafeHydrate>{placeholder(route)}</SafeHydrate>
          ) : (
            placeholder(route)
          ))}
      </div>
    </>
  );
};

export default Layout;
