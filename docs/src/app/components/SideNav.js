import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import SearchBox from './SearchBox';
import { NavLink } from 'react-router-dom';
import sidenav from '../sidenav';
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/index.css';
const SubMenu = Menu.SubMenu;

// state management ftw
const openMenuState = new Set();

const renderMenu = (baseUrl, menuItem, history) => {
  const url = `${baseUrl}/${menuItem.url}`;
  if (menuItem.children) {
    return (
      <SubMenu key={menuItem.url} title={menuItem.displayName}>
        {menuItem.children.map((child) => renderMenu(url, child, history))}
      </SubMenu>
    );
  } else {
    return (
      <Menu.Item key={menuItem.url}>
        <NavLink to={url}>{menuItem.displayName}</NavLink>
      </Menu.Item>
    );
  }
};

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    if (openMenuState.size == 0) {
      const { location } = this.props;
      const openMenus = location.pathname
        .split('/')
        .slice(2) // remove starting empty string + docs
        .reverse();
      openMenus.forEach((x) => openMenuState.add(x));
    }
    if (openMenuState.size == 0) {
      // add getting started by default
      openMenuState.add('getting-started');
    }
  }

  handleOpenChange = (openMenus) => {
    openMenuState.clear();
    openMenus.forEach((x) => openMenuState.add(x));
  };

  render() {
    const { history, location } = this.props;
    const openMenus = Array.from(openMenuState);
    const selected = location.pathname.split('/').reverse()[0];
    const navkey = this.props.navkey;
    const searchbox = (this.props.useSearch == 'true') ? <SearchBox /> : '';

    return (
      <div className="side-nav">                           
        {searchbox}

        <Menu
          defaultOpenKeys={openMenus}
          defaultSelectedKeys={[selected]}
          onOpenChange={this.handleOpenChange}
          selectable={false}
          mode="inline"
        >
          {sidenav[navkey].children.map((menuItem) => renderMenu(`/${sidenav[navkey].url}`, menuItem, history))}
        </Menu>

        <div className="navbar-nav bd-navbar-nav flex-column">
          {sidenav[navkey].links.map(linkItem => (
            <NavLink to={"/"+linkItem.url} className={linkItem.className}>
              {linkItem.displayName}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(SideNav);
