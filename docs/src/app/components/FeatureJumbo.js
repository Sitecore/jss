import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text } from '@sitecore-jss/sitecore-jss-react';
import RouteLinkedRichText from './RouteLinkedRichText';
import { Link } from 'react-router-dom';

const FeatureJumbo = ({ fields }) => (
  <div class="jumbotron jumbotron-fluid" style={{ maxHeight: '400px' }}>
    <div class="bgPattern"></div>
    <div class="container">
      <div>
        <Text field={fields.subtitle} tag="h2" className="subtitle mb-2" />
        <Text field={fields.title} tag="h1" className="title mb-3" />
        <RouteLinkedRichText field={fields.text} tag="p" className="lead" />
        <Link to="/docs/nextjs/getting-started-nextjs/workflow-options" className="btn btn-primary btn-lg">
          Get Started
          </Link>
      </div>
    </div>
  </div>
);

FeatureJumbo.propTypes = {
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

export default FeatureJumbo;
