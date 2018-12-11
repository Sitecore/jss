import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import Helmet from 'react-helmet';

const TwocolContainer = ({ fields, rendering, sitecoreContext }) => (
  <div className="main-wrapper">
    <Helmet>
      <title>{`${sitecoreContext.route.fields.title.value} | Sitecore JSS Documentation`}</title>
    </Helmet>
    <Placeholder name="jssdocs-jumbo" rendering={rendering} />
    <div className="container">
      <div className="row">
        <main className="col-md-8 pt-4 pb-4 pt-md-5 pb-md-5 pr-lg-5 left-col main-content features-page">
          <Placeholder name="jssdocs-content" rendering={rendering} />
        </main>
        <aside className="col-md-4 pt-4 pb-4 pt-md-5 pb-md-5 pl-lg-5 border-top right-col">
          <Placeholder name="jssdocs-content-right" rendering={rendering} />
        </aside>
      </div>
    </div>
  </div>
);

export default withSitecoreContext()(TwocolContainer);
