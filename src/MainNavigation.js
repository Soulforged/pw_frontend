//@flow
import React from "react";
import { Route, withRouter } from "react-router-dom";
import type { FeatureRoute } from "src/types";
import { connect } from "react-redux";

type Props = {
  routes: Array<FeatureRoute>,
};

const Component = ({ routes }: Props) => (
  <div className="animate">
    {routes.map(route => (
      <Route key={route.name} {...route} />
    ))}
  </div>
);

const mapStateToProps = ({ session: { routes } }) => ({ routes });

const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component));
