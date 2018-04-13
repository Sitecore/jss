import React from 'react';
import PropTypes from 'prop-types';

const SampleButton = (props) => (
  <button style={props.style}>{props.dataSource.Text.editable}</button>
);

SampleButton.propTypes = {
  style: PropTypes.object,
  dataSource: PropTypes.object,
};

SampleButton.styles = {};

export default SampleButton;
