import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commonComponent } from 'enhancers';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { getRouteUrl } from 'app/sitecoreRoutes';
import LoginModal from './LoginModal';

const handleNavItemClick = (e, props) => {
  e.preventDefault();
  e.stopPropagation();

  if (props.onNavItemClick) {
    props.onNavItemClick(e);
  }

  const href = e.target.getAttribute('href');
  if (href) {
    props.actions.changeRoute(href);
  }
};

const MainNav = ({ navigation, t, currentRoute, currentLang, showLogin, loginFailed, user, ...props }) => (
  [
    <Navbar key="mainNav" id="mainNav" fluid style={props.style}>
      <Navbar.Header>
        <Navbar.Toggle>
          <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars" />
        </Navbar.Toggle>
        <Navbar.Brand>
          <a className="page-scroll" href={getRouteUrl(currentLang, '/')} onClick={e => handleNavItemClick(e, props)}>{t('Start Bootstrap')}</a>
        </Navbar.Brand>
      </Navbar.Header>

      <Navbar.Collapse>
        {navigation &&
          <Nav navbar pullRight>
            {/* skip root/home item in nav */}
            {navigation[0].children.map((navItem, index) => {
              if (!navItem.children) {
                return <NavItem key={index} className="page-scroll" href={getRouteUrl(currentLang, navItem.path)} onClick={e => handleNavItemClick(e, props)} dangerouslySetInnerHTML={{ __html: navItem.name }} />;
              }
              return (
                <NavDropdown id={navItem.name} key={index} title={navItem.name}>
                  {/* Boostrap dropdown doesn't allow us to link to parent route, so repeat it */}
                  <MenuItem key="-1" href={getRouteUrl(currentLang, navItem.path)} onClick={e => handleNavItemClick(e, props)} dangerouslySetInnerHTML={{ __html: navItem.name }} />
                  {navItem.children.map((childItem, childIndex) => {
                    return <MenuItem key={childIndex} href={getRouteUrl(currentLang, navItem.path)} onClick={e => handleNavItemClick(e, props)} dangerouslySetInnerHTML={{ __html: childItem.name }} />;
                  })}
                </NavDropdown>
              );
            })}
            <NavDropdown id="changeLanguage" key="changeLanguage" title={t('Language')} className="nav-language">
              <MenuItem key="en" className="flag-icon flag-icon-us" href={getRouteUrl('en', currentRoute)} onClick={e => handleNavItemClick(e, props)}>English (US)</MenuItem>
              <MenuItem key="es-mx" className="flag-icon flag-icon-mx" href={getRouteUrl('es-mx', currentRoute)} onClick={e => handleNavItemClick(e, props)}>Español (MX)</MenuItem>
            </NavDropdown>
            {
              user ?
                <NavItem key="logout" className="nav-btn" onClick={e => props.actions.logout(getRouteUrl(currentLang, currentRoute))}>{t('Logout')}</NavItem>
                : <NavItem key="login" className="nav-btn" onClick={e => props.actions.showLoginForm()}>{t('Login')}</NavItem>
            }
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>,
    <LoginModal key="loginModal" show={showLogin} loginFailed={loginFailed} currentRoute={getRouteUrl(currentLang, currentRoute)} onHide={props.actions.hideLoginForm} onSubmit={props.actions.loginSubmit} />
  ]
);

MainNav.propTypes = {
  style: PropTypes.object,
  actions: PropTypes.object, /* eslint react/no-unused-prop-types: 0 */
  onNavItemClick: PropTypes.func,
  navigation: PropTypes.array,
  t: PropTypes.func,
  currentRoute: PropTypes.string,
  currentLang: PropTypes.string,
  showLogin: PropTypes.bool,
  loginFailed: PropTypes.bool,
  user: PropTypes.object
};

MainNav.styles = {

};

const mapStateToProps = state => ({
  navigation: state.sitecore.context.navigation,
  currentRoute: state.app.currentRoute,
  currentLang: state.app.currentLang,
  showLogin: state.app.showLogin,
  loginFailed: state.app.loginFailed,
  user: state.sitecore.context.user
});

export default translate()(withRouter(connect(mapStateToProps)(commonComponent(MainNav))));
