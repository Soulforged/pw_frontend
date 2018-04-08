//@flow
import React from "react";
import { NavLink } from "react-router-dom";
import { images } from "src/resources";
import type { FeatureRoute } from "src/types";
import { compose, withHandlers } from "recompose";

type Props = {
  user: Object,
  routes: Array<FeatureRoute>,
  onSignOut: (Event) => void,
  onChangeTheme: (Event) => void,
  light: boolean
};

const Component = (props: Props) => (
  <div className="left-relative">
    <div className="left-up">
      <div className="text-right">
        <i className="menu-toggle fa fa-bars pointer" aria-hidden="true" />
      </div>
      <div className="logo-big">
        <img src={images.logo} className="home pointer" alt="logo" />
      </div>
    </div>

    <div className="left-center">
      <div className="usrnm-lbl">
        <div className="usrnm-big">
          <span>{props.user.details.userName}</span>
          <i className="fa fa-chevron-down pointer" />
        </div>
      </div>
      <div className="usrnm-div">
        <div className="usrnm-img" />
        <p>
          <a href="/" className="change-pswd">Change Password</a>
        </p>
        <p>
          <a href="/" className="sign-out" onClick={props.onSignOut}>Sign Out</a>
        </p>
      </div>
    </div>

    <div className="left-down">
      <ul className="menu-nav">
        {props.routes.filter(route => !route.hidden).map(route => (
          <li title={route.title} key={route.name}>
            <img src={images[route.name]} alt={route.name} />
            <span>
              <NavLink to={route.path}>{route.title}</NavLink>
            </span>
          </li>
        ))}
      </ul>
    </div>

    <div className="absolute-down">
      <div className="theme_toggle">
        <label className="switch" htmlFor="theme_change">
          <input type="checkbox" id="theme_change" onChange={props.onChangeTheme} value={props.light} />
          <span className="slider round" />
        </label>
      </div>
      <p className="help-support">
        <a href="/">Help and Support</a>
      </p>
    </div>
  </div>
);

export default compose(withHandlers({
  onSignOut: props => (event) => {
    event.preventDefault();
    props.logout();
  },
  onChangeTheme: props => () => props.toggleTheme()
}))(Component);
