//@flow
import mocks from "src/mocks";
import actions from "src/actions";
import reducers from "src/reducers";

const {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  logout,
  toggleTheme,
  toggleMenu,
  toggleUserMenu,
  setError
} = actions;

const {
  ui, session, error
} = reducers;

it("enters error state", () => {
  const errorMsg = new Error("message");
  const newState = error({ error: false }, setError(errorMsg));
  expect(newState).toEqual({ error: errorMsg });
});

it("restores from error", () => {
  const newState = error({ error: { message: "some", status: "some" } }, setError());
  expect(newState).toEqual({ error: false });
});

it("sets loading flag if login in", () => {
  const newState = ui({}, { type: LOGIN_REQUEST });
  expect(newState).toEqual({ loading: true });
});

it("unsets loading flag if login is done", () => {
  const newState = ui({ loading: true }, { type: LOGIN_FAILURE });
  expect(newState).toEqual({ loading: false });
  const newState1 = ui({ loading: true }, { type: LOGIN_SUCCESS });
  expect(newState1).toEqual({ loading: false });
});

it("loads user data into session on LOGIN_SUCCESS", () => {
  const response = mocks.login;
  const newState = session({ user: null }, { type: LOGIN_SUCCESS, response });
  expect(newState).toEqual({ user: response });
  expect(localStorage.getItem("user")).toEqual(JSON.stringify(response));
});

it("unloads user data on logout", () => {
  const newState = session({ user: {} }, logout());
  expect(newState).toEqual({ user: null });
  expect(localStorage.getItem("user")).toBe(null);
});

const toggleTest = (key, action) => () => {
  const newState = ui({ [key]: false }, action());
  expect(newState).toEqual({ [key]: true });
  expect(localStorage.getItem(key)).toBe("true");
  const newState1 = ui(newState, action());
  expect(newState1).toEqual({ [key]: false });
  expect(localStorage.getItem(key)).toBe("false");
};

it("togglesTheme", toggleTest("dark", toggleTheme));
it("togglesMenu", toggleTest("menuCollapsed", toggleMenu));
it("togglesUserMenu", toggleTest("userMenuCollapsed", toggleUserMenu));
