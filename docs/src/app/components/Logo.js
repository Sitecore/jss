import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link className="navbar-brand" to="/">
    <img
      src="/assets/img/sitecore-logo.svg"
      height="53px"
      alt="Sitecore JSS"
      className="logo"
    />
  </Link>
);

export default Logo;
