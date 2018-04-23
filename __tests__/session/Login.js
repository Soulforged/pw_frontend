//@flow
import React from "react";
import Login from "src/session/Login";
import renderer from "react-test-renderer";
import { Router } from "react-router";
import { mount } from "enzyme";
import createHistory from "history/createBrowserHistory";

it("login matches snapshot", () => {
  const rendered = renderer.create(<Login location={{}} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("login with user in session shows home", () => {
  const render = mount(
    <Router history={createHistory()}>
      <Login location={{ state: { from: "/other" } }} user={{}} />
    </Router>
  );
  expect(render.props().history.location.pathname).toEqual("/other");
});
