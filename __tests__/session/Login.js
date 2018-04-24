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
  const render = mount((
    <Router history={createHistory()}>
      <Login location={{ state: { from: "/other" } }} user={{}} />
    </Router>
  ));
  expect(render.props().history.location.pathname).toEqual("/other");
});

describe("login control test", () => {
  const login = jest.fn();
  const wrapper = mount(<Login location={{}} login={login} />);
  const form = wrapper.find("form");
  const formProps = form.props();

  it("calls login with valid form", () => {
    const usernameInput = wrapper.find("input#username");
    const passwordInput = wrapper.find("input#password");
    usernameInput.simulate("change", { target: { value: "username" } });
    passwordInput.simulate("change", { target: { value: "password" } });
    formProps.onSubmit({ preventDefault: jest.fn() });
    expect(login).toHaveBeenCalledWith({ username: "username", password: "password" });
  });
});
