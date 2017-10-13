import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

const Home = ({ style, rendering, ...otherProps }) => (
  <section className="home-container" style={style}>
    <div className="page-header">
      <Placeholder name="page-header" rendering={rendering} {...otherProps} />
    </div>
    <div className="page-content">
      <Placeholder name="page-content" rendering={rendering} {...otherProps} />
    </div>
  </section>
);

Home.propTypes = {
  style: PropTypes.object,
  rendering: PropTypes.object,
};

Home.styles = {
};

export default commonComponent(Home);
