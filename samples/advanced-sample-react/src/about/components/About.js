import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Grid, Row, Col } from 'react-bootstrap';

const About = ({ style, rendering, ...otherProps }) => (
  <section className="bg-primary" id="about" style={style}>
    <Grid>
      <Row>
        <Col lg={8} lgOffset={2} className="text-center">
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

About.propTypes = {
  style: PropTypes.object,
  loading: PropTypes.bool,
  rendering: PropTypes.object,
};

export default commonComponent(About);
