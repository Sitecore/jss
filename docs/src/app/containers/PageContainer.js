import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import Helmet from 'react-helmet';

const PageContainer = ({ fields, rendering, sitecoreContext }) => (
  <div className="main-wrapper">
    <Helmet>
      <title>{`${sitecoreContext.route.fields.title.value} | Sitecore JSS Documentation`}</title>
    </Helmet>
    <Placeholder name="jssdocs-jumbo" rendering={rendering} />
    <Placeholder name="jssdocs-hero" rendering={rendering} />
    <Placeholder name="jssdocs-tiles-headline" rendering={rendering} />
    <div className="container mt-4 mb-4 mt-md-5 mb-md-5">
      <div className="row">
        <main className="col-12 pb-5 main-content">
          <Placeholder name="jssdocs-content" rendering={rendering} />
        </main>
      </div>
    </div>
    <div className="container">
      <Placeholder name="jssdocs-banner" rendering={rendering} />
    </div>
  </div>
);

export default withSitecoreContext()(PageContainer);
