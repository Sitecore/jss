import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Layout } from 'antd';
import './styles.js';


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
