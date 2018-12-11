import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

const Logo = () => (
  <img src="/assets/img/sitecore-logo.svg" height="53px" alt="Sitecore JSS" className="logo" />
);

const Header = ({ fields }) => (
  <header className="main-header border-bottom">
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-light bg-white navbar-fixed-top custom-carets">
        <Link className="navbar-brand" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active ml-lg-3 mr-lg-3">
              <Link className="nav-link" to="/features">
                Features
              </Link>
            </li>
            <li className="nav-item active ml-lg-3 mr-lg-3">
              <Link className="nav-link" to="/docs">
                Documentation
              </Link>
            </li>
            <li className="nav-item active ml-lg-3 mr-lg-3">
              <a
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.sitecore.com/getting-started/developer-trial"
              >
                Trial
              </a>
            </li>
            <li className="nav-item active ml-md-3 mr-md-3">
              <Link className="nav-link" to="/community">
                Community
              </Link>
            </li>
            <li className="nav-item active ml-lg-3 get-started-button">
              <Link
                className="btn btn-secondary btn-sm float-left text-white"
                to="/docs/getting-started/quick-start"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;
