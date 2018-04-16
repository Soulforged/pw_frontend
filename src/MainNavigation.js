//@flow
import React from "react";
import { Route } from "react-router";
import type { FeatureRoute } from "src/types";
import { connect } from "react-redux";

type Props = {
  routes: Array<FeatureRoute>
};

const component = ({ routes }: Props) => (
  routes.map(route => <Route key={route.name} {...route} />)
);

const mapStateToProps = ({ session }) => session;

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(component);
