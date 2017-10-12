import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { RichText as RichTextField } from '@sitecore-jss/sitecore-jss-react';

const RichText = ({ fields }) =>
  <RichTextField field={fields.text} tag="div" className="rich-text" />;

RichText.propTypes = {
  fields: PropTypes.shape({
    text: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
  }),
};

export default commonComponent(RichText);
