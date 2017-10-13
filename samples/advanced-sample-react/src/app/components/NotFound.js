import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = ({ t }) => (
  <section style={{ paddingTop: 50 }}>
    <h1>404!</h1>
    <Link to="/">{t('Home')}</Link>
  </section>
);

NotFound.propTypes = {
  t: PropTypes.func,
};

export default translate()(commonComponent(NotFound));
