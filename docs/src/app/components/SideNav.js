import React from 'react';
import Navigation from './Navigation';
import SearchBox from './SearchBox';
import { NavLink, useLocation } from 'react-router-dom';
import { useNavigationState } from '../NavigationContext';

/*
 * Bootstrap 4 sidebar menu adapted from:
 * https://www.codeply.com/go/q0b6ILuRyx/bootstrap-4-vertical-sidebar-nav-with-submenu
 */

const Menu = ({children}) => {
  return (
    <div class="collapse show d-md-flex pt-2 pl-0 min-vh-100">
      <ul class="nav flex-column flex-nowrap overflow-hidden">
        {children}
      </ul>
    </div>
  );
};

const MenuItem = ({url, menuItem, active}) => {
  const activeClass = active ? "active" : "";
  return (
    <li className={`nav-item ${activeClass}`}>
      <NavLink to={url} className="nav-link text-truncate">
        <span class="d-none d-sm-inline">{menuItem.displayName}</span>
      </NavLink>
    </li>
  );
};

const SubMenu = ({menuItem, children, open, onClick}) => {
  const collapsed = open ? "" : "collapsed";
  const show = open ? "show" : "";
  return (
    <li className="nav-item sub-menu">
      <a className={`nav-link text-truncate ${collapsed}`} href={`#${menuItem.url}`} onClick={onClick} data-toggle="collapse" data-target={`#${menuItem.url}`}>
        <span class="d-none d-sm-inline">{menuItem.displayName}</span>
        <i className="sub-menu-expand-icon"></i>
      </a>
      <div className={`collapse ${show}`} id={menuItem.url} aria-expanded="false">
        <ul class="flex-column nav">
          {children}
        </ul>
      </div>
    </li>
  );
};

const renderMenu = (baseUrl, menuItem, openMenuState, setOpenMenuState, selected) => {
  const url = `${baseUrl}/${menuItem.url}`;
  const toggleMenu = (url) => {
    if (openMenuState.has(url)) {
      openMenuState.delete(url);
    } else {
      openMenuState.add(url);
    }
    setOpenMenuState(openMenuState);
  }

  if (menuItem.children) {
    return (
      <SubMenu key={menuItem.url} menuItem={menuItem} open={openMenuState.has(menuItem.url)} onClick={() => toggleMenu(menuItem.url)}>
        {menuItem.children.map((child) => renderMenu(url, child, openMenuState, setOpenMenuState, selected))}
      </SubMenu>
    );
  } else {
    return (
      <MenuItem key={menuItem.url} url={url} menuItem={menuItem} active={menuItem.url == selected} />
    );
  }
};

const SideNav = ({ navkey, useSearch }) => {
  const location = useLocation();
  const selected = location.pathname.split('/').reverse()[0];
  const searchbox = (useSearch == 'true') ? <SearchBox /> : '';
  const  { navState, setNavState } = useNavigationState();

  if (navState.size == 0) {
    const openMenus = location.pathname
      .split('/')
      .slice(2) // remove starting empty string + docs
      .reverse();
    openMenus.forEach((x) => navState.add(x));
    setNavState(navState);
  }
  if (navState.size == 0) {
    // add getting started by default
    navState.add('getting-started');
    setNavState(navState);
  }

  return (
    <div className="side-nav">
      {searchbox}

      <Menu>
        {Navigation[navkey].children.map((menuItem) => renderMenu(`/${Navigation[navkey].url}`, menuItem, navState, setNavState, selected))}
      </Menu>

      <div className="navbar-nav bd-navbar-nav flex-column">
        {Navigation[navkey].links.map(linkItem => (
          <NavLink to={"/"+linkItem.url} className={linkItem.className}>
            {linkItem.displayName}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideNav;