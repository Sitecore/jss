import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import Heading from './Heading';

const FormContent = props => (
  <div style={props.style} className="dynamic-content">
    <Heading params={{ size: 2 }} fields={props.fields} />
    <span dangerouslySetInnerHTML={{ __html: props.fields.body.editable }} />
  </div>
);

FormContent.propTypes = {
  style: PropTypes.object,
  fields: PropTypes.shape({
    title: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    body: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
  }),
};

FormContent.styles = {};

export default commonComponent(FormContent);
