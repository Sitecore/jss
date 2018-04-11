import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import Heading from 'ui/components/Heading';
import { RichText } from '@sitecore-jss/sitecore-jss-react';

const Jumbotron = (props) => (
  <div style={props.style} className="sc-jumbotron">
    {/* Example of "falling back" to route field over datasource field. */}
    <Heading
      params={{ size: props.params.titleSize }}
      fields={{ text: props.fields.titleText || props.routeFields.titleText }}
    />
    <hr className={props.params.shade} />
    <RichText field={props.fields.body || props.routeFields.body} />
  </div>
);

Jumbotron.propTypes = {
  style: PropTypes.object,
  params: PropTypes.shape({
    titleSize: PropTypes.string,
    shade: PropTypes.oneOf(['light', 'dark']),
  }),
  fields: PropTypes.shape({
    titleText: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
    body: PropTypes.shape({
      value: PropTypes.string,
      editable: PropTypes.string,
    }),
  }),
  routeFields: PropTypes.object,
};

Jumbotron.defaultProps = {
  params: {
    titleSize: '1',
    shade: 'light',
  },
};

Jumbotron.styles = {};

export default commonComponent(Jumbotron);
