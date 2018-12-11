import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text } from '@sitecore-jss/sitecore-jss-react';
import RouteLinkedRichText from './RouteLinkedRichText';
import { Link } from 'react-router-dom';

const FeatureJumbo = ({ fields }) => (
  <section className="jumbo-container bg-light">
    <div className="jumbo-image-circle-container">
      <div className="jumbo-image-circle">
        <div className="jumbo-image-container image-background">
          <Image field={fields.image} />
        </div>
      </div>
    </div>
    <div className="circleContainer">
      <div className="circleContainer-outer-top">
        <div className="circleContainer-inner">
          <div className="circleContainer-inner-primary">
            <div className="circ circ_right circle-fg-right-lg bg-success" />
          </div>
          <div className="circleContainer-inner-secondary">
            <div className="circ circ_right circle-fg-right-lg-sub bg-primary" />
            <div className="circ circ_right circle-fg-right-sm bg-primary" />
          </div>
        </div>
      </div>
      <div className="circleContainer-outer-bottom">
        <div className="circleContainer-inner">
          <div className="circleContainer-inner-primary">
            <div className="circle circle-fg-left-md bg-success" />
          </div>
          <div className="circleContainer-inner-secondary">
            <div className="circle circle-fg-left-md-sub bg-primary" />
          </div>
        </div>
      </div>
    </div>
    <div className="shapes-wrapper">
      <div className="outer-shape container">
        <div className="inner-shape row">
          <div className="content-wrapper col-12 col-md-7 min-height">
            <div className="content-wrapper-inner">
              <Text field={fields.subtitle} tag="h3" className="subtitle mb-2" />
              <Text field={fields.title} tag="h1" className="title mb-3" />
              <RouteLinkedRichText field={fields.text} tag="p" className="copy mb-5 p-0" />
              <Link to="/docs/getting-started/quick-start" className="btn btn-primary btn-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

FeatureJumbo.propTypes = {
  fields: PropTypes.shape({
    image: PropTypes.shape({
      value: PropTypes.shape({
        src: PropTypes.string,
      }),
      editable: PropTypes.string,
    }),
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
