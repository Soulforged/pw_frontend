//@flow
import fetchMock from "fetch-mock";
import actions from "src/actions";
import mockStore from "test/setupStoreMock";

const {
  login,
  setError,
  logout,
  toggleTheme,
  toggleMenu,
  toggleUserMenu
} = actions;

describe("common actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  const body = { username: "a", password: "b" };
  it("supports LOGIN action", () => {
    fetchMock.postOnce(
      `end:/authenticate/generate-token`,
      { body, headers: { "content-type": "application/json" } }
    );
    const expectedActions = [
      { key: undefined, type: "LOGIN_REQUEST" },
      { key: undefined, response: body, type: "LOGIN_SUCCESS" }
    ];
    const store = mockStore({ session: { user: null } });
    return store.dispatch(login(body)).then(() => (
      expect(store.getActions()).toEqual(expectedActions)
    ));
  });

  it("supports a SET_ERROR action", () => {
    const example = {
      type: "SET_ERROR",
      payload: false
    };
    expect(setError(false)).toEqual(example);
    const error = { message: "error" };
    expect(setError(error)).toEqual({ ...example, payload: error });
  });

  it("supports a TOGGLE_MENU action", () => {
    const example = {
      type: "TOGGLE_MENU",
      payload: {}
    };
    expect(toggleMenu()).toEqual(example);
  });

  it("supports a TOGGLE_THEME action", () => {
    const example = {
      type: "TOGGLE_THEME",
      payload: {}
    };
    expect(toggleTheme()).toEqual(example);
  });

  it("supports a TOGGLE_USER_MENU action", () => {
    const example = {
      type: "TOGGLE_USER_MENU",
      payload: {}
    };
    expect(toggleUserMenu()).toEqual(example);
  });

  it("supports a LOGOUT action", () => {
    const example = {
      type: "LOGOUT",
      payload: {}
    };
    expect(logout()).toEqual(example);
  });
});
