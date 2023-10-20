import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  LayoutServiceData,
  Field,
  HTMLLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import Navigation from 'src/Navigation';
import Scripts from 'src/Scripts';
// The bundle imports external (BYOC) components into the app. <FEAAS.ExternalComponentBundle /> below will ensure they are ready to be used.
import 'src/byoc';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
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
      <FEAAS.ExternalComponentBundle />
      <Head>
        <title>{fields.pageTitle.value.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map(headLink => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
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
