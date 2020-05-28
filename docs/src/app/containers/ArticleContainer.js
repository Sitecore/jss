import React from 'react';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import Helmet from 'react-helmet';
import SideNav from '../components/Navigation/SideNav';
import { Layout, Row, Col } from 'antd';

const ArticleContainer = ({ fields, rendering, sitecoreContext }) => (
  <React.Fragment>
    <Helmet>
      <title>{`${sitecoreContext.route.fields.title.value} | Sitecore JSS Documentation`}</title>
    </Helmet>
    <Layout className="border-bottom">
      <Placeholder name="jssdocs-jumbo" rendering={rendering} />
    </Layout>
    <Row gutter={[40, 40]} justify="space-between" style={{margin: 0}}>
      <Col flex="250px">
        <aside>
          <Placeholder name="jssdocs-aside" rendering={rendering} />
        </aside>
      </Col>
      <Col flex="auto">
        <main>
          <Placeholder name="jssdocs-content" rendering={rendering} />
        </main>
      </Col>
    </Row>
  </React.Fragment>
);

export default withSitecoreContext()(ArticleContainer);
