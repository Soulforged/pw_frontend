//@flow
import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import type { Session } from "src/types";

type Props = {
  session: Session,
  location: string
};

const Comp = ({ component: Component, session, ...rest }: {component: any}) => (
  <Route
    {...rest}
    render={(props: Props) => {
      if (session.user) {
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
    }}
  />
);

const mapStateToProps = ({ session }: { session: Session }) => ({ session });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
