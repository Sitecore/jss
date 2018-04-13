import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { withPlaceholder } from '@sitecore-jss/sitecore-jss-react';
import { Grid, Row, Col } from 'react-bootstrap';
import { compose } from 'redux';

const About = ({
  style,
  rendering,
  pageHeaderPlaceholder,
  pageContentPlaceholder,
  ...otherProps
}) => (
  <section className="bg-primary" id="about" style={style}>
    <Grid>
      <Row>
        <Col lg={8} lgOffset={2} className="text-center">
          <div className="page-header">{pageHeaderPlaceholder}</div>
          <div className="page-content">{pageContentPlaceholder}</div>
        </Col>
      </Row>
    </Grid>
  </section>
);

About.propTypes = {
  style: PropTypes.object,
  loading: PropTypes.bool,
  rendering: PropTypes.object,
};

export default compose(
  commonComponent,
  withPlaceholder([
    { placeholder: 'page-header', prop: 'pageHeaderPlaceholder' },
    { placeholder: 'page-content', prop: 'pageContentPlaceholder' },
  ])
)(About);
