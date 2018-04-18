//@flow
import { createActions } from "redux-actions";
import { CALL_API } from "src/constants";
import type { UserInfo, AppError } from "src/types";
import mocks from "src/mocks";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_FAILURE = "LOGIN_FAILURE";

const login = ({ username, password }: UserInfo) => ({ // eslint-disable-line
  [CALL_API]: {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    endpoint: "/authenticate/generate-token",
    body: { user: username, password },
    mock: mocks.login
  }
});

const syncActions = createActions({
  SET_ERROR: (error: AppError) => error,
  LOGOUT: () => ({}),
  SET_LOADING: (loading: boolean) => loading,
  TOGGLE_THEME: () => ({}),
  TOGGLE_MENU: () => ({}),
  TOGGLE_USER_MENU: () => ({})
});

export default {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  login,
  ...syncActions
};
