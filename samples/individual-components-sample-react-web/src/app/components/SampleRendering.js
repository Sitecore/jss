import React from 'react';
import PropTypes from 'prop-types';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';

const SampleRendering = ({ dataSource, copyright }) => (
  <React.Fragment>
    <Text tag="h1" className="contentTitle" field={dataSource.Title} />
    <RichText className="contentDescription" field={dataSource.Text} />
  </React.Fragment>
);

SampleRendering.propTypes = {
  dataSource: PropTypes.shape({
    Title: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    Text: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
  }),
};

export default SampleRendering;
