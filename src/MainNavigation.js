//@flow
import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import type { FeatureRoute } from "src/types";
import { connect } from "react-redux";

type Props = {
  routes: Array<FeatureRoute>
};

const component = ({ routes }: Props) => (
  <Switch>
    {routes.map(route => (
      <Route key={route.name} {...route} exact />
    ))}
  </Switch>
);

const mapStateToProps = ({ session }) => session;

const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(component));
