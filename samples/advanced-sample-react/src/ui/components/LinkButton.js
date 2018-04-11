import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Link } from '@sitecore-jss/sitecore-jss-react';

const LinkButton = ({ fields }) => <Link field={fields.link} />;

LinkButton.propTypes = {
  fields: PropTypes.shape({
    link: PropTypes.shape({
      value: PropTypes.object,
      editable: PropTypes.string,
    }),
  }),
};

export default commonComponent(LinkButton);
