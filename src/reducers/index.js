//@flow
import { handleActions } from "redux-actions";
import routes from "src/config/routes";
import type { FeatureRoute } from "src/types";
import actions from "src/actions";

import error from "./errorReducer";
import entities from "./entitiesReducer";

const {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  setLoading,
  logout,
  toggleTheme,
  toggleMenu,
  toggleUserMenu,
  setSelected,
} = actions;

type State = {
  user?: Object,
  routes?: Array<FeatureRoute>
};

const initialState: State = {
  user: JSON.parse(localStorage.getItem("user")),
  routes
};

const session = handleActions({
  [LOGIN_SUCCESS]: (state, { response }) => {
    const user = response;
    localStorage.setItem("user", JSON.stringify(user));
    return { ...state, user };
  },
  [LOGIN_REQUEST]: state => ({ ...state, loading: true }),
  [LOGIN_FAILURE]: state => ({ ...state, loading: false }),
  [logout]: (state) => {
    localStorage.removeItem("user");
    return { ...state, user: null };
  }
}, initialState);

const loading = handleActions({
  [setLoading]: (state, newState) => newState
}, false);

const uiInitialState = {
  dark: localStorage.getItem("dark") === "true" || false,
  menuCollapsed: localStorage.getItem("menuCollapsed") === "true" || false
};

const toggleReducer = (state, key) => {
  const newState = !state[key];
  localStorage.setItem(key, newState);
  return { ...state, [key]: newState };
};

const ui = handleActions({
  [toggleTheme]: state => toggleReducer(state, "dark"),
  [toggleMenu]: state => toggleReducer(state, "menuCollapsed"),
  [toggleUserMenu]: state => toggleReducer(state, "userMenuCollapsed"),
  [setSelected]: (state, { payload }) => ({ ...state, selected: payload })
}, uiInitialState);

export default {
  error,
  entities,
  session,
  loading,
  ui
};
