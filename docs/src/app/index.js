import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Layout } from 'antd';
import './styles.js';
const { Header, Footer } = Layout;

const App = ({ routeData }) => (
  <Layout id="app-wrap">
    <Header>
      <Placeholder name="jssdocs-header" rendering={routeData} />
    </Header>
    <Placeholder name="jssdocs-main" rendering={routeData} />
    <Footer>
      <Placeholder name="jssdocs-footer" rendering={routeData} />
    </Footer>
  </Layout>
);

App.propTypes = {
  routeData: PropTypes.object,
};

export default App;
