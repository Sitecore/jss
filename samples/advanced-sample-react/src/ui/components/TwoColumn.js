import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

const TwoColumn = ({ style, rendering, ...otherProps }) => (
  <div className="row" style={style}>
    <div className="col-md-6">
      <Placeholder name="col1" rendering={rendering} {...otherProps} />
    </div>
    <div className="col-md-6">
      <Placeholder name="col2" rendering={rendering} {...otherProps} />
    </div>
  </div>);

TwoColumn.propTypes = {
  style: PropTypes.object,
  rendering: PropTypes.object,
};

export default commonComponent(TwoColumn);
