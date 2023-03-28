import React from 'react';
import { LayoutServiceData, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import Navigation from './Navigation';
import Placeholder from 'components/Placeholder';

import 'bootstrap/dist/css/bootstrap.css';
import 'nprogress/nprogress.css';
import 'assets/app.css';

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData?.sitecore;

  return (
    <>
      <Navigation />
      {/* root placeholder for the app, which we add components to using route data */}
      <div className="container">
        {route && <Placeholder name="NextjsApp-jss-main" rendering={route} />}
      </div>
    </>
  );
};

export default Layout;
