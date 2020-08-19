import React from 'react';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import Helmet from 'react-helmet';
import { Layout, Row, Col } from 'antd';

const ArticleContainer = ({ rendering, sitecoreContext }) => (
  <div className="main-wrapper">
    <Helmet>
      <title>{`${sitecoreContext.route.fields.title.value} | Sitecore JSS Documentation`}</title>
    </Helmet>
    <Layout className="border-bottom">
      <Placeholder name="jssdocs-jumbo" rendering={rendering} />
    </Layout>
    <Row
      gutter={40}
      justify="space-between"
      style={{flexWrap: 'nowrap', margin: 30}}
    >
      <Col flex="300px">
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
  </div>
);

export default withSitecoreContext()(ArticleContainer);
