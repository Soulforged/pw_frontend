//@flow
import React from "react";
import { Redirect } from "react-router-dom";
import { compose, withState, withHandlers } from "recompose";

import type { Session, Location } from "src/types";

type Props = {
  ...Session,
  onChangeUsername: (string) => void,
  onChangePassword: (string) => void,
  onSubmit: (Event) => void,
  location: Location,
  username: string,
  password: string,
  login: (Object) => void
};

const component = (props: Props) => {
  const { from } = props.location.state || { from: { pathname: "/" } };
  if (props.user) {
    return <Redirect to={from} />;
  }
  return (
    <div id="login-wrapper">
      <div id="login-frame">
        <div id="login" className="pnls">
          <div className="login-header">
            <p className="login-title color-6">BACK OFFICE</p>
          </div>
          <form id="login_frm" onSubmit={props.onSubmit}>
            <div className="login-body">
              <div className="modal-p">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="login-user" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="usrnm"
                    placeholder="User@domain.com"
                    required
                    onChange={props.onChangeUsername}
                  />
                </div>
              </div>
              <div className="modal-p">
                <div className="input-group">
                  <span className="input-group-addon">
                    <span className="login-pswd" />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="pswd"
                    placeholder="Password"
                    onChange={props.onChangePassword}
                  />
                </div>
              </div>
            </div>
            <div className="login-footer">
              <div className="modal-p">
                <input type="submit" value="LOGIN" className="btn btn-md" />
              </div>
              <div className="modal-p">
                <a href="/forgotPassword" className="forgot-pswd color-6">Forgot your password?</a>
              </div>
              <div className="row color-6">
                <div className="col-md-6 col-sm-6 text-left">Powered by Peg b</div>
                <div className="col-md-6 col-sm-6 text-right">
                  <i className="logo-s" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default compose(
  withState("username", "setUsername", ""),
  withState("password", "setPassword", ""),
  withHandlers({
    onChangeUsername: props => (event) => {
      event.preventDefault();
      props.setUsername(event.target.value);
    },
    onChangePassword: props => (event) => {
      event.preventDefault();
      props.setPassword(event.target.value);
    },
    onSubmit: (props: Props) => (event) => {
      event.preventDefault();
      const { username, password } = props;
      props.login({ username, password });
    }
  })
)(component);
