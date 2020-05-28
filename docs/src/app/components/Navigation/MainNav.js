import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

class MainNav extends React.Component {
  state = {
    current: 'docs',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        style={{backgroundColor: 'transparent', textAlign: 'right'}}
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
      </Menu >
    );
  }
}

export default MainNav;
