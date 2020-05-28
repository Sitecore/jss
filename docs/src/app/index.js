import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Layout } from 'antd';

import '../../assets/css/bootstrap.css';
import '../../assets/css/styles.css';
import '../../assets/css/header.css';
import '../../assets/css/hero.css';
import '../../assets/css/footer.css';
import '../../assets/css/jumbo.css';
import '../../assets/css/jss-docs.css';
import '../../assets/css/highlight-style-github.css';
import '../../assets/css/sidenav.css';
import '../../assets/css/sectiongrid.css';
import '../../assets/css/theme.css';

const App = ({ routeData, route }) => (
  <Layout>
    <Header routeData={routeData} route={route} />
    <Placeholder name="jssdocs-main" rendering={routeData} route={route} />
    <Footer />
  </Layout>
);

App.propTypes = {
  route: PropTypes.object,
  routeData: PropTypes.object,
};

export default App;
