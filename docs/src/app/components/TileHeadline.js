import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const TileHeadline = ({ fields }) => (
  <div className="container mt-4 mb-4 mt-md-5 mb-md-5">
    <div className="tile-headline pt-5 pb-5 text-center">
      <Text field={fields.title} tag="h2" />
      <Text field={fields.subtitle} tag="h5" className="font-weight-normal" />
    </div>
  </div>
);

TileHeadline.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    text: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
  }),
};

export default TileHeadline;
