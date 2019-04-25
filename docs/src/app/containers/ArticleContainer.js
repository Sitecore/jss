import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import Helmet from 'react-helmet';
import SideNav from '../components/SideNav';

const ArticleContainer = ({ fields, rendering, sitecoreContext }) => (
  <div className="main-wrapper">
    <Helmet>
      <title>{`${sitecoreContext.route.fields.title.value} | Sitecore JSS Documentation`}</title>
    </Helmet>
    <div className="border-bottom">
      <Placeholder name="jssdocs-jumbo" rendering={rendering} />
    </div>
    <div className="container">
      <div className="row">
        <main className="col-md-8 pt-4 pb-4 pt-md-5 pb-md-5 pl-md-5 border-left border-top right-col">
          <Placeholder name="jssdocs-content" rendering={rendering} />
        </main>
        <aside className="col-md-4 pt-4 pb-4 pt-md-5 pb-md-5 pr-lg-5 left-col order-last order-md-first">
          <SideNav navkey={(fields.sidenav) ? fields.sidenav.value : "docs"}/>
        </aside>
      </div>
    </div>
  </div>
);

ArticleContainer.propTypes = {
  fields: PropTypes.shape({
    sidenav: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string
    })
  }),


};

export default withSitecoreContext()(ArticleContainer);
