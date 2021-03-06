//@flow
import { handleActions } from "redux-actions";
import routes from "src/config/routes";
import type { FeatureRoute, Reducer } from "src/types";
import type { SessionUser } from "src/session/types";
import actions from "src/actions";

import error from "./errorReducer";
import entities from "./entitiesReducer";

const {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  logout,
  toggleTheme,
  toggleMenu,
  toggleUserMenu,
} = actions;

type State = {
  user?: SessionUser | null,
  routes?: Array<FeatureRoute>
};

const initializeUser = localStorageUser => (
  localStorageUser ?
    JSON.parse(localStorageUser)
    : null
);

const initialState: State = {
  user: initializeUser(localStorage.getItem("user")),
  routes
};

const session: Reducer<*, *> = handleActions({
  [LOGIN_SUCCESS]: (state, { response }) => {
    const user = response;
    localStorage.setItem("user", JSON.stringify(user));
    return { ...state, user };
  },
  [logout]: (state) => {
    localStorage.removeItem("user");
    return { ...state, user: null };
  }
}, initialState);

const uiInitialState = {
  dark: localStorage.getItem("dark") === "true" || false,
  menuCollapsed: localStorage.getItem("menuCollapsed") === "true" || false,
  userMenuCollapsed: localStorage.getItem("userMenuCollapsed") === "true" || false
};

const toggleReducer = (state, key) => {
  const newState = !state[key];
  localStorage.setItem(key, newState);
  return { ...state, [key]: newState };
};

const ui: Reducer<*, *> = handleActions({
  [toggleTheme]: state => toggleReducer(state, "dark"),
  [toggleMenu]: state => toggleReducer(state, "menuCollapsed"),
  [toggleUserMenu]: state => toggleReducer(state, "userMenuCollapsed"),
  [LOGIN_REQUEST]: state => ({ ...state, loading: true }),
  [LOGIN_FAILURE]: state => ({ ...state, loading: false }),
  [LOGIN_SUCCESS]: state => ({ ...state, loading: false }),
}, uiInitialState);

export default {
  error,
  entities,
  session,
  ui
};
