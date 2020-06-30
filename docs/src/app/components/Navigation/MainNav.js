import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';

const MainNav = ({ params, fields }) => (
  <Menu
    selectedKeys={(fields.selectedMenuItem && fields.selectedMenuItem.value) ? fields.selectedMenuItem.value : undefined}
    mode="horizontal"
    flex={params.flex}
    style={{ borderBottom: 'none' }}
  >
    <Menu.Item key="features">
      <Link className="nav-link" to="/features">
        Features
      </Link>
    </Menu.Item>
    <Menu.Item key="docs">
      <Link className="nav-link" to="/docs">
        Documentation
      </Link>
    </Menu.Item>
    <Menu.Item key="guides">
      <Link className="nav-link" to="/guides">
        Guides
      </Link>
    </Menu.Item>
    <Menu.Item>
      <a
        className="nav-link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.sitecore.com/getting-started/developer-trial"
      >
        Trial
      </a>
    </Menu.Item>
    <Menu.Item key="community">
      <Link className="nav-link" to="/community">
        Community
      </Link>
    </Menu.Item>
    <Menu.Item key="quick-start" className="get-started-button">
      <Link
        className="btn btn-secondary btn-sm float-left text-white"
        to="/docs/getting-started/quick-start"
      >
        Get Started
      </Link>
    </Menu.Item>
  </Menu>
);

MainNav.propTypes = {
  fields: PropTypes.shape({
    selectedMenuItem: PropTypes.shape({
      value: PropTypes.string
    })
  }),
  params: PropTypes.shape({
    flex: PropTypes.string
  })
};

export default MainNav;
