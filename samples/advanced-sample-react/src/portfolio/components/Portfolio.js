import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Grid, Row, Col } from 'react-bootstrap';

const Portfolio = ({ style, rendering, ...otherProps }) => (
  <section id="portfolio" className="bg-primary" style={style}>
    <Grid>
      <Row>
        <Col lg={12} className="text-center">
          <div className="page-header">
            <Placeholder name="page-header" rendering={rendering} {...otherProps} />
          </div>
          <div className="page-content">
            <Placeholder name="page-content" rendering={rendering} {...otherProps} />
          </div>
        </Col>
      </Row>
    </Grid>
  </section>
);

Portfolio.propTypes = {
  style: PropTypes.object,
  loading: PropTypes.bool,
  rendering: PropTypes.object,
};

Portfolio.styles = {};

export default commonComponent(Portfolio);
