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

const placeholderComponent = (route: RouteData) => (
  <Placeholder name="<%- helper.getAppPrefix(appPrefix, appName) %>jss-main" rendering={route} />
);

const placeholder = (isEditing: boolean | undefined, route: RouteData) => {
  return isEditing ? (
    <SafeHydrate>{placeholderComponent(route)}</SafeHydrate>
  ) : (
    placeholderComponent(route)
  );
};

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
      <div className="container">{route && placeholder(pageEditing, route)}</div>
    </>
  );
};

export default Layout;
