import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import Header from './components/Header';
import Footer from './components/Footer';

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

const App = ({ routeData, route }) => (
  <div id="app-wrap">
    <Header />
    <Placeholder name="jssdocs-main" rendering={routeData} route={route} />
    <Footer />
  </div>
);

App.propTypes = {
  route: PropTypes.object,
};

export default App;
