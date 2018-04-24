//@flow
import React from "react";
import { Router } from "react-router";
import NavigationMenu from "src/menu/NavigationMenu";
import renderer from "react-test-renderer";
import routes from "src/config/routes";
import createHistory from "history/createBrowserHistory";

it("matches snapshot no session", () => {
  const render = renderer.create(<NavigationMenu />).toJSON();
  expect(render).toMatchSnapshot();
});

it("matches snapshot with session", () => {
  const render = renderer.create((
    <Router history={createHistory()}>
      <NavigationMenu routes={routes} userName="testuser" />
    </Router>
  )).toJSON();
  expect(render).toMatchSnapshot();
});
