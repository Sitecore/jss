import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import Footer from 'components/Footer';
import { Layout } from 'antd';
import './styles.js';
const Header = Layout.Header;

const App = ({ routeData }) => (
  <Layout>
    <Header>
      <Placeholder name="jssdocs-header" rendering={routeData} />
    </Header>
    <Placeholder name="jssdocs-main" rendering={routeData} />
    <Footer />
  </Layout>
);

App.propTypes = {
  routeData: PropTypes.object,
};

export default App;
