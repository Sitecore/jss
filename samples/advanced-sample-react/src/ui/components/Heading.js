import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from '../../enhancers';

/* eslint-disable no-restricted-globals */

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const Heading = ({ params, fields, style }) => {
  let tagName;
  if (params && isNumeric(params.size)) {
    tagName = `h${params.size}`;
  } else {
    return null;
  }

  const props = {
    dangerouslySetInnerHTML: { __html: fields && fields.text && fields.text.editable },
    style,
  };
  const elem = React.createElement(tagName, props);
  return elem;
};

Heading.propTypes = {
  style: PropTypes.object,
  params: PropTypes.shape({
    size: PropTypes.string,
  }),
  fields: PropTypes.shape({
    text: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
  }),
};

Heading.defaultProps = {
  params: {
    size: '1',
  },
};

Heading.styles = {};

export default commonComponent(Heading);
