import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Grid, Row, Col } from 'react-bootstrap';

const Services = ({ style, rendering, ...otherProps }) => (
  <section id="services" style={style}>
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

Services.propTypes = {
  style: PropTypes.object,
  rendering: PropTypes.object,
};

Services.styles = {};

export default commonComponent(Services);
