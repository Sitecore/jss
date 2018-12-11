import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image } from '@sitecore-jss/sitecore-jss-react';
import RouteLinkedRichText from './RouteLinkedRichText';

const TileWithButton = ({ fields }) => (
  <div className="tile-with-button mb-5">
    <Text field={fields.title} tag="h3" className="mb-4" />
    <RouteLinkedRichText field={fields.text} tag="p" />
    <a className="btn btn-primary btn-lg mt-2" href={fields.linkUrl.value}>
      {fields.linkText.value}
    </a>
  </div>
);

TileWithButton.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    text: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    linkUrl: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    linkText: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
  }),
};

export default TileWithButton;
