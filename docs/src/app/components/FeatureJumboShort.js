import React from 'react';
import PropTypes from 'prop-types';
import { RichText, Text, Image } from '@sitecore-jss/sitecore-jss-react';

const FeatureJumboShort = ({ fields }) => (
  <section className="jumbo-container jumbo-container-short bg-light">
    <div className={fields.csscolorclass.value}>
      <div className="jumbotron">
        <div className="container">
          <div className="inner-shape row">
            <div className="content-wrapper col-12 col-md-9 min-height">
              <div className="content-wrapper-inner">
                <Text field={fields.title} tag="h1" className="title mb-3" />
                <RichText field={fields.text} tag="p" className="copy mb-0 p-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

FeatureJumboShort.propTypes = {
  fields: PropTypes.shape({
    image: PropTypes.shape({
      value: PropTypes.shape({
        src: PropTypes.string,
      }),
      editable: PropTypes.string,
    }),
    csscolorclass: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    imageclass: PropTypes.shape({
      value: PropTypes.string,
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

export default FeatureJumboShort;
