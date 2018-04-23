//@flow
import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import type { Session, ComponentType, Location } from "src/types";

type Props = {
  component: ComponentType<*>,
  session: Session
};

const Comp = ({ component: Component, session, ...rest }: Props) => (
  <Route
    {...rest}
    render={(props: { location: Location }) => {
      if (session.user) {
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
    }}
  />
);

const mapStateToProps = ({ session }: { session: Session }) => ({ session });

const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comp));
