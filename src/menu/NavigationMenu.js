//@flow
import React from "react";
import { NavLink } from "react-router-dom";
import { images } from "src/resources";
import type { FeatureRoute } from "src/types";
import { compose, withHandlers } from "recompose";

type UserMenuIconProps = {
  menuCollapsed: boolean,
  userName: string,
  toggleUserMenu: (Event) => void,
  userMenuCollapsed: boolean
};

type UserMenuProps = {
  onSignOut: (Event) => void,
  show: boolean
};

type Props = {
  routes: FeatureRoute[],
  toggleMenu: (Event) => void,
  toggleTheme: (Event) => void,
  dark: boolean,
} & UserMenuIconProps & UserMenuProps;

const UserMenuIcon = (props: UserMenuIconProps) => {
  const {
    menuCollapsed,
    userName,
    userMenuCollapsed,
    toggleUserMenu
  } = props;
  return menuCollapsed ? (
    <div className="usrnm-small">
      <img alt="user-icon" src={images.userSmall} className="pointer" />
    </div>
  ) : (
    <div className="usrnm-big">
      <span>{userName}</span>
      <button className={`fa fa-chevron-${userMenuCollapsed ? "up" : "down"} pointer icon-button`} onClick={toggleUserMenu} />
    </div>
  );
};

const UserMenu = ({ show, onSignOut }: UserMenuProps) => (
  show ? (
    <div
      className="usrnm-div animate"
      style={show ? { opacity: 1 } : { opacity: 0 }}
    >
      <p>
        <a href="/#" className="change-pswd">Change Password</a>
      </p>
      <p>
        <a href="/#" className="sign-out" onClick={onSignOut}>Sign Out</a>
      </p>
    </div>
  ) : false
);

const Component = (props: Props) => (
  <div className="left-relative">
    <div className="left-up">
      <div className="text-right">
        <i className="menu-toggle fa fa-bars pointer" aria-hidden="true" onClick={props.toggleMenu} />
      </div>
      <div className={props.menuCollapsed ? "logo-small" : "logo-big"}>
        <img src={props.menuCollapsed ? images.logoSmall : images.logo} className="home pointer" alt="logo" />
      </div>
    </div>

    <div className="left-center">
      <div className="usrnm-lbl">
        <UserMenuIcon {...props} />
      </div>
      <UserMenu show={props.userMenuCollapsed !== false} onSignOut={props.onSignOut} />
    </div>

    <div className="left-down">
      <ul className="menu-nav">
        {props.routes && props.routes.filter(route => !route.hidden).map(route => (
          <li key={route.name} className="nav-tabs">
            <NavLink to={route.path}>
              <img src={images[route.name]} alt={route.name} />
              <span style={{ display: props.menuCollapsed ? "none" : "inline" }}>{route.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>

    <div className="absolute-down">
      <div className="theme_toggle">
        <label className="switch" htmlFor="theme_toggle">
          <input type="checkbox" id="theme_toggle" onChange={props.toggleTheme} checked={props.dark} />
          <span className="slider round" />
        </label>
      </div>
      <p className="help-support" style={{ display: props.menuCollapsed ? "none" : "block" }}>
        <a href="/">Help and support</a>
      </p>
    </div>
  </div>
);

export default compose(withHandlers({
  onSignOut: props => (event) => {
    event.preventDefault();
    props.logout();
  }
}))(Component);
