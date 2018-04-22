//@flow
import React from "react";
import ReactDOM from "react-dom";
import App from "src/App";
import createStore from "src/reduxconf";
import createHistory from "history/createBrowserHistory";
import renderer from "react-test-renderer";
import actions from "src/actions";

const { LOGIN_SUCCESS } = actions;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("shows login when not logged in", () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("shows home (dashboard) when logged in", () => {
  const history = createHistory();
  const store = createStore({ history });
  store.dispatch({ type: LOGIN_SUCCESS, response: { details: {} } });
  const rendered = renderer.create(<App history={history} store={store} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
