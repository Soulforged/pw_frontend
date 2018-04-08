//@flow
import { handleActions } from "redux-actions";
import routes from "src/config/routes";
import type { FeatureRoute } from "src/types";
import actions from "src/actions";

import error from "./ErrorReducer";
import entities from "./EntitiesReducer";

const {
  LOGIN_SUCCESS,
  setLoading,
  logout,
  toggleTheme
} = actions;

type State = {
  user?: Object,
  routes?: Array<FeatureRoute>
};

const initialState: State = {
  user: JSON.parse(localStorage.getItem("user")),
  routes
};

const mapResponse = response => response.entities.users[response.result];

const session = handleActions({
  [LOGIN_SUCCESS]: (state, { response }) => {
    const user = mapResponse(response);
    localStorage.setItem("user", JSON.stringify(user));
    return { ...state, user };
  },
  [logout]: () => {
    localStorage.removeItem("user");
    return {};
  }
}, initialState);

const loading = handleActions({
  [setLoading]: (state, newState) => newState
}, false);

const ui = handleActions({
  [toggleTheme]: (state) => {
    const newState = !state.light;
    localStorage.setItem("light", newState);
    return { ...state, light: newState };
  }
}, { light: localStorage.getItem("light") === "true" || false });

export default {
  error,
  entities,
  session,
  loading,
  ui
};
