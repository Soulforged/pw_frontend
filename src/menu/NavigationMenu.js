//@flow
import React from "react";
import { NavLink } from "react-router-dom";
import { images } from "src/resources";
import type { FeatureRoute } from "src/types";
import { compose, withHandlers } from "recompose";
import Transition from "react-transition-group/Transition";
import { slideTransition } from "src/animations";

type UserMenuIconProps = {
  menuCollapsed: boolean,
  user: Object,
  toggleUserMenu: (Event) => void,
  userMenuCollapsed: boolean
};

type Props = {
  routes: Array<FeatureRoute>,
  onSignOut: (Event) => void,
  toggleMenu: (Event) => void,
  toggleTheme: (Event) => void,
  dark: boolean,
  ...UserMenuIconProps
};

const defDuration = 150;

const UserMenuIcon = (props: UserMenuIconProps) => {
  const {
    menuCollapsed,
    user,
    userMenuCollapsed,
    toggleUserMenu
  } = props;
  return menuCollapsed ? (
    <div className="usrnm-small">
      <img alt="user-icon" src={images.userSmall} className="pointer" />
    </div>
  ) : (
    <div className="usrnm-big">
      <span>{user.details.userName}</span>
      <button className={`fa fa-chevron-${userMenuCollapsed ? "up" : "down"} pointer`} onClick={toggleUserMenu} />
    </div>
  );
};

type UserMenuProps = {
  onSignOut: Event => void,
  style: Object
};

const UserMenu = ({ onSignOut, style }: UserMenuProps) => (
  <div className="usrnm-div" style={style}>
    <p>
      <a href="/#" className="change-pswd">Change Password</a>
    </p>
    <p>
      <a href="/#" className="sign-out" onClick={onSignOut}>Sign Out</a>
    </p>
  </div>
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
      <Transition in={props.userMenuCollapsed} timeout={defDuration}>
        {state => (
          <UserMenu
            onSignOut={props.onSignOut}
            style={slideTransition(defDuration, "height", 0, 80, state)}
          />
        )}
      </Transition>
    </div>

    <div className="left-down">
      <ul className="menu-nav">
        {props.routes.filter(route => !route.hidden).map(route => (
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
