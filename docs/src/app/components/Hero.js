import React from 'react';
import PropTypes from 'prop-types';
import { RichText, Image, Text } from '@sitecore-jss/sitecore-jss-react';

const Hero = ({ fields }) => (
  <section className="hero-container">
    <Image field={fields.image} className="pb-4" />
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Text field={fields.title} tag="h2" className="title" />
          <RichText field={fields.text} tag="p" className="copy" />
          <a href="https://sitecore.stackexchange.com/tags/jss" className="sign-up-btn btn btn-secondary btn-lg" target="_blank">Learn more</a>
        </div>
      </div>
    </div>
  </section>
);

Hero.propTypes = {
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

export default Hero;
