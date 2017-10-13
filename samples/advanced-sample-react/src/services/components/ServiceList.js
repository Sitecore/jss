import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Grid, Row, Col } from 'react-bootstrap';

const ServiceList = props => (
  <Grid style={props.style}>
    <Row>
      {
        props.fields.items && props.fields.items.map((item, index) => (
          <Col lg={3} md={6} className="text-center" key={`item${index}`}>
            <div className="service-box">
              <i className="fa fa-4x fa-diamond text-primary sr-icons" />
              <h3 dangerouslySetInnerHTML={{ __html: item.fields.title.editable }} />
              <p className="text-muted" dangerouslySetInnerHTML={{ __html: item.fields.description.editable }} />
            </div>
          </Col>
        ))
      }
    </Row>
  </Grid>
);

ServiceList.propTypes = {
  style: PropTypes.object,
  fields: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.shape({
          value: PropTypes.string,
          editable: PropTypes.string,
        }),
        description: PropTypes.shape({
          value: PropTypes.string,
          editable: PropTypes.string,
        }),
      }),
    })),
  }),
};

ServiceList.styles = {};

export default commonComponent(ServiceList);
